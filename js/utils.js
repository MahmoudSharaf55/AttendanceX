const AlertType = {
    WARNING: 'warning',
    SUCCESS: 'success',
    INFO: 'info',
    ERROR: 'error',
    QUESTION: 'question',
};
const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});
function showToast(title,icon) {
    Toast.fire({
        icon: icon,
        title: title
    });
}
function showAlert(title,description,icon,buttonTxt) {
    Swal.fire({
        icon: icon,
        title: title,
        text: description,
        confirmButtonText: buttonTxt,
        confirmButtonColor: '#774f98',
        allowOutsideClick: false,
    })
}
function showInfoNotification(title, text) {
    if (typeof window.stackBottomLeft === 'undefined') {
        window.stackBottomLeft = {
            'dir1': 'up',
            'dir2': 'right',
            'firstpos1': 25,
            'firstpos2': 25,
            'push': 'top'
        };
    }
    let notice = PNotify.info({
        title: title.toString(),
        text: text.toString(),
        stack: window.stackBottomLeft,
        modules: {
            Buttons: {
                closer: false,
                sticker: false
            },
            Mobile: {
                style: true
            },
        }
    });
    notice.on('click', function () {
        notice.close();
    });
}

function showSuccessNotification(title, text) {
    if (typeof window.stackBottomLeft === 'undefined') {
        window.stackBottomLeft = {
            'dir1': 'up',
            'dir2': 'right',
            'firstpos1': 25,
            'firstpos2': 25,
            'push': 'top'
        };
    }
    let notice = PNotify.success({
        title: title.toString(),
        text: text.toString(),
        stack: window.stackBottomLeft,
        modules: {
            Buttons: {
                closer: false,
                sticker: false
            },
            Mobile: {
                style: true
            },
        }
    });
    notice.on('click', function () {
        notice.close();
    });
}

function showErrorNotification(title, text) {
    if (typeof window.stackBottomLeft === 'undefined') {
        window.stackBottomLeft = {
            'dir1': 'up',
            'dir2': 'right',
            'firstpos1': 25,
            'firstpos2': 25,
            'push': 'top'
        };
    }
    let notice = PNotify.error({
        title: title.toString(),
        text: text.toString(),
        stack: window.stackBottomLeft,
        modules: {
            Buttons: {
                closer: false,
                sticker: false
            },
            Mobile: {
                style: true
            },
        }
    });
    notice.on('click', function () {
        notice.close();
    });
}

function showWarningNotification(title, text) {
    if (typeof window.stackBottomLeft === 'undefined') {
        window.stackBottomLeft = {
            'dir1': 'up',
            'dir2': 'right',
            'firstpos1': 25,
            'firstpos2': 25,
            'push': 'top'
        };
    }
    let notice = PNotify.notice({
        title: title.toString(),
        text: text.toString(),
        stack: window.stackBottomLeft,
        modules: {
            Buttons: {
                closer: false,
                sticker: false
            },
            Mobile: {
                style: true
            },
        }
    });
    notice.on('click', function () {
        notice.close();
    });
}

function hideLoader() {
    $('#preloader').fadeOut('slow', function () {
        $(this).remove();
    });
}

function showLoader() {
    const preloader = $('<div id="preloader"><div class="color-load"></div></div>').hide().fadeIn('slow');
    $('body').prepend(preloader);
}