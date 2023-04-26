import ImagesApiServise from './ImagesCardApi';
import imageCard from './templates/imageCard.hbs';

const refs = {
  searchform: document.querySelector('.search-form'),
  loadMore: document.querySelector('[data-action="load-more"]'),
  placeForCard: document.querySelector('.gallery'),
};
refs.loadMore.addEventListener('click', onLoadMore);
refs.searchform.addEventListener('submit', onSearch);
const imagesApiServise = new ImagesApiServise();

function onSearch(e) {
  e.preventDefault();
  cleanAll();
  imagesApiServise.query = e.currentTarget.elements.searchQuery.value;
  imagesApiServise.resetPage();
  imagesApiServise.fetchImages().then(imageMarkup);
}

function onLoadMore() {
  imagesApiServise.fetchImages().then(imageMarkup);
}

function imageMarkup(hits) {
  refs.placeForCard.insertAdjacentHTML('beforeend', imageCard(hits));
}

function cleanAll() {
  refs.placeForCard.innerHTML = '';
}

// added: markup templates, markup function, placing cards on click
