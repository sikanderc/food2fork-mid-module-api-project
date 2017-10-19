window.onload = function () {
  // createEventListener()
  fetch('https://www.googleapis.com/books/v1/volumes?q=')
  .then(res => res.json())
  .then(json => displayRecipe(json))

  function displayRecipe(json) {
    console.log(json)
  }
}
