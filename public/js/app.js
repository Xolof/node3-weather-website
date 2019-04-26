const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const loadImgEl = document.querySelector('.loader');

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault();

    const location = search.value;

    loadImgEl.classList.toggle('hide');
    messageOne.textContent = '';
    messageTwo.textContent = 'Fetching forecast data!';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageTwo.textContent = data.error;
            loadImgEl.classList.toggle('hide');
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
            loadImgEl.classList.toggle('hide');
        }
    })
});
})