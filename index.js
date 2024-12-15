// Импорт необходимых модулей
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// Инициализация приложения
const app = express();
app.use(bodyParser.json());

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://localhost:27017/library', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Схемы и модели
const ReaderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  registrationDate: { type: Date, default: Date.now }
});

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  year: Number,
  isAvailable: { type: Boolean, default: true }
});

const AuthorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  bio: String
});

const GenreSchema = new mongoose.Schema({
  name: String
});

const IssueSchema = new mongoose.Schema({
  readerId: mongoose.Schema.Types.ObjectId,
  bookId: mongoose.Schema.Types.ObjectId,
  issueDate: { type: Date, default: Date.now },
  returnDate: Date
});

const Reader = mongoose.model('Reader', ReaderSchema);
const Book = mongoose.model('Book', BookSchema);
const Author = mongoose.model('Author', AuthorSchema);
const Genre = mongoose.model('Genre', GenreSchema);
const Issue = mongoose.model('Issue', IssueSchema);

// CRUD для читателей
app.post('/readers', async (req, res) => {
  const reader = new Reader(req.body);
  await reader.save();
  res.send(reader);
});

app.get('/readers', async (req, res) => {
  const readers = await Reader.find();
  res.send(readers);
});

app.put('/readers/:id', async (req, res) => {
  const reader = await Reader.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(reader);
});

app.delete('/readers/:id', async (req, res) => {
  await Reader.findByIdAndDelete(req.params.id);
  res.send({ message: 'Reader deleted' });
});

// CRUD для книг
app.post('/books', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.send(book);
});

app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

app.put('/books/:id', async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(book);
});

app.delete('/books/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.send({ message: 'Book deleted' });
});

// CRUD для авторов
app.post('/authors', async (req, res) => {
  const author = new Author(req.body);
  await author.save();
  res.send(author);
});

app.get('/authors', async (req, res) => {
  const authors = await Author.find();
  res.send(authors);
});

app.put('/authors/:id', async (req, res) => {
  const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(author);
});

app.delete('/authors/:id', async (req, res) => {
  await Author.findByIdAndDelete(req.params.id);
  res.send({ message: 'Author deleted' });
});

// CRUD для жанров
app.post('/genres', async (req, res) => {
  const genre = new Genre(req.body);
  await genre.save();
  res.send(genre);
});

app.get('/genres', async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

app.put('/genres/:id', async (req, res) => {
  const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(genre);
});

app.delete('/genres/:id', async (req, res) => {
  await Genre.findByIdAndDelete(req.params.id);
  res.send({ message: 'Genre deleted' });
});

// Оформление выдачи книг
app.post('/issues', async (req, res) => {
  const book = await Book.findById(req.body.bookId);

  if (!book.isAvailable) {
    return res.status(400).send({ message: 'Book is not available' });
  }

  book.isAvailable = false;
  await book.save();

  const issue = new Issue(req.body);
  await issue.save();
  res.send(issue);
});

// Возврат книги
app.post('/returns/:id', async (req, res) => {
  const issue = await Issue.findById(req.params.id);
  const book = await Book.findById(issue.bookId);

  book.isAvailable = true;
  await book.save();

  issue.returnDate = new Date();
  await issue.save();

  res.send(issue);
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Library management system is running on port 3000');
});
