let myLibrary = [];
let cacheLibrary = localStorage;
let id = 0;
let cacheAvailable = 1;

function Book(id,title,author,pages,read) {
this.id = id;
this.title = title;
this.author = author;
this.pages = pages;
this.read = read;
}

function addBooktoLibrary(e){
  //Declare newForm data
let bookTitle = newForm.elements[0].value;
let bookAuthor = newForm.elements[1].value;
let bookPages = newForm.elements[2].value;
let bookRead = newForm.elements[3].checked;

//push book to array (backend)
myLibrary.push(new Book(id,bookTitle,bookAuthor,bookPages,bookRead));

//Add book to DOM (frontend)
const newBook = document.createElement('tr');
const newID = document.createElement('td');
newID.textContent = id;
newBook.appendChild(newID);
const newTitle = document.createElement('td');
newTitle.textContent=bookTitle;
newBook.appendChild(newTitle);
const newAuthor = document.createElement('td');
newAuthor.textContent=bookAuthor;
newBook.appendChild(newAuthor);
const newPages = document.createElement('td');
newPages.textContent=bookPages;
newBook.appendChild(newPages);
const newRead = document.createElement('td');
const toggle= document.createElement('button');
toggle.classList.add('remove');
if(bookRead == true){
toggle.classList.add('toggle');
}
toggle.textContent = bookRead;
newRead.appendChild(toggle);
newBook.appendChild(newRead);

const remButton = document.createElement('td');
const button = document.createElement('button');
button.id=id;
button.classList.add('remove');
button.textContent="DEL";

//Listen for click, remove from DOM and array.
button.addEventListener('click',()=>{
  let index = myLibrary.map(book => book.id).indexOf(Number(button.id));
  myLibrary.splice(index,1);
  newBook.remove();
  if(cacheAvailable==1){
    cacheLibrary.setItem('books',JSON.stringify(myLibrary));
    cacheLibrary.setItem('id',`${id}`);
    }
});

//listen for click and toggle read or not
toggle.addEventListener('click', () =>{
  let index = myLibrary.map(book => book.id).indexOf(Number(button.id));
  myLibrary[index].read = !myLibrary[index].read;
  if (myLibrary[index].read == true){
    toggle.classList.add('toggle');
  } else {toggle.classList.remove('toggle')}
  toggle.textContent = myLibrary[index].read;
  if(cacheAvailable==1){
    cacheLibrary.setItem('books',JSON.stringify(myLibrary));
    cacheLibrary.setItem('id',`${id}`);
    }
})

remButton.appendChild(button);
newBook.appendChild(remButton);
library.appendChild(newBook);

if(cacheAvailable==1){
  cacheLibrary.setItem('books',JSON.stringify(myLibrary));
  cacheLibrary.setItem('id',`${id}`);
  }

//Reset form and prevent from going to new page
id++;
newForm.reset();
e.preventDefault();
}


function bookForm(e) {
  container.classList.add('visible');
  container.appendChild(newForm);
}

const container = document.querySelector('.container');
const linebreak = document.createElement("br");

//create new form
const newForm = document.createElement('form');
newForm.setAttribute('class','popup');
newForm.setAttribute('method','post');
newForm.setAttribute('action','/submit');

const header = document.createElement('h2');
header.textContent = "Add a Book";
newForm.appendChild(header);
//create input elements for title,author, pages, read
const title = document.createElement('input');
title.setAttribute('type','text');
title.setAttribute('name','title');
title.setAttribute('placeholder','title');
title.classList.add('formChild');

const author = document.createElement('input');
author.setAttribute('type','text');
author.setAttribute('name','author');
author.setAttribute('placeholder','author');
author.classList.add('formChild');

const pages = document.createElement('input');
pages.setAttribute('type','number');
pages.setAttribute('name','pages');
pages.setAttribute('placeholder','pages');
pages.classList.add('formChild');

const read = document.createElement('input');
const readText = document.createElement('span');
readText.textContent = "Read(Y/N)"
read.setAttribute('type','checkbox');
read.setAttribute('name','read');

const submit = document.createElement('input');
submit.setAttribute('type','submit');
submit.setAttribute('value','Add');
submit.classList.add('submit');

newForm.appendChild(title);
newForm.appendChild(author);
newForm.appendChild(pages);
newForm.appendChild(linebreak);
newForm.appendChild(readText);
newForm.appendChild(read);
newForm.appendChild(linebreak);
newForm.appendChild(linebreak);
newForm.appendChild(submit);

newForm.addEventListener('submit', addBooktoLibrary);

const addBook = document.querySelector('.addbook');
const library = document.querySelector('.library');

addBook.addEventListener('click',bookForm);

document.onclick = function(e) {
  if(e.target == container) {
    container.classList.remove('visible')
  }
}

const loadAllBooks = () => {
  myLibrary.forEach(book => {
    const newBook = document.createElement('tr');
    const newID = document.createElement('td');
    newID.textContent = book.id;
    newBook.appendChild(newID);
    const newTitle = document.createElement('td');
    newTitle.textContent=book.title;
    newBook.appendChild(newTitle);
    const newAuthor = document.createElement('td');
    newAuthor.textContent=book.author;
    newBook.appendChild(newAuthor);
    const newPages = document.createElement('td');
    newPages.textContent=book.pages;
    newBook.appendChild(newPages);
    const newRead = document.createElement('td');
    const toggle= document.createElement('button');
    toggle.classList.add('remove');
    if(book.read == true){
    toggle.classList.add('toggle');
    }
    toggle.textContent = book.read;
    newRead.appendChild(toggle);
    newBook.appendChild(newRead);

    const remButton = document.createElement('td');
    const button = document.createElement('button');
    button.id=book.id;//attach id to looped book to button id, they must match
    button.classList.add('remove');
    button.textContent="DEL";

    //Listen for click, remove from DOM and array.
    button.addEventListener('click',()=>{
      let index = myLibrary.map(book => book.id).indexOf(Number(button.id));
      myLibrary.splice(index,1);
      newBook.remove();
      if(cacheAvailable==1){
        cacheLibrary.setItem('books',JSON.stringify(myLibrary));
        cacheLibrary.setItem('id',`${id}`);
        }
    });

    //listen for click and toggle read or not
    toggle.addEventListener('click', () =>{
      let index = myLibrary.map(book => book.id).indexOf(Number(button.id));
      myLibrary[index].read = !myLibrary[index].read;
      if (myLibrary[index].read == true){
        toggle.classList.add('toggle');
      } else {toggle.classList.remove('toggle')}
      toggle.textContent = myLibrary[index].read;
      if(cacheAvailable==1){
        cacheLibrary.setItem('books',JSON.stringify(myLibrary));
        cacheLibrary.setItem('id',`${id}`);
        }
    })

    remButton.appendChild(button);
    newBook.appendChild(remButton);
    library.appendChild(newBook);
  })
}

const clearAll = document.querySelector('.clear');
clearAll.addEventListener('click',()=>{
  localStorage.clear();
  myLibrary = [];
  id = 0;
  window.location.reload();
})

function lsTest(){
  var test = 'test';
  try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
  } catch(e) {
      return false;
  }
}

if(lsTest() === true){
  if(localStorage.length!= 0){
  id = Number(localStorage.getItem('id')) + 1;//get next ID to update for library
  myLibrary = JSON.parse(localStorage.getItem('books'));
  loadAllBooks();
  } else {
    myLibrary = [];
    id = 0;
  }
}else{
  cacheAvailable = 0;
}
