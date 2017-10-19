

window.onload = function () {
  const bookForm = document.getElementById('book-search')
  bookForm.addEventListener('submit', search)

  function fetchBooks(searched) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searched}`)
    .then(res => res.json())
    .then(json => displayBooks(json))
  }

  function search(e) {
    e.preventDefault()
    let searched = document.getElementById("book-search-input").value
    fetchBooks(searched)
    document.getElementById("book-search-input").value = ""
  }

  function displayBooks(json) {
    let html = "<ul>"
    json.items.forEach(e => {
      let title = e.volumeInfo.title
      let authors = e.volumeInfo.authors.join(" ")
      let pictureURL = e.volumeInfo.imageLinks.smallThumbnail
      html += `<li>Title: ${title}<br>Authors: ${authors}<br>Book Cover:<br><img src='${pictureURL}'><hr></li>`
    })
    html += "</ul>"
    let booksDiv = document.getElementById('books')
    booksDiv.innerHTML = html
  }
}
