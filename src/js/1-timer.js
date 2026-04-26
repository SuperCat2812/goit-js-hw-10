// Описаний в документації
import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
const refs = {
  timer: document.querySelector('#datetime-picker'),
  start: document.querySelector('button[ type="button" ]'),
  field: document.querySelectorAll('.value'),
};
refs.start.disabled = true;
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let select = selectedDates[0];
    let date = new Date();

    if (select <= date) {
      iziToast.error({
        title: 'Error',
        titleSize: 16,
        titleColor: '#FFFFFF',
        message: 'Please choose a date in the future',
        messageColor: '#FFFFFF',
        position: 'topRight',
        backgroundColor: '#EF4040',
        iconUrl: '../img/bi_x-octagon.svg',
      });
      refs.start.disabled = true;
    } else {
      refs.start.disabled = false;
      selectedDate = select;
    }
  },
};
refs.start.addEventListener('click', () => {
  refs.start.disabled = true;
  refs.timer.value = '';
  refs.timer.disabled = true;
  let timer = setInterval(() => {
    let date = new Date();
    let dates = selectedDate - date;
    const { days, hours, minutes, seconds } = convertMs(dates);
    const day = refs.field[0];
    const hour = refs.field[1];
    const minute = refs.field[2];
    const second = refs.field[3];

    day.textContent = rest(days);
    hour.textContent = rest(hours);
    minute.textContent = rest(minutes);
    second.textContent = rest(seconds);
    console.log(dates);
    if (days === 0 && minutes === 0 && hours === 0 && seconds === 0) {
      clearInterval(timer);
      refs.timer.disabled = false;
    }
  }, 1000);
});
let userSelectedDate = flatpickr(refs.timer, options);
function rest(time) {
  return String(time).padStart(2, '0');
}
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
