import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);
// Отримую елемент контейнера
const galleryContainerEl = document.querySelector(".gallery");

// Роблю розмітку елемента галереї
// const createGalleryMarkup = ({ description, original, preview }) => {
//   const itemEl = document.createElement("li");
//   itemEl.classList.add("gallery__item");

//   const linkEl = document.createElement("a");
//   linkEl.classList.add("gallery__link");
//   linkEl.href = original;

//   const imgEl = document.createElement("img");
//   imgEl.classList.add("gallery__image");
//   imgEl.src = preview;
//   imgEl.setAttribute("data-source", original);
//   imgEl.setAttribute("loading", "lazy");
//   imgEl.alt = description;

//   linkEl.append(imgEl);
//   itemEl.append(linkEl);

//   return itemEl;
// };
// const items = galleryItems.map(createGalleryMarkup);
const createGalleryMarkup = galleryItems
  .map(
    ({ description, original, preview }) => `
<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
    loading="lazy"
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
`
  )
  .join("");
// Розгортаю елементи галереї в контейнер
galleryContainerEl.insertAdjacentHTML("afterbegin", createGalleryMarkup);

// Змінна на модалку
let lightbox;

// Підключаємо лайтбокс, щоб активувати зум (вимикаю поведінку браузера за замовчуванням, бо він скачує картинки, а не зумує їх)
galleryContainerEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("gallery__image")) {
    e.preventDefault();

    const source = e.target.dataset.source;

    lightbox = basicLightbox.create(`<img src=${source} /> `);

    lightbox.show();
  }
});

// Роблю закриття по натисканню еск
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.close();
  }
  galleryContainerEl.removeEventListener("keydown", e);
});
