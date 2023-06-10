let myLibrary = [];
function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead ? "Read" : "Not Read";
}

function addBookToLibrary() {
    let title = document.querySelector("#title").value;
	let author = document.querySelector("#author").value;
	let pages = document.querySelector("#pages").value;
	let hasRead = document.querySelector("#read-status").checked;
    let b = new Book(title, author, pages, hasRead);
	myLibrary.push(b);

    let parent = document.querySelector(".books");
	parent.innerHTML = "";
	displayBooks();
}

function toggleRead(id) {
    let hasRead = document.querySelector(`#r${id}`);
    if(hasRead.innerHTML === "Not Read") {
        hasRead.innerHTML = "Read";
        hasRead.style.backgroundColor = "#51c251";
        myLibrary[id].hasRead = "Read";
    }
    else {
        hasRead.innerHTML = "Not Read";
        hasRead.style.backgroundColor = "orange";
        myLibrary[id].hasRead = "Not Read";
    }
}

function delBook(id) {
    let parent = document.querySelector(".books");
    myLibrary.splice(id, 1);
    parent.innerHTML = "";
    displayBooks();
}

function displayBooks() {
    let parent = document.querySelector(".books");
    let temp = "";
    let id = 0;
    myLibrary.forEach((book) => {
        temp = `
        <div class="book">
            <p><span>Title:</span> ${book.title}</p>
            <p><span>Author:</span> ${book.author}</p>
            <p><span>Pages:</span> ${book.pages}</p>
            <div class="action">
                <button class="read" id="r${id}" onclick=toggleRead(${id})>${book.hasRead}</button>
                <button class="del" onclick=delBook(${id})>Delete</button>
            </div>
        </div>
        `;
        parent.innerHTML += temp;
        
        let hasRead = document.querySelector(`#r${id}`);
        if(hasRead.innerHTML === "Read")
            hasRead.style.backgroundColor = "#51c251";
        else
            hasRead.style.backgroundColor = "orange";
        id++;
    });
}

document.querySelector("#add").addEventListener("click", () => {
	let inputBox = document.querySelector(".input-box");
	if (inputBox.style.display === "block")
        inputBox.style.display = "none";
	else
        inputBox.style.display = "block";
    console.log(myLibrary);
});

document.querySelector("#sub").addEventListener("click", (e) => {
	e.preventDefault();
	addBookToLibrary();
	let form = document.getElementsByName("book-form")[0];
	form.reset();
});

window.onload = (e) => {
    displayBooks();
}