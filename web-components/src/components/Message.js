const template = document.createElement('template');
template.innerHTML = `
    <style>
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
    </style>
    <div class="result">
        <div class="pos_text">
            <div class="mess_text">
            </div>
            <div class="timer">
            </div>
        </div>
    </div>
`;


window.onload = function reload() {
  const loaded = sessionStorage.getItem('loaded');
  if (loaded) {
    sessionStorage.getItem('loaded');
  } else {
    sessionStorage.setItem('loaded', true);
  }
};

class Message extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$text_message = this.shadowRoot.querySelector('.mess_text');
    this.$cur_time = this.shadowRoot.querySelector('.timer');
  }

  setText(text) {
    this.$text_message.innerText = text;
  }

  setTime(time) {
    this.$cur_time.innerHTML = time;
  }
}

customElements.define('our-message', Message);
