export default (axios) => ({
  generalPage() {
    return axios.get(`/json/general.json`);
  },
  postsPage() {
    return axios.get('/api/posts');
  },
  cardsPage() {
    return axios.get('/api/cards');
  },
  newsList() {
    return axios.get('/api/news');
  },
  getNews(id) {
    return axios.get(`/api/news/${id}`);
  },
});
