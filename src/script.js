//Au Chargement de la page - Init page
//Create the "Ajouter un livre" button

$(addBookButton);
  
const div_myBooks = document.createElement('div');
  div_myBooks.id = 'myBooks';
  myBooks.appendChild(div_myBooks);
  const hr = document.querySelector('hr');

function addBookButton(){
  
  const addBookButton = document.createElement('button');
  addBookButton.setAttribute("id", "addBookButton");
  addBookButton.setAttribute("type", "button");
  addBookButton.innerHTML= "Ajouter un Livre"; 
  div_myBooks.appendChild(addBookButton);
  $("hr").before(addBookButton);

  addBookButton.addEventListener('click',function(event){
    event.preventDefault();
  });
}


//window.addEventListener('DOMContentLoaded',init);

//const addBookButton =document.getElementById("addBookbutton");

//addBookButton.addEventListener('click',researchFields());

 
//Au clic Ajouter un livre
 //Title of the book & Author fields

  function researchFields(){
 
  const div_researchFields = document.createElement('div');
 document.body.appendChild(div_researchFields);

  const inputTitleField = document.createElement("input");
  inputTitleField.id ="inputTitleField";
  inputTitleField.setAttribute("type", "search");
  inputTitleField.setAttribute("value", "Titre du livre");
  div_researchFields.appendChild(inputTitleField);

 const inputAuthorField = document.createElement("input");
 inputAuthorField.id="inputAuthorField";
 inputAuthorField.setAttribute("type", "search");
 inputAuthorField.setAttribute("value", "Auteur");
 div_researchFields.appendChild(inputAuthorField);

 const div_researchButtons = document.createElement('div');
 div_researchFields.appendChild(div_researchButtons);

 const searchButton = document.createElement("div");
  searchButton.id = 'searchButton';
  searchButton.className = 'button';
  searchButton.innerHTML = "<button> Rechercher </button> ";
  div_researchButtons.appendChild(searchButton);

  const cancelButton = document.createElement("button");
   cancelButton.id = 'cancelButton';
  cancelButton.className = 'button';
  cancelButton.innerHTML = "Annuler ";
  div_researchButtons.appendChild(cancelButton);
 
 }

 $('#addBookButton').on('click',researchFields(),{
});
 
 
//Cancel button clear the input fields

const cancelButton = document.getElementById("cancelButton");
//cancelButton.addEventListener('click',clearInputFields);
 
function clearInputFields(){
  $(addBookButton);
   document.getElementById("div_researchFields").style.display = "none";
inputTitle.value ="";
 
}

//Create the Pochlist Div

const pochListDiv = document.createElement('div');
pochListDiv.id = "MaPochList";
  div_myBooks.appendChild(pochListDiv);
const div_researchButtons =document.getElementById ("div_researchButtons");


$("pochListDiv").before(div_researchButtons);


// Searching book
//onclick searchButton??
function searchBook() {

searchButton.addEventListener('submit', ($event)=> {
  $event.preventDefault();

  let apiRequest = new XMLHttpRequest();
  var title = document.getElementById('inputTitleFied').value;
 var author = document.getElementById('inputAuthorField').value;

  
  if (inputAuthorField.value() == " ")  {
    alert("Veuillez renseigner le nom de l'auteur")
  }
  if(inputTitleField.value() == " "){
    alert("Veuillez renseigner le titre du livre")
    };
  apiRequest.onreadystatechange = function() {

      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

          let response = JSON.parse(this.response);

          if (response.items.length == 0) {
              alert("Aucun livre trouvé");
          } else {
              response.items.map(item => {
                  displayBook(item.volumeInfo, item.id);
              })
          }
      }
  }
  apiRequest.open("GET", "https://www.googleapis.com/books/v1/volumes?q=:" + author + title);
  apiRequest.send();
});
}

//Create pochDiv Result

//Display book results
