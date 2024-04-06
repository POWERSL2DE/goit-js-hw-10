
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formElem = document.querySelector(`.form`);

formElem.addEventListener(`submit`, handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const form = event.target.elements;
    const delay = form.delay.value;
    const state = form.state.value;
    formElem.reset();

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);

    }
    )

    promise
        .then(value => {
            iziToast.success({
                title: 'OK',
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'topRight',
                messageColor: '#ffffff',
                titleColor: '#ffffff',
                iconColor: '#ffffff',
                backgroundColor: '#59A10D',
            });
        })
        .catch(error => {
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topRight',
                messageColor: '#ffffff',
                titleColor: '#ffffff',
                iconColor: '#ffffff',
                backgroundColor: '#B51B1B',
            });
        });
}