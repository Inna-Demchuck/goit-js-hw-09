const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');


const TIME_INTERVAL = 1000;


btnStart.addEventListener('click', (onBtnStartClick));
btnStop.addEventListener('click', (onBtnStopClick));

let intervalId = null;

function onBtnStartClick() {
    btnStart.disabled = true;

    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, TIME_INTERVAL);
}


function onBtnStopClick() {
    btnStart.disabled = false;
    clearInterval(intervalId);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}