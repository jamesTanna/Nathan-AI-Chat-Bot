function makeChatBox(type, innerText) {
    const div = document.createElement('div');
    div.classList.add('chat');
    div.classList.add(type);
    const textNode = document.createTextNode(innerText);
    div.appendChild(textNode);
    const chatSpace = document.querySelector('#chat-space');
    chatSpace.appendChild(div);
}