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
      <button type="button" class="btn btn-primary" v-on:click="update">Update</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: 'EditBook',
  data() {
    return {
      id: '',
      item: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    axios.get("/api/book/" + this.id).then(res => {
      this.item = res.data;
    }).catch((err) => { this.$toasted.error(err.response.data.message, {duration: 5000}); });
  },
  methods: {
    update() {
      axios.put("/api/book/",
          {
            id : this.id,
            title: this.item.title,
            isbn: this.item.isbn,
            author: this.item.author,
          }).then(() => { router.push("/")  })
          .catch((err) => { this.$toasted.error(err.response.data.message, {duration: 5000}); });
    }
  }
}
</script>
