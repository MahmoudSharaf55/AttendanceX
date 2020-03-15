const token = sessionStorage.getItem('attendancex_admin_token');
if (token === undefined || token === null) {
    signOutAdmin();
}
auth.onAuthStateChanged(async user => {
    if (user) {

    } else {
        signOutAdmin();
    }
});

function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const addDoctorForm = document.querySelector('#addDoctorForm');
addDoctorForm.addEventListener('submit', evt => {
    evt.preventDefault();
    const name = addDoctorForm['name'].value;
    const nationalID = addDoctorForm['nationalID'].value;
    const password = addDoctorForm['password'].value;
    if (password.length <= 6) {
        showAlert('الرقم السري', 'يجب ان يكون اكثر من 6 احرف', AlertType.ERROR, 'تم');
    } else {
        showLoader();
        db.collection('teachers').doc(makeid(20)).set({
            name: name,
            national_id: parseInt(nationalID),
            password: password,
            subjects: [],
        });
        hideLoader();
        setTimeout(() => {
            showAlert('عملية ناجحة', 'تم اضافة الدكتور بنجاح', AlertType.SUCCESS, 'تم');
        }, 600);
    }
});