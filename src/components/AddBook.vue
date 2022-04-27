<template>
  <div class="about" style="width: 80%">
    <form>
      <div class="form-group">
        <label>Book Title</label>
        <input type="text" class="form-control" placeholder="Book Title" v-model="item.title">
      </div>
      <div class="form-group">
        <label>Author</label>
        <input type="text" class="form-control" placeholder="Author" v-model="item.author">
      </div>
      <div class="form-group">
        <label>ISBN</label>
        <input type="text" class="form-control" placeholder="ISBN" v-model="item.isbn">
      </div>
      <button type="button" class="btn btn-primary" v-on:click="addBook">Add Book</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "AddBook",
  data() {
    return {
      item: {}
    }
  },
  methods : {
    addBook() {
      axios.post("/api/book/", this.item).then(() => {
        router.push({ path: "/" });
      }).catch((err) => { this.$toasted.error(err.response.data.message, {duration: 5000}); });
    }
  }
}
</script>