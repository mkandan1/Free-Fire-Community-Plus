/// Codes are written by Mani Kandan
/// Copyright by FFC plus+ 2021


/// Open mobile menu when tapping hamburger menu
var toggle = document.getElementById('mobile-menu-toggle');
var menuClass = document.querySelector('.slide-disabled');
var slideIn = document.querySelector('.silde-in');
var slideOut = document.querySelector('.slide-out');

toggle.addEventListener('click', function() {
    var isMenuOpen = menuClass.classList.contains('slide-in');
    menuClass.setAttribute('class', isMenuOpen ? 'slide-out' : 'slide-in');
    
});

var closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', function() {
    var isMenuOpen = menuClass.classList.contains('slide-in');
    menuClass.setAttribute('class', isMenuOpen ? 'slide-out' : 'slide-in');
})