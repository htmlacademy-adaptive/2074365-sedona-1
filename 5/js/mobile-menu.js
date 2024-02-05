let logoImageElement = document.querySelector('.logo__image');
let mainNavigationClass = document.querySelector('.main-navigation');
let mainNavigationToggleElement = document.querySelector('.main-navigation__toggle');

logoImageElement.classList.remove('logo__image--no-js');
mainNavigationClass.classList.remove('main-navigation--no-js');

mainNavigationToggleElement.addEventListener('click', function () {
  if (mainNavigationClass.classList.contains('main-navigation--closed')) {
    mainNavigationClass.classList.remove('main-navigation--closed');
    mainNavigationClass.classList.add('main-navigation--opened');
  } else {
    mainNavigationClass.classList.add('main-navigation--closed');
    mainNavigationClass.classList.remove('main-navigation--opened');
  }
});
