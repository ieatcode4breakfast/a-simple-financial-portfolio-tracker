import Popup from './popupTemplate.js';

export class SingleActionPopup extends Popup {
  constructor(
    headerText = 'Popup Header',
    content = 'Insert content here.',
    actionText = 'Confirm'
  ) {
    super(
      headerText,
      content,
      actionText
    );
  }

  display() {
    document.querySelector('.js-popup-section').style.display = "flex";
    this.popupBody = document.querySelector('.js-popup-body');
    this.popupBody.innerHTML = `
      <div class="popup-content js-popup-content">
      </div>
      <div class="buttons-section">
        <button class="js-action-button"></button>
      </div>
    `

    document.querySelector('.js-action-button')
      .addEventListener('click', () => {
        this.action();
      });
  }
}
