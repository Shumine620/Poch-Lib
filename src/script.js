//Au Chargement de la page - Init page
//Create the "Ajouter un livre" button

function init(){
  const div_myBooks = document.createElement('div');
  div_myBooks.id = 'myBooks';
  myBooks.appendChild(div_myBooks);

  const hr = document.querySelector('hr');
  document.body.appendChild(div_myBooks);

  const addBookButton = document.createElement("button"); 
      addBookButton.id = 'addBookButton';
      addBookButton.className = 'button';
      addBookButton.innerHTML= "Ajouter un Livre"; 
      div_myBooks.appendChild(addBookButton);
  
      $("hr").before(addBookButton);
      addBookButton.addEventListener('click',researchFields);   
}


//Title of the book & Author fields + Search and cancel buttons
function researchFields(){

  const div_researchFields = document.createElement('div');
 document.body.appendChild(div_researchFields);

 const titre =document.createElement("label")
titre.id="titre";
titre.setAttribute("for", "inputTitleField");
titre.textContent = "Titre du Livre";

linebreak = document.createElement("br");
titre.appendChild(linebreak);

  const inputTitleField = document.createElement("input");
  inputTitleField.id ="inputTitleField";
  inputTitleField.setAttribute("type", "search");

  div_researchFields.appendChild(inputTitleField);
 
  $("#inputTitleField").before(titre);

  const brline = document.createElement('br');
  div_researchFields.appendChild(brline);
  brline.id="breakline";

  const auteur =document.createElement("label")
  auteur.id="auteur";
  auteur.setAttribute("for", "authorInputField");
  auteur.textContent = "Auteur";
  
  linebreak2 = document.createElement("br");
  auteur.appendChild(linebreak2);

 const inputAuthorField = document.createElement("input");
 inputAuthorField.id="inputAuthorField";
 inputAuthorField.setAttribute("type", "search");

 div_researchFields.appendChild(inputAuthorField);
 inputAuthorField.style.display = 'inline-block';

 $("#inputAuthorField").before(auteur);
 
const div_researchButtons = document.createElement('div');
 div_researchFields.appendChild(div_researchButtons);

 const searchButton = document.createElement("button");
  searchButton.id = 'searchButton';
  searchButton.className = 'button';
  searchButton.innerHTML = "Rechercher ";
  div_researchButtons.appendChild(searchButton);
 
   
  linebreak3 = document.createElement("br");
  
  const cancelButton = document.createElement("button");
   cancelButton.id = 'cancelButton';
  cancelButton.className = 'button';
  cancelButton.innerHTML = "Annuler ";
  div_researchButtons.appendChild(cancelButton);
 
  cancelButton.before(linebreak3);

  $("hr").before(div_researchFields);
 
 cancelButton.addEventListener('click',clearInputFields,resultField);
  searchButton.addEventListener('click',resultField);
  searchButton.addEventListener('click',searchBook);
  searchButton.addEventListener('submit',searchBook);

  inputTitleField.addEventListener('submit', (event) => {
      title = event.target.value;});
  inputAuthorField.addEventListener('submit', (event) => {
      author = event.target.value;
        });
        
      }
     
function resultField(){
  const pochListDiv = document.getElementById("content");
         const resultDiv = document.createElement('div');
         resultDiv.id = "resultDiv";
         document.body.appendChild(resultDiv);
         pochListDiv.before(resultDiv);
        
         const bookResultDiv = document.createElement('div');
         bookResultDiv.id = "resultsContent";
         resultDiv.appendChild(bookResultDiv);
        
         const myResults = document.createElement('h3');
         myResults.id = 'myResults';
         myResults.className = 'h3';
         myResults.innerHTML = "Résultats de la recherche";
        pochListDiv.style.display = "none";
         bookResultDiv.before(myResults);
        
         const brline2 = document.createElement('br');
          bookResultDiv.appendChild(brline2);
          brline2.id="breakline2";
     

}      

//Cancel button clear the input fields
function clearInputFields(){
 
  document.getElementById('researchFields');
  document.querySelector("#myBooks > div:nth-child(4)").remove(); 
  document.getElementById('resultField');
  document.querySelector("#resultDiv").remove();
  document.querySelector("#noBookFound").remove();
  document.getElementById("content").style.display="block";
}
function noBookFound(){
  const noBookFound = document.createElement("p");
  noBookFound.id= "noBookFound";
  noBookFound.setAttribute("class", "noBookFound");
  noBookFound.innerHTML = "Aucun livre n’a été trouvé";
  document.querySelector("#myResults").appendChild(noBookFound);
  document.querySelector("#content").before(noBookFound);  
}

function searchBook(){
  var title = document.getElementById('inputTitleField').value;
  var author = document.getElementById('inputAuthorField').value;
  
  let emptyFieldAlert = document.createElement("div");
  document.querySelector("#myBooks > div:nth-child(4)").appendChild(emptyFieldAlert);
 if (title == ''|| author == '') {
      const emptyFieldAlertT = document.createElement("h3");
      emptyFieldAlert.id = "emptyFieldAlert";
      emptyFieldAlert.className = 'h3';
      emptyFieldAlert.innerHTML = "Merci de renseigner les champs de recherche.";
      emptyFieldAlert.style.color = "red";
      emptyFieldAlert.appendChild(emptyFieldAlertT);
          }

  const apiK= "AIzaSyCe3Dpkc52IYszEgfE9uOq5OShSCvY_jDY";

  var xhr = new XMLHttpRequest();
  var request = 'https://www.googleapis.com/books/v1/volumes?q=' + title + '+inauthor:'+ author +"&key="+ apiK;
  xhr.open('GET', request);
 xhr.send();

  xhr.addEventListener('readystatechange', function() {

    if (xhr.readyState === XMLHttpRequest.DONE   && xhr.status == 200) {//Holds and return the status of the XMLHttpRequest
        
          let results = JSON.parse(xhr.responseText);//Returns the response data as a string

              if(results.totalItems){
              
              for (var i=0; i<results.items.length; i++){ 
                book = results.items[i];
             displayBook(book, myResults,  "fas fa-bookmark" ); 
           
              }
           } else {
               noBookFound();
           }
          }                   
  }); 
  let bookSaved = JSON.parse(sessionStorage.getItem("bookSaved"));
  if (bookSaved) {
      bookSaved.forEach(book => displayBook(book, $("#myResults"),"fa fa-trash"));
  }

 }  
 

function displayBook(book, bookmarkClass){

const myResults =document.getElementById("myResults");
myResults.style.display = "flex";
  
const displayCard = document.createElement("div");
displayCard.className= "dispayCard";
myResults.appendChild(displayCard)

 let bookmarkLogo = document.createElement("button");
  bookmarkLogo.className= "fas fa-bookmark";
 bookmarkLogo.id = bookmarkLogo;
 displayCard.appendChild(bookmarkLogo);

  bookTitle= $("bookTitle" ).add( "<p> Titre : " + book.volumeInfo.title + "</p>" ).appendTo( "#displayCard"); 
 
  let bookId = document.createElement("p");
  bookId.setAttribute("class", "bookId");
  bookId.setAttribute("data", book.id );
  bookId.innerHTML = "ID: " + book.id;
  displayCard.appendChild(bookId);

  bookAuthor= $("bookAuthor" ).add( "<p> Auteur : " + book.volumeInfo.authors[0] + "</p>" ).appendTo("#displayCard");
 
//Checking description
let description = document.createElement("p");
description.setAttribute("class", "description");
description.setAttribute("maxlength", "200");
description.id = description;
displayCard.appendChild(description);

if(book.volumeInfo.description == undefined) {
 description.innerHTML = "Description: Information manquante";
} else {
 description.innerHTML = "Description: " + book.volumeInfo.description.substr(0, 200) + "...";
}
description.setAttribute("data",book.volumeInfo.description)
//Checking image
let bookImage  =document.createElement("img");
bookImage.id = bookImage;
displayCard.appendChild(bookImage);

bookImage.setAttribute("class", "bookImage");
    if(book.volumeInfo.imageLinks == undefined) {
          bookImage.setAttribute("src", "./logo/missing.png");
    } else {
         bookImage.setAttribute("src", book.volumeInfo.imageLinks.thumbnail);
}


let bookmark = $('<p id="bmark" class="bmark" ><i class="' + bookmarkClass + '"></i></p>'); 
let selectedBook = $("#" + book.id);    

    bookmarkLogo.addEventListener('click', function(event){
    
     const divSavedBook= document.createElement('div');
      divSavedBook.id = divSavedBook+ book.id;
     divSavedBook.className = 'div';
      divSavedBook.innerHTML = " Ma Poche Liste";
      displayCard.appendChild(divSavedBook);

     console.log("selectedBook =="+ selectedBook);

  event.target.innerHTML = ("JUST CLICKED")

 
     const bookmarkBin = document.createElement("button");
        bookmarkBin.className= "fas fa-trash-alt";
        bookmarkBin.id = bookmarkBin;
        divSavedBook.appendChild(bookmarkBin);
 
        
  bookmarkBin.addEventListener('click', function(){
    divSavedBook.remove();})
   
    let bookSaved = JSON.parse(sessionStorage.getItem("bookSaved"));
   // bookSaved = bookSaved.filter(bookToFilter => bookToFilter.id != book.id)
    sessionStorage.setItem("bookSaved", JSON.stringify(bookSaved));
   
    console.log("booksaved= "+bookSaved);

 
    if (selectedBook=== book.id) { 
        alert("Vous ne pouvez ajouter deux fois le même livre");
    } else { 
   
    displayCard.appendChild(divSavedBook);
        bookmark.children("i").removeClass();
        bookmark.children("i").addClass("fa fa-trash");
        displayList(book);
    }
event.preventDefault();
})

}

 
function displayList(book){

      let bookSaved = JSON.parse(sessionStorage.getItem("bookSaved")); 
      if (bookSaved) {
          bookSaved.push(book); 
          sessionStorage.setItem("bookSaved", JSON.stringify(bookSaved)); 
      } else {
          sessionStorage.setItem("bookSaved", JSON.stringify([book])); 
      }
      displayBook(book);
     //console.log(bookSaved);
  }

window.addEventListener('DOMContentLoaded', init);

