const toggleButton = document.querySelector('navbar');
const navbar_menu = document.querySelector('navbar_menu');
const navbar_button = document.querySelector('.navbar_button');


toggleButton.addEventListener('click', () => {
  navbar_menu.classList.toggle('active');
  navbar_button.classList.toggle('active');

});

