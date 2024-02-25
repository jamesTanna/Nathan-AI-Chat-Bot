function makeChatBox(type, response) {
    const div = document.createElement('div');
    div.classList.add('chat');
    div.classList.add(type);
    const textNode = document.createTextNode(response);
    div.appendChild(textNode);
    const chatSpace = document.querySelector('#chat-space');
    chatSpace.appendChild(div);
}