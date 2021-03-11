// ЗАДАНИЕ
// Создай галерею с возможностью клика по ее элементам и просмотра полноразмерного изображения в модальном окне.

// Разбей задание на несколько подзадач:
// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того,
// чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

// Разметка элемента галереи
// Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе img,
// и указываться в href ссылки(это необходимо для доступности).

// Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой по работе с событиями.
// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

import gallery from './gallery-items.js';

const ulRef = document.querySelector('.js-gallery');
const galleryMarkup = createGalleryMarkup(gallery);
const modalRef = document.querySelector('.js-lightbox');
const modalImgRef = document.querySelector('.lightbox__image');
const closeBtnRef = document.querySelector('.lightbox__button');
const overlayRef = document.querySelector('.lightbox__overlay');

let index = 0;

function createGalleryMarkup(gallery) {
    return gallery.map(({preview,original,description}) => {
        return `
    <li class="gallery__item">
        <a
            class="gallery__link"
            href="${original}"
            >
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </li>`;
    }).join('');
};

ulRef.insertAdjacentHTML('beforeend', galleryMarkup);

const onModalOpen = (e) => {
  e.preventDefault();
  if (e.target.nodeName === 'IMG') {
    modalImgRef.src = e.target.dataset.source;
    modalRef.classList.add('is-open');
    index = +e.target.dataset.index;
    window.addEventListener('keydown', onKeyboard);
  }
};

function removeAtributes() {
    modalRef.classList.remove('is-open');
    modalImgRef.src = '';
    window.removeEventListener('keydown', onKeyboard);
};

const onCloseBtn = () => {
    removeAtributes();
};

const onOverlayClose = () => {
    removeAtributes();
};

const onKeyboard = e => {
  if (e.key === 'Escape') {
      removeAtributes();
  }

};

ulRef.addEventListener('click', onModalOpen);
closeBtnRef.addEventListener('click', onCloseBtn);
overlayRef.addEventListener('click', onOverlayClose);