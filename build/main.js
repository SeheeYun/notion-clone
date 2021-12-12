"use strict";
function $(selector) {
    return document.querySelector(selector);
}
const addBtn = $('.add-btn');
const dropdown = $('.add-ul');
addBtn.addEventListener('click', () => {
    dropdown.style.display = 'block';
});
addBtn.addEventListener('blur', () => {
    dropdown.style.display = 'none';
});
