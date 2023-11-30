// Getting all required response utilities ready
const botName = 'Nathan';
const date = new Date();

async function getJoke() {
    try {
        const res = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                Accept: 'application/json'
            },
            method: 'get'
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        throw new Error(err);
        return 'Error';
    }
}
async function getExceptions (userInput, exceptionType) {
    try {
        const res = await fetch('exceptions.json');
        const data = await res.json();
        const exceptionData = data[exceptionType];
        let matched = false;
        exceptionData.forEach(keyword => {
            if (userInput.toLowerCase().includes(keyword)) {
                matched = true;
            }
        });
        return matched;
    } catch (err) {
        throw new Error(err);
    }
}

// Response constructor
class Response {
    constructor({ message, keywords, mandatoryWords = false, typeOfMessage = 'greeting' }) {
        this.message = message;
        this.keywords = keywords;
        this.mandatoryWords = mandatoryWords;
        this.typeOfMessage = typeOfMessage;
    }

    // Accuracy detector
    getAccuracy(userInput) {
        userInput = userInput.toLowerCase();
        let count = 0;
        if (this.mandatoryWords != false) {
            this.mandatoryWords.forEach(mandatoryWord => {
                if (userInput.includes(mandatoryWord)) {
                    this.keywords.forEach(keyword => userInput.includes(keyword) ? count += 1 : count += 0);
                }
            });
        } else {
            this.keywords.forEach(keyword => userInput.includes(keyword) ? count += 1 : count += 0);
        }

        this.accuracy = count / this.keywords.length * 100;
    }
}

// Most accurate response detector
function getResponse(userInput, responseList) {
    let accuracyList = [];
    let responseMatched = false;
    responseList.forEach(response => {
        response.getAccuracy(userInput);
        accuracyList.push(response.accuracy);
        if (response.accuracy !== 0) {
            responseMatched = true;
        }
    });
    if (responseMatched) {
        const maxAccuracy = Math.max(...accuracyList);
        const indexOfAccurateResponse = accuracyList.indexOf(maxAccuracy);
        return responseList[indexOfAccurateResponse].message;
    } else {
        return 0;
    }
}

// Fetching responses
async function fetchResponses() {
    try {
        const res = await fetch('responses.json');
        const responseData = await res.json();
        const responseList = [];

        responseData.forEach(response => {
            responseList.push(new Response(response));
        });
        return responseList;

    } catch (error) {
        console.error(error);
        throw new Error('Fetch failed');
    }
}

let responseList;
(async () => {
    try {
        responseList = await fetchResponses();
    } catch (error) {
        console.error('error');
        throw new Error('Fetch failed');
    }
})();

// Make chat box function
function makeChatBox(type, innerText) {
    const div = document.createElement('div');
    div.classList.add('chat');
    div.classList.add(type);
    const textNode = document.createTextNode(innerText);
    div.appendChild(textNode);
    const chatSpace = document.querySelector('#chat-space');
    chatSpace.appendChild(div);
}

// Output
const userInputForm = document.querySelector('#user-input-form');

// Initializing input record
const inputLog = [];

userInputForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let userInput = document.querySelector('#user-input').value;
    
    const repitition = await getExceptions(userInput, 'repeat');
    
    const calculation = await getExceptions(userInput, 'math')
    
    let botResponse;
    
    async function replacements(botResponse){
        if (botResponse === 0) {
            return 'Sorry, I did not get that.';
        } else if (botResponse.includes('botName')) {
            return botResponse.split('botName').join(botName);
        } else if (botResponse.includes('todayDate')) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const todayDate = `${day}-${month}-${year}`;
            return botResponse.split('todayDate').join(todayDate);
        } else if (botResponse.includes('currentTime')) {
            const currentTime = date.toLocaleTimeString();
            return botResponse.split('currentTime').join(currentTime.toUpperCase());
        } else if (botResponse === 'jokeData') {
            try {
                const jokeData = await getJoke();
                return `Here is a joke: 
                        ${jokeData.joke}`
            } catch (e) {
                throw new Error(e);
                botResponse = 'There was an error. Please try again.'
            }
        }else return botResponse
    }
    
    // Normal response procedure
    async function respondNormally(exceptions = false) {
        botResponse = getResponse(userInput, responseList);

        // Using utilities
        botResponse = await replacements(botResponse)
        
        if (!exceptions) makeChatBox('user', userInput);
        inputLog.push(userInput);

        makeChatBox('bot', botResponse);
    }

    if (calculation || /^[+\-*/.\d\s]+$/g.test(userInput)) {
       
        const mathExpression = userInput.match(/[-+*/%()\d\s]+/g).join('');
        try {
            botResponse = 'The answer is ' + math.evaluate(mathExpression);

            makeChatBox('user', userInput);
            makeChatBox('bot', botResponse);

        } catch (err) {
            console.error(err);
            throw new Error(err);
        }
    } else if (repitition) {
        if (inputLog.length > 0) {
            makeChatBox('user', userInput);
            userInput = inputLog[inputLog.length - 1];
            await respondNormally(exceptions = true);
        } else {
            botResponse = 'I cannot understand what I should repeat.';
        }
    } else {
        await respondNormally();
    }

    // Chatbox creation
    document.querySelector('#user-input').value = '';
});

