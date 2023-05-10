<template>
  <div>
    <h2>{{ news.title }}</h2>
    <p>{{ news.text }}</p>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    console.log(params);
    const { data } = await $axios.get(`/http://localhost:3001/news/${params.id}`);
    return { news: data };
  },
};
</script>
