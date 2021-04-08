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
  
   const div_researchButtons = document.createElement('div');
   div_researchFields.appendChild(div_researchButtons);
  
   const searchButton = document.createElement("button");
    searchButton.id = 'searchButton';
    searchButton.className = 'button';
    searchButton.innerHTML = "Rechercher ";
    div_researchButtons.appendChild(searchButton);
     
    const cancelButton = document.createElement("button");
     cancelButton.id = 'cancelButton';
    cancelButton.className = 'button';
    cancelButton.innerHTML = "Annuler ";
    div_researchButtons.appendChild(cancelButton);
   
    $("hr").before(div_researchFields);
   
    cancelButton.addEventListener('click',clearInputFields);
    searchButton.addEventListener('click',searchBook);
      }
  
  //Cancel button clear the input fields
  function clearInputFields(){
      document.getElementById('researchFields');
            document.querySelector("#myBooks > div:nth-child(4)").remove();  
           
  }


 async function getUrl(url) {

    const response = await fetch(url);
    if (response.ok) {
        return response.json();

    } else {
        console.error(response.status);
    }
}
  //PochListDiv to received the search results & favorit books
  function createPochListDiv(){

    const pochList = document.getElementById('content');
    const div_myPochList = document.createElement('div');  
    div_myPochList.id = 'pochListDiv';
    pochList.appendChild(div_myPochList); 
    }
   
function searchBook(){
   
    var title = document.getElementById('inputTitleField').value;
    var author = document.getElementById('inputAuthorField').value;
        
       //Alert message if the author and title fields are empty
      
    if (title == ''){
        createErrorInput('title', 'Merci de renseigner le champ.');
        return;
        }
    if (author == ''){
        createErrorInput('author', 'Merci de renseigner le champ.');
        return;
        } 
//createPochListDiv();

const  apiRequest = new XMLHttpRequest();
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
}


//Create results fields to display books

function displayBook(results, display) {

    const divBookList = document.createElement("div");
    divBookList.setAttribute("class", "bookList");

    if (results.items === undefined) {
        const noBookFound = document.createElement("p");
        noBookFound.setAttribute("class", "noBookFound");
        noBookFound.innerHTML = "Aucun livre n’a été trouvé";
        divBookList.appendChild(noBookFound);
    } else {

        results.items.map(item => {
            const resultsBookList = document.createElement("div");
            resultsBookList.setAttribute("class", "book");

            switch (display) {
                case "0":
                   const bookmark = document.createElement("i");
                    bookmark.setAttribute("class", "fas fa-bookmark")
                    break;
                case "1":
                    bookmark = document.createElement("i");
                    bookmark.setAttribute("class", "fas fa-dumpster");
                    break;

                default:
                    console.log("error affichage icon");
                    break;
            }

            resultsBookList.appendChild(bookmark); 

           const bookId = document.createElement("p");
            bookId.setAttribute("class", "idbook");
            bookId.innerHTML = "ID: " + item.id;
            resultsBookList.appendChild(bookId);


            const titleField = document.createElement("p");
            titleField.setAttribute("class", "titlebook");
            titleField.innerHTML = "Titre: " + item.volumeInfo && item.volumeInfo.title ? item.volumeInfo.title : '';
            resultsBookList.appendChild(titleField);

            const authorField = document.createElement("p");
            authorField.setAttribute("class", "authorbook");
            authorField.innerHTML = "Auteur: " + item["volumeInfo"].author;
            resultsBookList.appendChild(newAuthorField);

            //Checking description
            const description = document.createElement("p");
            description.setAttribute("class", "bookDescription");
            
            if (item["volumeInfo"].description != undefined) {
                description.innerHTML =  item["volumeInfo"].description.substr(0, 200);
            } else {
                description.innerHTML = "Information manquante";
            }

            resultsBookList.appendChild(description);

            // Checking image
            if (item["volumeInfo"].imageLinks != undefined) {
                const image = document.createElement("img");
                image.setAttribute("class", "image");
                image.setAttribute("src", item["volumeInfo"].imageLinks.smallThumbnail);

            } else {

                const image = document.createElement("img");
                image.setAttribute("class", "image");
                image.setAttribute("src", "logo/unavailable.png");

            }
            const div_Image = document.createElement("div");
            div_Image.appendChild(image);
            resultsBookList.appendChild(div_Image);

            divBookList.appendChild(resultsBookList);
        });
    }
    return divBookList; }

//<i class="fas fa-book-reader"></i>



 window.addEventListener('DOMContentLoaded', init);