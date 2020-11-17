const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
let messageContentInput = document.getElementById('message-content');

const socket = io();

socket.on('message', ({name, message}) => addMessage(name, message));

let userName;


const login = (e) => {
  e.preventDefault();

  if (userNameInput.value == ''){
      window.alert('Please write your login');
  } else {
      userName = userNameInput.value;
      loginForm.classList.remove('show');
      messagesSection.classList.add('show');
  }
  socket.emit('user', userName);
};

const addMessage = (author, content) => {
  const elMessage = document.createElement('li')
  elMessage.classList.add('message', 'message--received', `${author === userName && `message--self`}`, `${author === 'Chat Bot' && `message--bot`}`);
  console.log(listElem);
  elMessage.innerHTML = `
    <h3 class='message__author'>${author === userName ? 'You' : author}</h3>
    <div class='message__content'>${content}</div>
  `;

  messagesList.appendChild(elMessage);
};

const sendMessage = (e) => {
  e.preventDefault();

  let messageContent = messageContentInput.value;

  if (messageContent == ''){
    window.alert('Add your message')
  } else {
    addMessage(userName, messageContent);
    socket.emit('message', {name: userName, message: messageContent});
    messageContentInput.value = '';
  }
};

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);