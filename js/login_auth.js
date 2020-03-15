const login_form = document.querySelector('#login_form');
login_form.addEventListener('submit', async evt => {
    evt.preventDefault();
    const email = login_form['email'].value;
    const password = login_form['password'].value;
    showLoader();
    const res = await fetch(`https://attendancex-8303a.firebaseapp.com/login?email=${email}&password=${password}`,{mode: 'cors'});
    if (res.status !== 200) {
        showAlert('غير مسموح', 'غير مسموح لك بالدخول', AlertType.ERROR, 'موافق')
    } else {
        res.json().then(data => {
            if (data.status == true) {
                hideLoader();
                sessionStorage.setItem('attendancex_admin_token', data.token);
                sessionStorage.setItem('email', data.email);
                sessionStorage.setItem('password', data.password);
                onLocation('admin_dashboard.html');
            }
        });
    }
});