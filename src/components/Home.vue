<template>
  <div class="home">
    <router-link to="add"> Add Book </router-link>
    <input
        type="file"
        ref="file"
        name="file"
        @change="dataFileUpload"
    />
    <input type="text" v-model="isbn" placeholder="ISBN"/>
    <input type="text" v-model="author" placeholder="Author"/>
    <input type="text" v-model="title" placeholder="Title"/>
    <button v-on:click="searchBooks"> Search </button>
    <button v-on:click="clearSearch"> Rest </button>

    <div v-for="item in items" :key="item.fileName">
      <h2 v-if="item.books.length > 0"> {{ item.fileName }} <button v-on:click="downloadDataFile(item.fileName)"> Download </button></h2>
      <table class="table" v-if="item.books.length > 0">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Author</th>
          <th scope="col">ISBN</th>
          <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="book in item.books" :key="book.title">
          <th scope="row">{{ book.id }}</th>
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.isbn }}</td>
          <td> <button v-on:click="deleteBook(book.id)"> Delete </button> | <button v-on:click="editBook(book.id)"> Edit </button> </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from "@/router";

export default {
  name: 'HomePage',
  data() {
    return {
      items: [],
      isbn: null,
      author: null,
      title: null
    }
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    fetchBooks() {
      this.items = [];
      axios.get("/api/book/all").then(res => {
        this.items.push.apply(this.items, res.data);
      }).catch((err) => { this.$toasted.error(err.response.data.message, {duration: 5000}); });
    },
    downloadDataFile(filename) {
      let downloadFileName = filename === null ? Math.random().toString(36).slice(2) + ".xml" : filename;
      axios.get("/book/data/download/" + downloadFileName, { responseType: 'blob' }).then((response) => {
        var rawFileData = window.URL.createObjectURL(new Blob([response.data]));
        var documentLinkElement = document.createElement('a');
        documentLinkElement.href = rawFileData;
        documentLinkElement.setAttribute('download', downloadFileName);
        document.body.appendChild(documentLinkElement);
        documentLinkElement.click();
      }).catch((err) => { this.$toasted.error(err.response.data.message, {duration: 5000}); });
    },
    editBook(bookId) {
      router.push({ path: 'edit/' + bookId })
    },
    deleteBook(bookId) {
      axios.delete("/api/book/" + bookId).then(() => {
        this.fetchBooks();
      }).catch((err) => { this.$toasted.error(err.response.data.message, {duration: 5000}); });
    },
    dataFileUpload() {
      this.file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append("file", this.file);
      let request = new XMLHttpRequest();
      request.open("POST", "/uploadFile");
      request.send(formData);
    },
    searchBooks() {
      axios.get("/api/book/search?author=" + this.author + "&title=" + this.title + "&isbn=" + this.isbn).then((response) => {
        this.items = [];
        this.items.push.apply(this.items, response.data);
      }).catch((err) => { this.$toasted.error(err.response.data.message, {duration: 5000}); });
    },
    clearSearch() {
      this.author = null;
      this.isbn = null;
      this.title = null;
      this.fetchBooks();
    }
  }
}
</script>
