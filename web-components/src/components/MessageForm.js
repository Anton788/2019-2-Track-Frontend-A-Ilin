const template = document.createElement('template');
template.innerHTML = `
    <style>
        form-input {
            width: 100%;
            border: 5px solid rgba(0,31,255,0.21);
        }
        .table{
            height: 100%;
            width: 100%;
            border: 2px solid rgba(0,31,255,0.21);
            border-radius: 4px;
            overflow-y: scroll;   
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
        const json = localStorage.getItem(String(i));
        const message = document.createElement('our-message');
        const mesInfo = JSON.parse(json);
        message.setText(mesInfo.text);
        message.setTime(mesInfo.data);
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
      const message = document.createElement('our-message');
      message.setText(this.$input.value);
      const currentTime = new Date();
      const hours = String(currentTime.getHours());
      const minutes = String(currentTime.getMinutes());
      let time = '';
      time += hours;
      time += ':';
      time += minutes;
      message.setTime(time);
      const messInfo = {
        text: this.$input.value,
        data: time,
      };
      localStorage.setItem(this.count, JSON.stringify(messInfo));
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
