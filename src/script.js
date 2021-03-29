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
  
   const inputTitleField = document.createElement("input");
  inputTitleField.setAttribute("type", "search");
  inputTitleField.setAttribute("value", "Titre du livre");
 document.body.appendChild(inputTitleField);

 const inputAuthorField = document.createElement("input");
 inputAuthorField.setAttribute("type", "search");
 inputAuthorField.setAttribute("value", "Auteur");
 document.body.appendChild(inputAuthorField);

 const searchButton = document.createElement("button");
  searchButton.id = "search-button";
  searchButton.className = 'button';
  searchButton.innerHTML = "Rechercher";
  document.body.appendChild(searchButton);

  const cancelButton = document.createElement("button");
  cancelButton.id = "cancel-button";
  cancelButton.className = 'button';
  cancelButton.innerHTML = "Annuler";
  document.body.appendChild(cancelButton);
 }

