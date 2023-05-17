export default (axios) => ({
  generalPage() {
    return axios.get(`/json/general.json`);
  },
  postsPage() {
    return axios.get('/api/posts');
  },
  cardsPage() {
    return axios.get('/api/tabs');
  },
  todayList() {
    return axios.get('/api/today');
  },
  soonList() {
    return axios.get('/api/soon');
  },
  newsList() {
    return axios.get('/api/news');
  },
  getNews(id) {
    return axios.get(`/api/news/${id}`);
  },
  affishePage() {
    return axios.get(`/api/movies`);
  },
  getMovies(id) {
    return axios.get(`/api/movies/${id}`);
  },
});
