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