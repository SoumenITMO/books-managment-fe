<template>
  <div class="home">
    <router-link to="add"> Add Book </router-link>
    <input
        type="file"
        ref="file"
        name="file"
        @change="dataFileUpload"
    />
    <div v-for="item in items" :key="item.fileName">
      <h2> {{ item.fileName }} <button v-on:click="downloadDataFile(item.fileName)"> Download </button></h2>
      <table class="table">
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
      items: []
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
      });
    },
    downloadDataFile(filename) {
      axios.get("/book/data/download/" + filename, { responseType: 'blob' }).then((response) => {
        var rawFileData = window.URL.createObjectURL(new Blob([response.data]));
        var documentLinkElement = document.createElement('a');
        documentLinkElement.href = rawFileData;
        documentLinkElement.setAttribute('download', filename);
        document.body.appendChild(documentLinkElement);
        documentLinkElement.click();
      });
    },
    editBook(bookId) {
      router.push({ path: 'edit/' + bookId })
    },
    deleteBook(bookId) {
      axios.delete("/api/book/" + bookId).then(() => {
        this.fetchBooks();
      });
    },
    dataFileUpload() {
      this.file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append("file", this.file);
      let request = new XMLHttpRequest();
      request.open("POST", "/uploadFile");
      request.send(formData);
    }
  }
}
</script>
