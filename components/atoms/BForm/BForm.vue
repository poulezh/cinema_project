<template>
  <div>
    <h2>Add post</h2>
    <form @submit.prevent="addPost">
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="title" />
      </div>
      <div>
        <label for="body">Body:</label>
        <textarea id="body" v-model="body"></textarea>
      </div>
      <button type="submit">Add post</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      body: '',
    };
  },
  methods: {
    addPost() {
      axios
        .post('http://localhost:3001/posts', {
          title: this.title,
          body: this.body,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
