const userInputForm = document.querySelector('#user-input-form');

userInputForm.addEventListener('submit', async (e) => {
    let userInput = document.querySelector('#user-input').value;
    e.preventDefault();
    respond(userInput, inputLog);
    document.querySelector('#user-input').value = '';
});