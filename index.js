const axios = require('axios');

// Base URL of the book API
const BASE_URL = 'https://example.com/api'; // Replace with your API URL

// -------------------- General Users Tasks --------------------

// Task 1: Get all books
async function getAllBooks() {
    try {
        const response = await axios.get(`${BASE_URL}/books`);
        console.log('All Books:', response.data);
    } catch (error) {
        console.error('Error fetching all books:', error.message);
    }
}

// Task 2: Get book by ISBN
async function getBookByISBN(isbn) {
    try {
        const response = await axios.get(`${BASE_URL}/books/isbn/${isbn}`);
        console.log(`Book with ISBN ${isbn}:`, response.data);
    } catch (error) {
        console.error('Error fetching book by ISBN:', error.message);
    }
}

// Task 3: Get books by Author
async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(`${BASE_URL}/books/author/${author}`);
        console.log(`Books by ${author}:`, response.data);
    } catch (error) {
        console.error('Error fetching books by author:', error.message);
    }
}

// Task 4: Get books by Title
async function getBooksByTitle(title) {
    try {
        const response = await axios.get(`${BASE_URL}/books/title/${title}`);
        console.log(`Books with title "${title}":`, response.data);
    } catch (error) {
        console.error('Error fetching books by title:', error.message);
    }
}

// Task 5: Get book review
async function getBookReview(isbn) {
    try {
        const response = await axios.get(`${BASE_URL}/books/review/${isbn}`);
        console.log(`Reviews for ISBN ${isbn}:`, response.data);
    } catch (error) {
        console.error('Error fetching book review:', error.message);
    }
}

// -------------------- Registered Users Tasks --------------------

// Task 6: Register New User
async function registerUser(username, password) {
    try {
        const response = await axios.post(`${BASE_URL}/register`, { username, password });
        console.log('User registered:', response.data);
    } catch (error) {
        console.error('Error registering user:', error.message);
    }
}

// Task 7: Login as Registered User
async function loginUser(username, password) {
    try {
        const response = await axios.post(`${BASE_URL}/login`, { username, password });
        console.log('Login successful:', response.data);
        return response.data.token; // assume API returns token
    } catch (error) {
        console.error('Error logging in:', error.message);
    }
}

// Task 8: Add/Modify Book Review
async function addOrModifyReview(isbn, review, token) {
    try {
        const response = await axios.put(`${BASE_URL}/books/review/${isbn}`, { review }, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(`Review added/modified for ISBN ${isbn}:`, response.data);
    } catch (error) {
        console.error('Error adding/modifying review:', error.message);
    }
}

// Task 9: Delete Book Review
async function deleteReview(isbn, token) {
    try {
        const response = await axios.delete(`${BASE_URL}/books/review/${isbn}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(`Review deleted for ISBN ${isbn}:`, response.data);
    } catch (error) {
        console.error('Error deleting review:', error.message);
    }
}

// -------------------- Node.js Methods with Async/Promises --------------------

// Task 10: Get all books using async callback
function getAllBooksCallback(callback) {
    axios.get(`${BASE_URL}/books`)
        .then(response => callback(null, response.data))
        .catch(err => callback(err));
}

// Task 11: Search by ISBN using Promises
function searchByISBN(isbn) {
    return axios.get(`${BASE_URL}/books/isbn/${isbn}`);
}

// Task 12: Search by Author using Promises
function searchByAuthor(author) {
    return axios.get(`${BASE_URL}/books/author/${author}`);
}

// Task 13: Search by Title using Promises
function searchByTitle(title) {
    return axios.get(`${BASE_URL}/books/title/${title}`);
}

// -------------------- Demo Execution --------------------
async function demo() {
    await getAllBooks();
    await getBookByISBN('12345');
    await getBooksByAuthor('J.K. Rowling');
    await getBooksByTitle('Harry Potter');
    await getBookReview('12345');

    await registerUser('testuser', 'password123');
    const token = await loginUser('testuser', 'password123');

    if (token) {
        await addOrModifyReview('12345', 'This book is amazing!', token);
        await deleteReview('12345', token);
    }

    // Async callback demo
    getAllBooksCallback((err, data) => {
        if (err) console.error(err);
        else console.log('Async Callback Books:', data);
    });

    // Promises demo
    searchByISBN('12345')
        .then(res => console.log('Promise ISBN:', res.data))
        .catch(err => console.error(err));

    searchByAuthor('J.K. Rowling')
        .then(res => console.log('Promise Author:', res.data))
        .catch(err => console.error(err));

    searchByTitle('Harry Potter')
        .then(res => console.log('Promise Title:', res.data))
        .catch(err => console.error(err));
}

demo();
