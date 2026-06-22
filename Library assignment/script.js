class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.available = true;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    borrowBook(title) {
        const book = this.books.find(
            b => b.title.toLowerCase() === title.toLowerCase()
        );

        if (book && book.available) {
            book.available = false;
            return "Book borrowed successfully.";
        }

        return "Book not available.";
    }

    returnBook(title) {
        const book = this.books.find(
            b => b.title.toLowerCase() === title.toLowerCase()
        );

        if (book) {
            book.available = true;
            return "Book returned successfully.";
        }

        return "Book not found.";
    }

    listAvailableBooks() {
        return this.books.filter(book => book.available);
    }
}

const library = new Library();

function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;

    if (!title || !author || !year) {
        alert("Please fill all fields.");
        return;
    }

    library.addBook(new Book(title, author, year));

    alert("Book added successfully!");

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("year").value = "";

    displayBooks();
}

function borrowBook() {
    const title = document.getElementById("bookTitle").value;
    alert(library.borrowBook(title));
    displayBooks();
}

function returnBook() {
    const title = document.getElementById("bookTitle").value;
    alert(library.returnBook(title));
    displayBooks();
}

function displayBooks() {
    const bookList = document.getElementById("bookList");
    const books = library.listAvailableBooks();

    bookList.innerHTML = "";

    if (books.length === 0) {
        bookList.innerHTML = "<p>No available books.</p>";
        return;
    }

    books.forEach(book => {
        bookList.innerHTML += `
            <div class="book">
                <strong>Title:</strong> ${book.title}<br>
                <strong>Author:</strong> ${book.author}<br>
                <strong>Year:</strong> ${book.year}
            </div>
        `;
    });
}