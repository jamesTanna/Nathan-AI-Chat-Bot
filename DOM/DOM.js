const DOMNameSpace = 
  function() {
  const getElement = (selector) => document.querySelector(selector);

  const getElements = (selector) => document.querySelectorAll(selector);

  const hideElement = (element) => {
    element.style.display = 'none';
  };

  const hideAllElements = (elements) => {
    elements.forEach(hideElement);
  };

  const setDisplayStyle = (element, property) => {
    element.style.display = property;
  };

  const getStyleProperty = (element, property) => {
    const styles = getComputedStyle(element);
    return styles.getPropertyValue(property);
  };

  const setStyle = (element, property, value) => {
    element.style.setProperty(property, value);
  };

  const setInnerHtml = (element, html) => {
    element.innerHTML = html;
  };

  const setInnerText = (element, text) => {
    element.innerText = text;
  };

  const addElementToParent = (element, innerText, parentElement = document.body) => {
    const newElement = document.createElement(element);
    newElement.appendChild(document.createTextNode(innerText));
    parentElement.appendChild(newElement);
    return newElement;
  };

  const addVoidElementToParent = (element, parentElement = document.body) => {
    const newElement = document.createElement(element);
    parentElement.appendChild(newElement);
    return newElement;
  };

  const setAttribute = (element, attribute, value) => {
    const newAttribute = document.createAttribute(attribute);
    newAttribute.value = value;
    element.setAttributeNode(newAttribute);
  };

  const attachEventListener = (element, event, callback) => {
    element.addEventListener(event, callback);
  };
  const addVoidElementWithClass = (element, className, parentElement = document.body) => {
    const newElement = addVoidElementToParent(element, parentElement);
    newElement.classList.add(className);
    return newElement;
  };
  const addElementWithClass = (element, innerText, className, parentElement = document.body) => {
    const newElement = addElementToParent(element, innerText, parentElement);
    newElement.classList.add(className);
    return newElement;
  };

  const click = (element, callback) => {
    element.addEventListener('click', callback);
  };

  const dblclick = (element, callback) => {
    element.addEventListener('dblclick', callback);
  };

  const rightClick = (element, callback) => {
    element.addEventListener('contextmenu', callback);
  };

  const mouseDown = (element, callback) => {
    element.addEventListener('mousedown', callback);
  };

  const mouseEnter = (element, callback) => {
    element.addEventListener('mouseenter', callback);
  };

  const mouseLeave = (element, callback) => {
    element.addEventListener('mouseleave', callback);
  };

  const mouseMove = (element, callback) => {
    element.addEventListener('mousemove', callback);
  };

  const mouseOut = (element, callback) => {
    element.addEventListener('mouseout', callback);
  };

  const mouseOver = (element, callback) => {
    element.addEventListener('mouseover', callback);
  };

  const mouseUp = (element, callback) => {
    element.addEventListener('mouseup', callback);
  };

  const submit = (formElement, callback) => {
    formElement.addEventListener('submit', callback);
  };

  const hover = (element, callback) => {
    element.addEventListener('mouseenter', callback);
    element.addEventListener('mouseout', callback);
  };

  const keyUp = (element, callback) => {
    element.addEventListener('keyup', callback);
  };
  const setClass = (element, className) => {
    element.classList.add(className);
  };

  const keyDown = (element, callback) => {
    element.addEventListener('keydown', callback);
  };

  const change = (selectElement, callback) => {
    selectElement.addEventListener('change', callback);
  };

  const resize = (element, callback) => {
    element.addEventListener('resize', callback);
  };

  const windowResize = (callback) => {
    window.addEventListener('resize', callback);
  };

  const logOne = (message) => console.log(message);

  const logAll = (messages) => messages.forEach((message) => console.log(message));

  const valueOf = (inputNameString) => {
    const input = getElement(inputNameString);
    return input.value;
  };

  const setId = (element, value) => {
    setAttribute(element, 'id', value);
  };
  
  const removeClass = (element, className) => {
      element.classList.remove(className);
  };
  
  const toggleClass = (element, className) => {
      element.classList.toggle(className);
  };
  
  const getAttribute = (element, attribute) => {
      return element.getAttribute(attribute);
  };
  
  const removeAttribute = (element, attribute) => {
      element.removeAttribute(attribute);
  };
  
  const getParent = (element) => {
      return element.parentNode;
  };
  
  const getNextSibling = (element) => {
      return element.nextElementSibling;
  };
  
  const getPreviousSibling = (element) => {
      return element.previousElementSibling;
  };
  
  const resetForm = (formElement) => {
      formElement.reset();
  };
  
  const disableFormElement = (formElement, elementName) => {
      const input = getElement(`${formElement} [name="${elementName}"]`);
      input.disabled = true;
  };
  
  const enableFormElement = (formElement, elementName) => {
          const input = getElement(`${formElement} [name="${elementName}"]`);
          input.disabled = false;
    }
    
    const makeFetchRequest = async (url, method, callback) => {
        try {
            const response = await fetch(url, { method });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.text();
            callback(data);
        } catch (error) {
            console.error('Error during fetch request:', error);
        }
    };

  const DOM = {
    getElement,
    getElements,
    hideElement,
    hideAllElements,
    setDisplayStyle,
    getStyleProperty,
    setStyle,
    setInnerHtml,
    setInnerText,
    addElementToParent,
    addVoidElementToParent,
    setAttribute,
    attachEventListener,
    click,
    dblclick,
    rightClick,
    mouseDown,
    mouseUp,
    mouseOut,
    mouseMove,
    mouseOver,
    mouseEnter,
    mouseLeave,
    submit,
    hover,
    setClass,
    addElementWithClass,
    addVoidElementWithClass,
    keyUp,
    keyDown,
    change,
    resize,
    windowResize,
    logOne,
    logAll,
    valueOf,
    setId,
    removeClass,
    toggleClass,
    getAttribute,
    removeAttribute,
    getParent,
    getNextSibling,
    getPreviousSibling,
    resetForm,
    disableFormElement,
    enableFormElement,
    makeFetchRequest,
  };
  return DOM;
};
const DOM = DOMNameSpace();