import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const inputDelayEl = document.querySelector('input[name="delay"]');
const inputStepEl = document.querySelector('input[name="step"]');
const inputAmountEl = document.querySelector('input[name="amount"]');

formEl.addEventListener('submit', onSubmitForm);

let position = 0;

function onSubmitForm(event) {
    event.preventDefault();
    let delay = Number(inputDelayEl.value);
    const step = Number(inputStepEl.value);
    const amount = Number(inputAmountEl.value);

    for (let position = 1; position <= amount; position += 1) {
        createPromise(position, delay)
            .then(({ position, delay }) => {
                Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, )
            })
            .catch(({ position, delay }) => {
                Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, )
            })
        delay += step;
    }
}

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay })
            } else {
                reject({ position, delay });
            }
        }, delay);
    });
};