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
      //displaySaved();
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
 var pochListDiv = document.getElementById("content");
         var resultDiv = document.createElement('div');
         resultDiv.id = "resultDiv";
         document.body.appendChild(resultDiv);
         resultDiv.innerHTML = "Résultats de la recherche";
         resultDiv.className = "resultDiv"
         pochListDiv.before(resultDiv);
        
         var bookResultDiv = document.createElement('div');
         bookResultDiv.id = "resultsContent";
         
         bookResultDiv.className = "bookResultDiv";
         resultDiv.appendChild(bookResultDiv);
        
         var myResults = document.createElement('h3');
         myResults.id = 'myResults';
         myResults.className = 'h3';
         
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
 }  
//Display Results of the search in "Résultats de la recherche"
 let bookMap = new Map();

function displayBook(book){
var myResults =document.getElementById("myResults");

var displayCard = document.createElement("div");
displayCard.className= "displayCard";
myResults.appendChild(displayCard)
displayCard.setAttribute('book.id','displayCard')

 let bookmarkLogo = document.createElement("button");
 bookmarkLogo.className = "fas fa-bookmark";
  bookmarkLogo.id = bookmarkLogo;
 displayCard.appendChild(bookmarkLogo);
  
 let bookTitle = document.createElement("p");
 bookTitle.className = "p";
 bookTitle.id = bookTitle;
 bookTitle.innerHTML =  "Titre : " + book.volumeInfo.title ;
 displayCard.appendChild(bookTitle);

  let bookId = document.createElement("p");
  bookId.setAttribute("class", "bookId");
  bookId.setAttribute("data", book.id );
  bookId.innerHTML = "ID : " + book.id;
  displayCard.appendChild(bookId);
  
  let bookAuthor = document.createElement("p");
  bookAuthor.className = "p";
  bookAuthor.id = bookAuthor;
  bookAuthor.innerHTML =  " Auteur : " + book.volumeInfo.authors[0];
 displayCard.appendChild(bookAuthor);

//Checking description
let description = document.createElement("p");
description.setAttribute("class", "description");
description.setAttribute("maxlength", "200");
description.id = description;
displayCard.appendChild(description);

if(book.volumeInfo.description == undefined) {
 description.innerHTML = "Description : Information manquante";
} else {
 description.innerHTML = "Description : " + book.volumeInfo.description.substr(0, 200) + "...";
}
description.setAttribute("data",book.volumeInfo.description)
//Checking image
let bookImage  =document.createElement("img");
bookImage.className = "bookImage"
bookImage.id = bookImage;
displayCard.appendChild(bookImage);
bookImage.setAttribute("class", "bookImage");
    if(book.volumeInfo.imageLinks == undefined) {
          bookImage.setAttribute("src", "./logo/missing.png");
    } else {
         bookImage.setAttribute("src", book.volumeInfo.imageLinks.thumbnail);
}

   bookmarkLogo.addEventListener('click', displayList, displaySaved);

function displayList(){  

  displaySaved();
         let selectedBook =bookId.innerHTML.substring(4)
           bookmarkLogo.id = bookId;
           
      var content = document.querySelector("#content > h2");
      content.className ='content';

      var divDisplaySaved= document.createElement('div');
      divDisplaySaved.id = divDisplaySaved;
      content.appendChild(divDisplaySaved);
      divDisplaySaved.className = 'divDisplaySaved';
     

       let bookmarkBin = document.createElement("button");
        bookmarkBin.className= "fas fa-trash-alt";
        bookmarkBin.id = bookmarkBin;
        divDisplaySaved.appendChild(bookmarkBin);

        bookmarkBin.addEventListener('click', function(){
          divDisplaySaved.remove();
          localStorage.removeItem(selectedBook);
        });   

        let checkBook = false;
               for(let i=0; i<localStorage.length; i++){
          if(selectedBook == localStorage.key(i)){
            checkBook = true;
          }
        };
        
        if(checkBook) {
          alert("Vous ne pouvez ajouter deux fois le même livre");
          divDisplaySaved.style.display = "none";
        } else {
         
          localStorage.setItem(selectedBook,JSON.stringify(bookId));
          localStorage.getItem(bookId)

          let clickedTitle = document.createElement("p");
          clickedTitle.className = "p";
          clickedTitle.id = bookTitle;
          clickedTitle.innerHTML =  "Titre : " + book.volumeInfo.title ;
          divDisplaySaved.appendChild(clickedTitle);
         
           let clickedId = document.createElement("p");
           clickedId.setAttribute("class", "bookId");
           clickedId.setAttribute("data", book.id );
           clickedId.innerHTML = "ID : " + book.id;
           divDisplaySaved.appendChild(clickedId);
           
           let clickedAuthor = document.createElement("p");
           clickedAuthor.className = "p";
           clickedAuthor.id = bookAuthor;
           clickedAuthor.innerHTML =  " Auteur : " + book.volumeInfo.authors[0];
           divDisplaySaved.appendChild(clickedAuthor);
         
           let clickedDescription = document.createElement("p");
           clickedDescription.setAttribute("class", "description");
           clickedDescription.setAttribute("maxlength", "200");
         clickedDescription.id = description;
         divDisplaySaved.appendChild(clickedDescription);
         
        if(book.volumeInfo.description == undefined) {
          clickedDescription.innerHTML = "Description : Information manquante";
         } else {
          clickedDescription.innerHTML = "Description : " + book.volumeInfo.description.substr(0, 200) + "...";
         }
         clickedDescription.setAttribute("data",book.volumeInfo.description)
        
         let clickedImage  =document.createElement("img");
         clickedImage.className = "bookImage"
         clickedImage.id = bookImage;
         divDisplaySaved.appendChild(clickedImage);
         clickedImage.setAttribute("class", "bookImage");
             if(book.volumeInfo.imageLinks == undefined) {
                   clickedImage.setAttribute("src", "./logo/missing.png");
             } else {
                  clickedImage.setAttribute("src", book.volumeInfo.imageLinks.thumbnail);
         }
         //divDisplaySaved.innerHTML = localStorage.getItem(bookId+ clickedAuthor);
        }

      }
      
      let bookSaved  = JSON.parse(localStorage.getItem("clickedId"));
      if(bookSaved!= null){
        for(let i=0; i<bookSaved.length; i++){
         fetch(clickedId + bookSaved[i])
         divDisplaySaved.style.display = "block"
         console.log(bookSaved + "booksaved")
             }
       
          };
        }
      
         

 
    
function displaySaved(){
 }
window.addEventListener('DOMContentLoaded', init);

