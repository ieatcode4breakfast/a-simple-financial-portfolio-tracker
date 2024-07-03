class Popup {
  #headerText;
  #content;
  #actionText;
  #popupBody;

  constructor(
    headerText = 'Popup Header',
    content = 'Insert content here.',
    actionText = 'Confirm'
  ) {
    this.#headerText = headerText;
    this.#content = content;
    this.#actionText = actionText;

    this.#display();
    this.#render();
  }

  #display() {
    document.querySelector('.js-popup-section').style.display = "flex";

    this.#popupBody = document.querySelector('.js-popup-body');
    this.#popupBody.innerHTML = `
      <div class="popup-content js-popup-content">
      </div>
      <div class="buttons-section">
        <button class="js-action-button"></button>
        <button class="js-cancel-button">Cancel</button>
      </div>
    `

    document.querySelector('.js-action-button')
      .addEventListener('click', () => {
        this.action();
        this.#close();
      });

    document.querySelector('.js-cancel-button')
      .addEventListener('click', () => {
        this.#close();
      });
  }

  #render() {
    document.querySelector('.js-popup-header').innerText = this.#headerText;
    document.querySelector('.js-popup-content').innerHTML = this.#content;
    document.querySelector('.js-action-button').innerText = this.#actionText;
  }

  #close() {
    this.#popupBody.innerHTML = '';
    document.querySelector('.js-popup-section').style.display = "none";
  }

  action() {
    console.log('Nothing happens.');
  }
}

export default Popup;