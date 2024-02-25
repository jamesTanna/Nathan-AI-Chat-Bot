const inputLog = []

async function respondNormally(userInput, exceptions = false) {
    botResponse = getResponse(userInput, responseList);

    botResponse = await replacements(botResponse)

    if (!exceptions) makeChatBox('user', userInput);
    inputLog.push(userInput);
    makeChatBox('bot', botResponse );
}

async function respond(userInput) {
    const repitition = await getExceptions(userInput, 'repeat');
    
    const calculation = await getExceptions(userInput, 'math')
    
    let botResponse;
    
    
    if (calculation || /^[+\-*/.\d\s]+$/g.test(userInput)) {
    
        const mathExpression = userInput.match(/[-+*/%()\d\s]+/g).join('');
        try {
            botResponse = 'The answer is ' + math.evaluate(mathExpression);
    
            makeChatBox('user', userInput);
            makeChatBox('bot', botResponse);
            inputLog.push(mathExpression)
    
        } catch (err) {
            console.error(err);
            throw new Error(err);
        }
    } else if (repitition) {
        if (inputLog.length > 0) {
            makeChatBox('user', userInput);
            userInput = inputLog[inputLog.length - 1];
            await respondNormally(userInput, true);
        } else {
            botResponse = 'I cannot understand what I should repeat.';
        }
    } else {
        await respondNormally(userInput);
    }
}