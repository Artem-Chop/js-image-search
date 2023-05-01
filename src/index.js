import imageCard from './templates/imageCard.hbs';
import Notiflix from 'notiflix';
import LoadMoreButton from './jsParts/load-more-button';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
let gallery;
let searchQuery = '';
let page = 1;
let imageLeft = 0;

function fetchCards() {
  const BASE_URL = `https://pixabay.com/api/?key=35794708-7d8659be85af9da4d1b3626ea&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;

  return fetch(BASE_URL)
    .then(r => r.json())
    .then(data => {
      return data;
    });
}

const refs = {
  searchform: document.querySelector('.search-form'),
  placeForCard: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreButton({
  selector: '[data-action="load-more"]',
  hidden: true,
});

loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
refs.searchform.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();
  loadMoreBtn.show();
  loadMoreBtn.disable();
  cleanAll();
  page = 1;
  searchQuery = e.currentTarget.elements.searchQuery.value;
  if (searchQuery.trim() === '') {
    return Notiflix.Notify.failure('Введите, что хотите найти');
  }
  const cards = await fetchCards();
  if (cards.hits.length === 0) {
    loadMoreBtn.hide();
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  Notiflix.Notify.info(`Hooray! We found  ${cards.totalHits} images.`);
  imageLeft = cards.totalHits - cards.hits.length;
  imageMarkup(cards.hits);
  const onImage = document.querySelector('.gallery');
  onImage.addEventListener('click', onGallaryLinkClick);

  loadMoreBtn.enable();
  if (imageLeft === 0) {
    loadMoreBtn.hide();
  }

  gallery = new SimpleLightbox('.gallery a');
  gallery.on('show.simplelightbox');

  function onGallaryLinkClick(event) {
    event.preventDefault();
    gallery.on('show.simplelightbox');
  }
}

async function onLoadMore() {
  loadMoreBtn.disable();
  page += 1;
  const cards = await fetchCards();

  imageMarkup(cards.hits);
  imageLeft -= cards.hits.length;

  loadMoreBtn.enable();

  if (imageLeft === 0) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    loadMoreBtn.hide();
  }
  gallery.refresh();
}

function imageMarkup(hits) {
  refs.placeForCard.insertAdjacentHTML('beforeend', imageCard(hits));
}

function cleanAll() {
  refs.placeForCard.innerHTML = '';
}
