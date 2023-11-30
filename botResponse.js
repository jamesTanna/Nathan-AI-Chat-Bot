const date = new Date();
const botName = 'Nathan';

const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthIndex = date.getMonth();

const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayIndex = date.getDay();

const month = monthList[monthIndex];
const day = dayList[dayIndex];

async function replacements(botResponse) {
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
                        ${jokeData.joke}`;
        } catch (e) {
            return 'There was an error. Please try again.';
            throw new Error(e);
        }
    } else if(botResponse.includes('monthName')){
        return botResponse.split('monthName').join(month);
    }else if(botResponse.includes('weekDay')){
        return botResponse.split('weekDay').join(day);
    }
    else return botResponse
}