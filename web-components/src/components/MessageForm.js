const template = document.createElement('template');
template.innerHTML = `
    <style>
        form-input {
            width: 100%;
            border: 5px solid rgba(0,31,255,0.21);
        }
        .result {
            margin-left: auto;
            margin-right: 0;
            margin-top: 6px;
            min-height: 30px;
            border: 2px solid #dedede;
            background-color: #f1f1f1;
            border-radius: 5px;
            padding: 10px;
            max-width: max-content;
            display: flex;
            justify-content: flex-end;
            /*max_width: 90%;*/
            content: normal;
            text-align: left;
            word-wrap: break-word;
        }
        .mess_text{
        }
        .table{
            height: 100%;
            width: 100%;
            border: 2px solid rgba(0,31,255,0.21);
            border-radius: 4px;
            overflow-y: scroll;   
        }
        .pos_text{
            display: flex;
            width: 100%;
            flex-direction: column;
            justify-content: flex-end;
            align-content: flex-end;
            align-self: flex-end;
        }
        .timer{
            size: 10px;
            font-size: 10px;
            display: flex;
            justify-content: flex-end;
        }
        .style_form{
            margin-top: 10px;
            height: 500px;
            position: relative;
        }
        input[type=submit] {
            visibility: collapse;
        }
        .head{
            text-align: center;
            border: 4px solid rgba(0,31,255,0.21);
            margin-bottom: 10px;
            background: rgba(0,31,255,0.21);
        }
    </style>
    <form class = "style_form">
        <header class="head">Chat</header>
        <div class = "table"></div>
        <form-input name="message-text" placeholder="Введи сообщение"></form-input>
    </form>
`;


window.onload = function reload() {
  const loaded = sessionStorage.getItem('loaded');
  if (loaded) {
    sessionStorage.getItem('loaded');
  } else {
    sessionStorage.setItem('loaded', true);
  }
};

class MessageForm extends HTMLElement {
  constructor() {
    super();
    this.count = 0;
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$form = this.shadowRoot.querySelector('form');
    this.$input = this.shadowRoot.querySelector('form-input');
    this.$chat_window = this.shadowRoot.querySelector('.table');
    this.$form.addEventListener('submit', this.onSubmit.bind(this));
    this.$form.addEventListener('keypress', this.onKeyPress.bind(this));
    if (!sessionStorage.getItem('loaded')) {
      localStorage.clear();
      localStorage.setItem('count', this.count);
    } else {
      this.count = Number.parseInt(localStorage.getItem('count'), 10);
      for (let i = 1; i <= this.count; i += 1) {
        const message = document.createElement('div');
        message.className = 'result';
        const textMessage = document.createElement('div');
        textMessage.className = 'mess_text';
        const postitonText = document.createElement('div');
        postitonText.className = 'pos_text';
        textMessage.innerText = localStorage.getItem(String(i));
        const time = document.createElement('div');
        time.className = 'timer';
        time.innerHTML = localStorage.getItem(`${String(i)}time`);
        postitonText.appendChild(textMessage);
        postitonText.appendChild(time);
        message.appendChild(postitonText);
        this.$chat_window.appendChild(message);
        this.$chat_window.scrollTop = this.$chat_window.scrollHeight;
        this.$input.$input.value = '';
      }
    }
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.$input.value !== '') {
      this.count += 1;
      const message = document.createElement('div');
      message.className = 'result';
      const textMessage = document.createElement('div');
      textMessage.className = 'mess_text';
      const postitonText = document.createElement('div');
      postitonText.className = 'pos_text';
      textMessage.innerText = this.$input.value;
      const time = document.createElement('div');
      time.className = 'timer';
      const currentTime = new Date();
      time.innerHTML = (`${String(currentTime.getHours())}:${String(currentTime.getMinutes())} ${
        String(currentTime.getDate())}/${String(currentTime.getMonth() + 1)}`);
      postitonText.appendChild(textMessage);
      postitonText.appendChild(time);
      message.appendChild(postitonText);
      /* message.appendChild(time); */
      localStorage.setItem(this.count, this.$input.value);
      localStorage.setItem(`${this.count}time`, time.innerHTML);
      localStorage.removeItem('count');
      localStorage.setItem('count', this.count);
      this.$chat_window.appendChild(message);
      this.$chat_window.scrollTop = this.$chat_window.scrollHeight;
      this.$input.$input.value = '';
    }
  }

  onKeyPress(event) {
    if (event.keyCode === 13) {
      this.$form.dispatchEvent(new Event('submit'));
    }
  }
}

customElements.define('message-form', MessageForm);
