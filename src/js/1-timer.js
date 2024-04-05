
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btnElem = document.querySelector('button[data-start]');
const daysElem = document.querySelector('span[data-days]');
const hoursElem = document.querySelector('span[data-hours]');
const minutesElem = document.querySelector('span[data-minutes]');
const secondsElem = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: `topRight`,
        messageColor: '#ffffff',
        titleColor: '#ffffff',
        iconColor: '#ffffff',
        backgroundColor: '#B51B1B'
      });
      btnElem.disabled = true;
          } else {
      btnElem.disabled = false;
    }
  },
};

const datePicker = flatpickr('#datetime-picker', options);

let intervalId;

btnElem.addEventListener('click', startTimer);

function startTimer() {
  const selectedDate = datePicker.selectedDates[0];
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: `topRight`,
        messageColor: '#ffffff',
        titleColor: '#ffffff',
        iconColor: '#ffffff',
        backgroundColor: '#B51B1B'
    });
    return;
  }

  btnElem.disabled = true;
  intervalId = setInterval(updateTimer, 1000, selectedDate);
}

function updateTimer(selectedDate, intervalId) {
  const currentDate = new Date();
  const difference = selectedDate - currentDate;

  if (difference <= 0) {
    clearInterval(intervalId);
    displayTimer(0, 0, 0, 0);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(difference);
  displayTimer(days, hours, minutes, seconds);
}

function displayTimer(days, hours, minutes, seconds) {
  daysElem.textContent = addLeadingZero(days);
  hoursElem.textContent = addLeadingZero(hours);
  minutesElem.textContent = addLeadingZero(minutes);
  secondsElem.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}