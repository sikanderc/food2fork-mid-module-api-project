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
      let authors = "unknown"
      if (e.volumeInfo.authors) {
        authors = e.volumeInfo.authors.join(", ")
      }
      let pictureURL = e.volumeInfo.imageLinks.smallThumbnail
      let showMore = `<button id="show-button" data-id="${e.id}">Show More</button>`
      html += `<li>Title: ${title}<br>Authors: ${authors}<br>Book Cover:<br><img src='${pictureURL}'><br>${showMore}</li>`
    })
    html += "</ul>"
    let booksDiv = document.getElementById('books')
    booksDiv.innerHTML = html
    let showButtons = document.querySelectorAll('#show-button')
    showButtons.forEach(button => {
      button.addEventListener('click', fetchBook)
    })
  }

  function fetchBook(e) {
    e.preventDefault()
    let bookId = e.target.dataset.id
    fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
    .then(res => res.json())
    .then(json => displayBookShow(json))
  }

  function displayBookShow(json) {
    let html = "<div>"
    let title = json.volumeInfo.title
    let authors = "unknown"
    if (json.volumeInfo.authors) {
      authors = json.volumeInfo.authors.join(", ")
    }
    let pictureURL = json.volumeInfo.imageLinks.medium
    let description = json.volumeInfo.description

    html += `<h1>Title: ${title}</h1><h2>Authors: ${authors}</h2><h3>Description: ${description}</h3> <h3>Book Cover:</h3><br><img src='${pictureURL}'><br>`
    html += "</div>"
    let showDiv = document.getElementById('show')
    showDiv.innerHTML = html
  }
}
