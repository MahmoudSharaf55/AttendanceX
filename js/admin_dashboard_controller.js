const fileInput = document.querySelector('#fileInput');

function browseExcel() {
    $('#fileInput').click();
}

let studentList = [];
fileInput.onchange = e => {
    if (fileInput.files && fileInput.files[0]) {
        const xls = fileInput.files[0];
        let reader = new FileReader();
        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'});
            const sheet_name_list = workbook.SheetNames;
            const list = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            const listKeys = Object.keys(list[0]);
            const allowableKeys = ['seat no', 'student name', 'id'];
            const isValid = listKeys.every(item => allowableKeys.includes(item.trim()));
            if (!isValid) {
                fileInput.value = null;
                showAlert('خطأ', 'اعمدة غير مسموح بها', AlertType.ERROR, 'موافق');
                return;
            }
            studentList = list;
        };
        reader.readAsArrayBuffer(xls);
    }
};

function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const addStudentsForm = document.querySelector('#addStudentsForm');
addStudentsForm.addEventListener('submit', evt => {
    evt.preventDefault();
    const dept = addStudentsForm['dept'].value;
    const section = addStudentsForm['section'].value;
    const level = addStudentsForm['level'].value;
    if (section <= 0 || level <= 0) {
        showAlert('خطأ', 'رقم الفرقة او رقم السيكشن يبدو غير صحيح', AlertType.ERROR, 'موافق');
    } else if (studentList.length <= 0) {
        showAlert('خطأ', 'عليك اختيار ملف الطلبة المناسب', AlertType.ERROR, 'موافق');
    } else {
        showLoader();
        studentList.forEach(student => {
            db.collection('students').doc(makeid(20)).set({
                department: dept.trim().toLowerCase(),
                level: parseInt(level),
                name: student['student name'],
                national_id: student['id'],
                password: student['id'].toString(),
                profile_img: "",
                seat_no: student['seat no'],
                section: parseInt(section),
            });
        });
        hideLoader();
        setTimeout(() => {
            showAlert('عملية ناجحة', 'تم اضافة الطلبة بنجاح', AlertType.SUCCESS, 'تم');
        }, 600);
    }
});

function downloadTemplate() {
    let ws_data = [];
    ws_data.push(['seat no', 'student name', 'id']);
    var wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "template",
        Author: "AttendanceX",
        CreatedDate: Date.now(),
    };
    wb.SheetNames.push('students');
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["students"] = ws;
    var wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
    saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), `student sheet.xlsx`);
}

function s2ab(s) {
    const buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    const view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}