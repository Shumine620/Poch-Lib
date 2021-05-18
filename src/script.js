class Book {
  constructor(title, idISBN, savedBook, author, description,image) {
    this.title = title;
    this.idISBN = idISBN;
    this.savedBook = savedBook;
    this.author = author;
    this.description = description;
    this.image =image;
  }

  displayCard(divDisplayCard) {
    const bookdiv = document.createElement("bookdiv");
    bookdiv.classList.add("card");
    const bookDetail = document.createElement("div");
    bookDetail.classList.add("card__info");
    const bookImage = document.createElement("div");
    bookImage.classList.add("card__img");
    const bookmarkLogo = document.createElement("i");
    bookmarkLogo.classList.add("fas");
    bookmarkLogo.classList.add("fa-bookmark");
    bookmarkLogo.id = bookmarkLogo;
    const bookmarkBin = document.createElement("i");
    bookmarkBin.classList.add("fas");
    bookmarkBin.classList.add("fa-trash");
    bookmarkBin.id = bookmarkBin;
    bookmarkBin.style.display = "none";
    const elementTitle = document.createElement("h3");
    elementTitle.classList.add("card__info--title");
    const elementId = document.createElement("h3");
    elementId.id = "elementId";
    const idHiddenElt = document.createElement("div");
    idHiddenElt.style.display = "none";
    const elementAuthor = document.createElement("h3");
    const elementDescription = document.createElement("h3");
    const elementImage = document.createElement("img");
    elementImage.src = this.image;
    elementImage.id = elementImage;
    elementTitle.innerHTML = "Titre : " + this.title;
    elementId.innerHTML = "Id : " + this.idISBN;
    idHiddenElt.innerHTML = this.savedBook;
    elementAuthor.innerHTML = "Auteur : " + this.author;
    elementDescription.innerHTML = "Description : " + this.description;
    const bookDetailChildren = [bookmarkLogo, bookmarkBin, elementTitle, elementId, idHiddenElt, elementAuthor, elementDescription];
    for (const child of bookDetailChildren) {
      bookDetail.appendChild(child);
    }
    bookImage.appendChild(bookDetail);
    bookImage.appendChild(elementImage);
    bookdiv.appendChild(bookDetail);
    bookdiv.appendChild(bookImage);
    divDisplayCard.appendChild(bookdiv);
  }
}

function insertBreakline(breakline) {
  const div_myBooks = document.getElementById("myBooks");
  const hr = document.getElementsByTagName('hr')[0];
   div_myBooks.insertBefore( breakline,hr)
}

function inputFields(label, input) {
  const field = document.createElement("div");
  field.classList.add("form__field");
  field.appendChild(label);
  field.appendChild(input);
  return field;
}

function researchFields() {
  const form = document.createElement("div");
  form.classList.add("form");
  document.body.appendChild(form);

  const titre = document.createElement("label");
  titre.setAttribute("for", "inputTitleField");
  titre.id = "titre";
  titre.textContent = "Titre du Livre";

  const inputTitleField = document.createElement("input");
  inputTitleField.setAttribute("type", "search");
  inputTitleField.setAttribute("name", "intitle");
  inputTitleField.setAttribute("id", "inputTitleField");
  inputTitleField.id = "inputTitleField"
  form.appendChild(inputFields(titre, inputTitleField));

  const auteur = document.createElement("label");
  auteur.setAttribute("for", "inputAuthorField");
  auteur.id="auteur";
  auteur.textContent = "Auteur";

  const inputAuthorField = document.createElement("input");
  inputAuthorField.setAttribute("type", "search");
  inputAuthorField.setAttribute("name", "inauthor");
  inputAuthorField.setAttribute("id", "author");
  inputAuthorField.id = 'inputAuthorField';
  form.appendChild(inputFields(auteur, inputAuthorField));

  const div_researchButtons = document.createElement('div');
  div_researchButtons.id = div_researchButtons;
  div_researchButtons.className = "div_researchButtons" 
  form.appendChild(div_researchButtons);


  const searchButton = document.createElement("button");
  searchButton.innerHTML = "Rechercher";
  searchButton.className = 'searchButton';
  searchButton.id = searchButton;
  div_researchButtons.appendChild(searchButton);

  searchButton.onclick = (event) => {
    event.preventDefault();
    searchBook();
     };

   let linebreak = document.createElement("br");
linebreak.appendChild(form);

   const cancelButton = document.createElement("button");

  cancelButton.innerHTML = "Annuler";
  cancelButton.className = 'cancelButton';
  cancelButton.id = cancelButton;
  cancelButton.onclick = (event) => {
    event.preventDefault();
    cancelSearch(form);
   };

  div_researchButtons.appendChild(cancelButton);
 linebreak.before(cancelButton);
linebreak.after(searchButton);

  form.appendChild(inputFields(auteur, inputAuthorField));
   form.appendChild(searchButton);
 form.appendChild(cancelButton);

 insertBreakline(form);
 form.style.display = "none";
 
}

function displayForm() {
  const button = document.getElementById("addBookButton");
  const form = document.getElementsByClassName("form")[0];
   if (button !== null && form !== null) {
    button.style.display = "none";
    form.style.display = "block";
   }
}

function addButton() {
  const addBookButton = document.createElement("button");
  addBookButton.innerHTML = "Ajouter un livre";
  addBookButton.className = 'button';
  addBookButton.id = 'addBookButton';
  insertBreakline(addBookButton);
  addBookButton.onclick = displayForm;
}


function resultField() {
  const divResults = document.createElement("div");
  divResults.id = "divResults";
  divResults.classList.add("res-container");
  divResults.style.display = "none";
 const resultsLine = document.createElement("hr");
  const resultsTitle = document.createElement("h2");
  resultsTitle.innerHTML = "Résultats de recherche";
   const booksCard = document.createElement("div");
  booksCard.classList.add("booksCard");
  booksCard.id = "booksCard";
 divResults.appendChild(resultsLine);
  divResults.appendChild(resultsTitle);
   divResults.appendChild(booksCard);
  insertBreakline(divResults);
}

function pochListDiv() {
  const divPochList = document.getElementById("content");
  const myResults = document.createElement("div");
  myResults.classList.add("booksCard");
  myResults.id = "myResults";
  divPochList.appendChild(myResults);
}

function onload() {
  researchFields();
  addButton();
  resultField();
  pochListDiv();
  displayList();
}

window.addEventListener("load", onload);

function bookMarks() {
  const icons = document.querySelectorAll("#myResults i");
  
  for (const icon of icons) {
    if (icon.className === "fas fa-bookmark" && icon.style.display !== "none") {
      icon.style.display = "none";
    }
    if (icon.className === "fas fa-trash" && icon.style.display === "none") {
      icon.style.display = "block";
          }
   
  }
}

function bookmarkLogoClick(selectedBook) {
  for (let i = 0; i < selectedBook.length; i++) {
    const bookmarkLogo = document.getElementsByClassName("fa-bookmark")[i];
const bookmarkBin =document.getElementsByClassName("fa-trash")[i];
    bookmarkLogo.onclick = () => {

      saveBook(selectedBook[i], selectedBook[i].savedBook);
      bookmarkLogo.style.display ="none";
    bookmarkBin.style.display = "block"; 
    };
    
  }
}

function bookmarkBinDel(savedBook, divDisplayCard) {
  const bookdiv = divDisplayCard.lastChild;
   const bookmarkBin = bookdiv.getElementsByTagName("i")[1];
  bookmarkBin.addEventListener("click", () => {
    removeBook(savedBook);
         bookmarkBin.style.display = "none"; 
  });
}

function isInSession(savedBook) {
  if (sessionStorage.getItem(savedBook) !== null) {
    alert("Vous ne pouvez ajouter deux fois le même livre !");

    return true;
  }
  return false;
}

function saveBook(book, savedBook) {
  const div_myBooks = document.getElementById("myResults");
  if (!isInSession(savedBook)) {
    sessionStorage.setItem(book.savedBook, JSON.stringify(book));
    book.displayCard(div_myBooks);
    bookMarks();
    bookmarkBinDel(savedBook, div_myBooks);
  }
}

function removeBook(savedBook) {
  const clickedBook = document.querySelectorAll("#myResults > bookdiv");
  
  clickedBook.forEach((book) => {
    const clickedId = book.querySelector(".card__info > div");
    if (clickedId.innerHTML === savedBook) {
      book.parentNode.removeChild(book);
      sessionStorage.removeItem(savedBook);
    }
  });
}

function displayResults(data, list) {
  let book, title, id, idHidden, author, description, image;
  let selectedBook = [];
  let index = 0;
  for (book of data.items) {
    id = null;
    title = book.volumeInfo.title;
    idHidden = book.id;
    if (book.volumeInfo.industryIdentifiers) {
      for (let i = 0; i < book.volumeInfo.industryIdentifiers.length; i++) {
        if (book.volumeInfo.industryIdentifiers[i].type === "ISBN_13") {
          id = book.volumeInfo.industryIdentifiers[i].identifier;
        }
      }
      if (!id) {
        id = book.volumeInfo.industryIdentifiers[0].identifier;
      }
    } else {
      id = "Information manquante";
    }
    author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : "Information manquante";

    if (book.volumeInfo.description) {
      description = book.volumeInfo.description;
      if (description.length > 200) {
        description = description.slice(0, 200);
        description = description.substring(0, description.lastIndexOf(" "));
      }
    } else {
      description = " Information manquante";
    }

    image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "./logo/missing.png";
    selectedBook[index] = new Book(title, id, idHidden, author, description, image);
    selectedBook[index].displayCard(list);
    index++;
  }
  bookmarkLogoClick(selectedBook);
}

function displayList() {
  const div_myBooks = document.getElementById("myResults");
  const keys = Object.keys(sessionStorage);
  for (const key of keys) {
    const sessionObject = JSON.parse(sessionStorage.getItem(key));
    const book = new Book(sessionObject.title, sessionObject.idISBN, sessionObject.savedBook, sessionObject.author, sessionObject.description, sessionObject.image);
    book.displayCard(div_myBooks);
    bookmarkBinDel(sessionObject.savedBook, div_myBooks);
  }
  bookMarks();
}


function searchBook() {
  const resultsContainer = document.getElementById("divResults");
  const bookList = document.getElementById("booksCard");
   var title = document.getElementById('inputTitleField').value;
  var author = document.getElementById('inputAuthorField').value;

  if (title === "" && author === "") {
    resultsContainer.style.display = "none";
    alert("Merci de renseigner les champs de recherche.")
    
  }
  const apiK= "AIzaSyCe3Dpkc52IYszEgfE9uOq5OShSCvY_jDY";
  while (bookList.childNodes.length > 0) {
    clearBookList(bookList);
  }
 
    var xhr = new XMLHttpRequest();
  var request = 'https://www.googleapis.com/books/v1/volumes?q='+ title + '+inauthor:'+ author +"&key="+ apiK;
  xhr.open('GET', request);
  xhr.send();
  xhr.addEventListener('readystatechange', function() {

    if (xhr.readyState === XMLHttpRequest.DONE   && xhr.status == 200) {
            let results = JSON.parse(xhr.responseText);
           
          if (results.totalItems === 0) {
            alert("Aucun livre n’a été trouvé");
            resultsContainer.style.display = "none";
                    
          } else {
            displayResults(results, bookList);
            resultsContainer.style.display = "block";          
          }
        }
      });
    }
  
function clearBookList(divDisplayCard) {
  while (divDisplayCard.lastChild) {
    divDisplayCard.removeChild(divDisplayCard.lastChild);
  }
}

function cancelSearch(form) {
  const divDisplayCard = document.getElementById("booksCard");
  const button = document.getElementById("addBookButton");
  const resContainer = document.getElementById("divResults");
  const inputs = form.querySelectorAll("input");
  if (divDisplayCard) {
    clearBookList(divDisplayCard);
  }
  form.style.display = "none";
  button.style.display = "block";
  resContainer.style.display = "none";

  for (const input of inputs) {
    if (input) {
      input.value = "";
    }
  }
}
