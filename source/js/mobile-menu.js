let logoImageElement = document.querySelector('.logo__image');
let mainNavigationClass = document.querySelector('.main-navigation');
let mainNavigationToggleElement = document.querySelector('.main-navigation__toggle');

logoImageElement.classList.remove('logo__image--no-js');
mainNavigationClass.classList.remove('main-navigation--no-js');

mainNavigationToggleElement.addEventListener('click', function () {
  mainNavigationClass.classList.toggle('main-navigation--closed');
  mainNavigationClass.classList.toggle('main-navigation--opened');
});
