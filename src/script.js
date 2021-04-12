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
   inputAuthorField.style.display = 'inline-block';
  
   const div_researchButtons = document.createElement('div');
   div_researchFields.appendChild(div_researchButtons);
  
   const searchButton = document.createElement("button");
    searchButton.id = 'searchButton';
    searchButton.className = 'button';
    searchButton.innerHTML = "Rechercher ";
    div_researchButtons.appendChild(searchButton);
    searchButton.style.display = 'inline-block';
     
    const cancelButton = document.createElement("button");
     cancelButton.id = 'cancelButton';
    cancelButton.className = 'button';
    cancelButton.innerHTML = "Annuler ";
    div_researchButtons.appendChild(cancelButton);
   cancelButton.style.display = 'inline-block';

    $("hr").before(div_researchFields);
   
    cancelButton.addEventListener('click',clearInputFields,resultField);
    searchButton.addEventListener('click',resultField);
    searchButton.addEventListener('click', searchBook);

    inputTitleField.addEventListener("change", (event) => {
        title = event.target.value;});
    inputAuthorField.addEventListener("change", (event) => {
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
    // displayBook();
}
  //Cancel button clear the input fields
function clearInputFields(){
   
    document.getElementById('researchFields');
    document.querySelector("#myBooks > div:nth-child(4)").remove(); 
    document.getElementById('resultField');
    document.querySelector("#resultDiv").remove();
    document.querySelector("#noBookFound").remove();
    //document.querySelector("#myResults").remove();
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

           
    var xhr = new  XMLHttpRequest();
    const apiK= "AIzaSyCe3Dpkc52IYszEgfE9uOq5OShSCvY_jDY";

   let apiRequest =  "https://www.googleapis.com/books/v1/volumes?q=:" + author + title + apiK;
  
    xhr.open('GET', apiRequest, true);
    xhr.send();

    xhr.addEventListener('onreadystatechange', function() {// property defines a function to be executed when the readyState changes
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {//Holds and return the status of the XMLHttpRequest
           
            let results = JSON.parse(xhr.responseText);//Returns the response data as a string

                if(results.bookFounds){
                
                for (var i=0; i<results.items.length; i++){       
                displayBook(results.items[i], false);    
                }

             } else {
                 noBookFound();
             }
            }                   
    }); 
   }

        
//Function to create resultblock
function displayBook(){

    let resultMap = new Map();
    if(results && resultMap.get(book.id) == null){
        resultMap.set(book.id, results);
    }

    const bookmarkIcon = "./logo/boomarks/bookmark-solid.svg";
    const reader = "./logo/boomarks/book-reader-solid.svg";
    const bin = "./logo/boomarks/bookmark-solid.svg";

    const resultsBookList = document.createElement("div");
    resultsBookList.setAttribute("class", "bookList");
    resultsBookList.appendChild(divBookList);

    const divBookList = resultsBookList.appendChild(document.createElement("div"));
    divBookList.setAttribute("class", "book");

    const bookId = document.createElement("p");
    bookId.setAttribute("class", "idbook");
    bookId.innerHTML = "ID: " + book.volumeInfo.industryIdentifiers[0].identifier;
    divContent.innerHTML = '<div data-bookid="' + book.id + '" id="' + book.id + '" src="./logo/boomarks/bookmark-solid.svg"></div>';
    resultsBookList.appendChild(bookId);

    const bookTitle = divBookList.appendChild(document.createElement("p"));
        bookTitle.setAttribute("class", "bookTitle");
        bookTitle.innerHTML = "Titre: " + book.volumeInfo.title;
        bookTitle.innerHTML ='<div '
        resultsBookList.appendChild(bookTitle);

    const bookAuthor = resultsBookList.appendChild(document.createElement("p"));
        bookAuthor.setAttribute("class", "authorBook");
        bookAuthor.textContent = "Auteur: " + book.volumeInfo.authors[0];
        resultsBookList.appendChild(bookAuthor);

   
    const icon = divBookList.appendChild(document.createElement("img"));
    icon.setAttribute("class", "icons");
    icon.setAttribute("src", icon);
    
    if(icon == bookmarkIcon) {
      //Add to my poch'list
      icon.addEventListener("click", (event) => {
        let inPochList = false;
       
        for(let i=0; i<sessionStorage.length; i++){
          if(book.volumeInfo.industryIdentifiers[0].identifier == sessionStorage.key(i)){
            inPochList = true;
          }
        };
       //Alert for double register
        if(inPochList) {
          alert("Vous ne pouvez ajouter deux fois le même livre");
        } else {
          const listToDisplay = displayBook(book, bin);
          const  listToDisplay_JSON = JSON.stringify(response);
          sessionStorage.setItem(book.volumeInfo.industryIdentifiers[0].identifier, resultBookList_JSON);
          resultsBookList.appendChild(listToDisplay);
        }
      });
    } else if(icon == bin) {
     
      icon.addEventListener("click", function() {

        sessionStorage.removeItem(bookId);
        document.getElementById("savedResult").remove();
              })
    }
   
    //Checking description
    const description = document.createElement("p");
    description.setAttribute("class", "bookDescription");
    description.setAttribute("maxlength", "200");
       if(response.volumeInfo.description == undefined) {
      description.textContent = "Description: Information manquante";
        } else {
      description.textContent = "Description: " + response.volumeInfo.description.substr(0, 200) + "...";
    }
    resultsBookList.appendChild(description);

    //Checking image

    const div_Image = document.createElement("div");
    div_Image.appendChild(image);
    resultsBookList.appendChild(div_Image);

    const image = resultsBookList.appendChild(document.createElement("img"));
    image.setAttribute("class", "image");
        if(response.volumeInfo.imageLinks == undefined) {
      image.setAttribute("src", "logo/unavailable.png");
    } else {
      image.setAttribute("src", response.volumeInfo.imageLinks.thumbnail);
    }
               divBookList.appendChild(resultsBookList);
    return resultsBookList;
}

//<i class="fas fa-book-reader"></i>*/

 window.addEventListener('DOMContentLoaded', init);
