//Au Chargement de la page - Init page
//Create the "Ajouter un livre" button


function init(){
  const div_myBooks = document.createElement('div');
  div_myBooks.id = 'myBooks';
  div_myBooks.innerHTML = "<button> Ajouter un livre </button>";
  document.getElementById('myBooks').appendChild(div_myBooks);
      }
   window.addEventListener('DOMContentLoaded',init);
  

 //Au clic Ajouter un livre
 //Title of the book & Author fields
 myBooks.addEventListener('click',researchFields);

 function researchFields(){
  
  const divSearch = document.createElement('searchDiv');

   const inputTitleField = document.createElement("input");
  inputTitleField.setAttribute("type", "search");
  inputTitleField.setAttribute("value", "Titre du livre");
  divSearch.appendChild(inputTitleField);
  document.body.appendChild(inputTitleField);

 const inputAuthorField = document.createElement("input");
 inputAuthorField.setAttribute("type", "search");
 inputAuthorField.setAttribute("value", "Auteur");
 divSearch.appendChild(inputAuthorField);
 document.body.appendChild(inputAuthorField);

 const searchButton = document.createElement("button");
  searchButton.id = 'searchButton';
  searchButton.className = 'button';
  searchButton.innerHTML = "Rechercher";
  divSearch.appendChild(searchButton);
  document.body.appendChild(searchButton);

  const cancelButton = document.createElement("button");
  cancelButton.id = 'cancelButton';
  cancelButton.className = 'button';
  cancelButton.innerHTML = "Annuler";
  divSearch.appendChild(cancelButton);
  document.body.appendChild(cancelButton);
 };
 
/*Cancel button clear the input fields
//cancelButton.addEventListener('click',init());
 document.getElementById('cancelButton').addEventListener("click",clearInputFields());
  
function clearInputFields(){
//function init();
}*/

// Create the Pochlist Div


/*const pochListDiv = document.createElement('div');
const pochListDiv = document.getElementById('content');*/