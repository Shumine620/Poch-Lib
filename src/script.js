//Au Chargement de la page - Init page
//Create the "Ajouter un livre" button


const div_myBooks = document.createElement('div');
  div_myBooks.id = 'myBooks';
  myBooks.appendChild(div_myBooks);

function init(){
  
  const addBookButton = document.createElement("button");
  addBookButtonName= "addBookButton";
  addBookButton.id = "addBookButton";
  addBookButton.innerHTML= "Ajouter un livre";
  div_myBooks.appendChild(addBookButton);
  
      }
   window.addEventListener('DOMContentLoaded',init);
  
const addBookButton= document.getElementById("addBookButton");

 //Au clic Ajouter un livre
 //Title of the book & Author fields
div_myBooks.addEventListener('click',researchFields);

 const div_researchFields = document.createElement('div');
 document.body.appendChild(div_researchFields);

 function researchFields(){
  
   const inputTitleField = document.createElement("input");
  inputTitleField.setAttribute("type", "search");
  inputTitleField.setAttribute("value", "Titre du livre");
  div_researchFields.appendChild(inputTitleField);

 const inputAuthorField = document.createElement("input");
 inputAuthorField.setAttribute("type", "search");
 inputAuthorField.setAttribute("value", "Auteur");
 div_researchFields.appendChild(inputAuthorField);

 const searchButton = document.createElement("div");
  searchButton.id = 'searchButton';
  searchButton.className = 'button';
  searchButton.innerHTML = "<button> Rechercher </button>";
  div_researchFields.appendChild(searchButton);

  const cancelButton = document.createElement("div");
  cancelButton.id = 'cancelButton';
  cancelButton.className = 'button';
  cancelButton.innerHTML = "<button> Annuler </button>";
  div_researchFields.appendChild(cancelButton);
 
}

//Cancel button clear the input fields

const cancelButton = document.getElementById("cancelButton");
cancelButton.addEventListener('click',clearInputFields);
 
function clearInputFields(){
   document.getElementById("div_researchFields").style.display = "none";
inputTitle.value ="";
    
}


//Create the Pochlist Div
//La pochList Div disparait???
const pochListDiv = document.createElement('div');
pochListDiv.id = "MaPochList";
  div_myBooks.appendChild(pochListDiv);
  
  //div_myBooks.before(pochListDiv);
const hr = document.querySelector('hr');
div_myBooks.insertBefore(hr,pochListDiv);

