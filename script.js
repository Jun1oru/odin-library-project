let myLibrary = [];

const buttonAdd = document.getElementById("button-add");
const addBookModal = document.getElementById("add-book-modal");
const submitButton = document.getElementById("submit-span");
const cancelButton = document.getElementById("cancel-span");

const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const inputRead = document.getElementById("isRead");
inputRead.value = "";

buttonAdd.addEventListener("click", (event) => {
    if(addBookModal.style.display !== "flex") {
        addBookModal.style.display = "flex";
        event.stopPropagation();
    }
});

inputRead.addEventListener("change", (event) => {
    inputRead.value = inputRead.value ? "" : true;
    event.stopPropagation();
})

submitButton.addEventListener("click", (event) => {
    if(inputTitle.checkValidity() && inputAuthor.checkValidity() &&
    inputPages.checkValidity()) {
        addBookToLibrary(inputTitle.value, inputAuthor.value,
                        inputPages.value, inputRead.value);
        resetModalInputs();
        addBookModal.style.display = "none";
        event.stopPropagation();
    }
});

cancelButton.addEventListener("click", (event) => {
    resetModalInputs();
    addBookModal.style.display = "none";
    event.stopPropagation();
});

window.addEventListener("click", (event) => {
    if(event.target === addBookModal) {
        resetModalInputs();
        addBookModal.style.display = "none";
        event.stopPropagation();
    }
});

function resetModalInputs() {
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
    inputRead.value = "";
    inputRead.checked = false;
}

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = Boolean(isRead);
    this.changeReadState = () => {
        this.isRead = !this.isRead;
    };
}

function addBookToLibrary(title, author, pages, isRead) {
    myLibrary.push(new Book(title, author, pages, isRead));

    // divBook
    const divBook = document.createElement('div');
    divBook.classList.add("book");
    divBook.dataset.index = myLibrary.indexOf(myLibrary[myLibrary.length-1]);

    // divBook elements
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const bookPages = document.createElement('p');
    const bookReadState = document.createElement('div');

    // bookTitle
    bookTitle.textContent = `Title: ${title}`;
    divBook.append(bookTitle);

    // bookAuthor
    bookAuthor.textContent = `Author: ${author}`;
    divBook.append(bookAuthor);

    // bookPages
    bookPages.textContent = `${pages} pages`;
    divBook.append(bookPages);

    // bookRead elements
    const bookReadLabel = document.createElement('label');
    const bookReadInput = document.createElement('input');

    bookReadLabel.setAttribute("for", `readState-${divBook.dataset.index}`);
    bookReadLabel.textContent = "Book read state: ";
    
    bookReadInput.setAttribute("type", "checkbox");
    bookReadInput.id = `readState-${divBook.dataset.index}`;
    bookReadInput.checked = isRead;
    bookReadInput.classList.add("readInputs");

    bookReadInput.addEventListener("change", (event) => {
        myLibrary[divBook.dataset.index].changeReadState();
        event.stopPropagation();
    });

    bookReadState.append(bookReadLabel);
    bookReadState.append(bookReadInput);

    // bookReadState
    bookReadState.id = "bookReadState-div";
    divBook.append(bookReadState);

    // bookDeleteSpan
    const bookDelete = document.createElement('span');
    bookDelete.textContent = "Delete";
    bookDelete.addEventListener("click", (event) => {
        myLibrary.splice(divBook.dataset.index, 1);
        divBook.remove();
        if(myLibrary.length != 0) {
            let remainingBooks = document.querySelectorAll(".book");
            for(let i = 0; i < remainingBooks.length; i++) {
                remainingBooks[i].dataset.index = i;
                const remainingLabel = remainingBooks[i].querySelector("div label");
                const remainingInput = remainingBooks[i].querySelector("div input");
                remainingLabel.setAttribute("for", `readState-${i}`);
                remainingInput.id = `readState-${i}`;
            }
        }
        event.stopPropagation();
    });

    divBook.append(bookDelete);

    buttonAdd.before(divBook);
}