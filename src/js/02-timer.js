import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button'),
};

let currentTime = new Date();
let startTime;
refs.startBtn.addEventListener('click', (onStartStopwatch));
refs.startBtn.disabled = true;


setTimeout(() => {
    const currentTime = Date.now();
    console.log(startTime - currentTime);
}, 1000)

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: currentTime,
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() <= currentTime.getTime()) {
            alert("Please choose a date in the future");
        }
        refs.startBtn.disabled = false;
        console.log(selectedDates[0]);
        return startTime = selectedDates[0].getTime()
    },
};

flatpickr(refs.input, options);

let intervalId = null;

function onStartStopwatch() {
    refs.startBtn.disabled = true;

    intervalId = setInterval(() => {
        const time = Date.now();
        const delta = startTime - time;
        if (delta <= 0) {
            return
        }
        const { days, hours, minutes, seconds } = convertMs(delta);
        refs.days.textContent = String(days);
        refs.hours.textContent = String(hours);
        refs.minutes.textContent = String(minutes);
        refs.seconds.textContent = String(seconds);
    }, 1000);
    stopTimer();
}

function stopTimer() {
    if (Date.parse(refs.input.value) <= 0) {
        clearInterval(intervalId);
        refs.startBtn.disabled = false;
    }
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}