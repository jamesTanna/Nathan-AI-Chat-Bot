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
        return 'Error: ' + err;
        throw new Error(err);
    }
}
async function getExceptions(userInput, exceptionType) {
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
        return 'Error: ' + error;
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