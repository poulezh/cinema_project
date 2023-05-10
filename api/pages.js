export default (axios) => ({
  generalPage() {
    return axios.get(`/json/general.json`);
  },
  postsPage() {
    return axios.get('http://localhost:3001/posts');
  },
  cardsPage() {
    return axios.get('http://localhost:3001/cards');
  },
  newsList() {
    return axios.get('http://localhost:3001/news');
  },
});
