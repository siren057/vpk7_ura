const express = require('express');
const bodyParser = require('body-parser');

// Инициализация приложения
const app = express();
app.use(bodyParser.json());

// Простые данные вместо базы данных
let readers = [];
let books = [];
let authors = [];
let genres = [];
let issues = [];

// CRUD для читателей
app.post('/readers', (req, res) => {
  const reader = { ...req.body, id: readers.length + 1 };
  readers.push(reader);
  res.send(reader);
});

app.get('/readers', (req, res) => {
  res.send(readers);
});

app.put('/readers/:id', (req, res) => {
  const reader = readers.find(r => r.id == req.params.id);
  if (!reader) return res.status(404).send({ message: 'Reader not found' });
  Object.assign(reader, req.body);
  res.send(reader);
});

app.delete('/readers/:id', (req, res) => {
  readers = readers.filter(r => r.id != req.params.id);
  res.send({ message: 'Reader deleted' });
});

// CRUD для книг
app.post('/books', (req, res) => {
  const book = { ...req.body, id: books.length + 1, isAvailable: true };
  books.push(book);
  res.send(book);
});

app.get('/books', (req, res) => {
  res.send(books);
});

app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).send({ message: 'Book not found' });
  Object.assign(book, req.body);
  res.send(book);
});

app.delete('/books/:id', (req, res) => {
  books = books.filter(b => b.id != req.params.id);
  res.send({ message: 'Book deleted' });
});

// CRUD для авторов
app.post('/authors', (req, res) => {
  const author = { ...req.body, id: authors.length + 1 };
  authors.push(author);
  res.send(author);
});

app.get('/authors', (req, res) => {
  res.send(authors);
});

app.put('/authors/:id', (req, res) => {
  const author = authors.find(a => a.id == req.params.id);
  if (!author) return res.status(404).send({ message: 'Author not found' });
  Object.assign(author, req.body);
  res.send(author);
});

app.delete('/authors/:id', (req, res) => {
  authors = authors.filter(a => a.id != req.params.id);
  res.send({ message: 'Author deleted' });
});

// CRUD для жанров
app.post('/genres', (req, res) => {
  const genre = { ...req.body, id: genres.length + 1 };
  genres.push(genre);
  res.send(genre);
});

app.get('/genres', (req, res) => {
  res.send(genres);
});

app.put('/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id == req.params.id);
  if (!genre) return res.status(404).send({ message: 'Genre not found' });
  Object.assign(genre, req.body);
  res.send(genre);
});

app.delete('/genres/:id', (req, res) => {
  genres = genres.filter(g => g.id != req.params.id);
  res.send({ message: 'Genre deleted' });
});

// Оформление выдачи книг
app.post('/issues', (req, res) => {
  const book = books.find(b => b.id == req.body.bookId);
  if (!book || !book.isAvailable) {
    return res.status(400).send({ message: 'Book is not available' });
  }

  book.isAvailable = false;
  const issue = { ...req.body, id: issues.length + 1, issueDate: new Date() };
  issues.push(issue);
  res.send(issue);
});

// Возврат книги
app.post('/returns/:id', (req, res) => {
  const issue = issues.find(i => i.id == req.params.id);
  if (!issue) return res.status(404).send({ message: 'Issue not found' });

  const book = books.find(b => b.id == issue.bookId);
  book.isAvailable = true;
  issue.returnDate = new Date();

  res.send(issue);
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Library management system is running on port 3000');
});
