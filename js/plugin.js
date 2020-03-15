let darkMode = localStorage.getItem('attendanceX_DarkMode');
const darkModeToggle = document.querySelector('#dark-mode-toggle');
const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('attendanceX_DarkMode', 'enabled');
};
const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('attendanceX_DarkMode', null);
};
if (darkMode === 'enabled') {
    enableDarkMode();
}
darkModeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem('attendanceX_DarkMode');
    if (darkMode !== 'enabled') {
        enableDarkMode();
        if (darkModeToggle.getAttribute('data-page')) {
            $('canvas').remove();
            addBubbleBg('#111');
        }
    } else {
        disableDarkMode();
        if (darkModeToggle.getAttribute('data-page')) {
            $('canvas').remove();
            addBubbleBg('#eee');
        }
    }
});

function addBubbleBg(bgcolor) {
    bubbly({
        animate: true, // default is true
        blur: 3, // default is 4
        bubbleFunc: () => `hsla(${Math.random() * 360}, 100%, 50%, ${Math.random() * 0.25})`, // default is () => `hsla(0, 0%, 100%, ${r() * 0.1})`)
        bubbles: 30, // default is Math.floor((canvas.width + canvas.height) * 0.02);
        canvas: document.querySelector("#background"), // default is created and attached
        colorStart: bgcolor, // default is blue-ish
        colorStop: bgcolor,// default is blue-ish
        compose: "darker", // default is "lighter"
        shadowColor: "#fff", // default is #fff
        angleFunc: () => Math.random() * Math.PI * 2, // default is this
        velocityFunc: () => 0.1 + Math.random() * 0.5, // default is this
        radiusFunc: () => 15 + Math.random() * 25 // default is 4 + Math.random() * width / 25
    });
}

function onLocation(location) {
    document.location = location;
}

$(document).ready(function () {
    $(document).delegate('.open', 'click', function (event) {
        $(this).addClass('oppenned');
        event.stopPropagation();
    })
    $(document).delegate('body', 'click', function (event) {
        $('.open').removeClass('oppenned');
    })
    $(document).delegate('.cls', 'click', function (event) {
        $('.open').removeClass('oppenned');
        event.stopPropagation();
    });
});