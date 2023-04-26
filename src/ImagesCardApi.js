export default class ImagesApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchImages() {
    console.log(this);
    const BASE_URL = `https://pixabay.com/api/?key=35794708-7d8659be85af9da4d1b3626ea&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=3`;

    return fetch(BASE_URL)
      .then(r => r.json())
      .then(data => {
        this.page += 1;
        return data.hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
