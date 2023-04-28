import imageCard from './templates/imageCard.hbs';
import Notiflix from 'notiflix';
import ImagesApiServise from './jsParts/ImagesCardApi';
import LoadMoreButton from './jsParts/load-more-button';

const refs = {
  searchform: document.querySelector('.search-form'),
  placeForCard: document.querySelector('.gallery'),
};

const imagesApiServise = new ImagesApiServise();
const loadMoreBtn = new LoadMoreButton({
  selector: '[data-action="load-more"]',
  hidden: true,
});

loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
refs.searchform.addEventListener('submit', onSearch);

function fetchCards() {
  loadMoreBtn.disable();
  imagesApiServise.fetchImages().then(card => {
    imageMarkup(card);
    loadMoreBtn.enable();
  });
}

function onSearch(e) {
  e.preventDefault();
  cleanAll();
  imagesApiServise.query = e.currentTarget.elements.searchQuery.value;
  if (imagesApiServise.query.trim() === '') {
    return Notiflix.Notify.failure('Введите, что хотите найти');
  }
  imagesApiServise.resetPage();
  loadMoreBtn.show();
  fetchCards();
  console.log(fetchCards);
  // console.log(imagesApiServise);
}

function onLoadMore() {
  fetchCards();
}

function imageMarkup(hits) {
  refs.placeForCard.insertAdjacentHTML('beforeend', imageCard(hits));
}

function cleanAll() {
  refs.placeForCard.innerHTML = '';
}
