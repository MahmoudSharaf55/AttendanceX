var firebaseConfig = {
    apiKey: "AIzaSyDH2DEcHosvu8yA4D3e5wj3Eqg1V37zpWY",
    authDomain: "attendancex-8303a.firebaseapp.com",
    databaseURL: "https://attendancex-8303a.firebaseio.com",
    projectId: "attendancex-8303a",
    storageBucket: "attendancex-8303a.appspot.com",
    messagingSenderId: "463572921679",
    appId: "1:463572921679:web:63f09205609f9bc004693a",
    measurementId: "G-ZB1R424L4F"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
auth.onAuthStateChanged(user => {
    if (user) {
        console.log(user);
    } else {
        console.log('user logged out');
    }
});