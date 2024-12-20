const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Инициализация приложения
const app = express();
app.use(bodyParser.json());

// Простые данные вместо базы данных
let readers = [];
let books = [];
let authors = [];
let genres = [];
let issues = [];

// Swagger настройка
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Library Management System API',
      version: '1.0.0',
      description: 'API для управления библиотечными данными',
    },
  },
  apis: ['./index.js'], // путь к файлу с аннотациями Swagger
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Используем Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// CRUD для читателей
/**
 * @swagger
 * components:
 *   schemas:
 *     Reader:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         registrationDate:
 *           type: string
 *           format: date-time
 *       required:
 *         - name
 *         - email
 *         - phone
 * 
 * /readers:
 *   post:
 *     summary: Создание нового читателя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reader'
 *     responses:
 *       200:
 *         description: Читатель создан
 */
app.post('/readers', (req, res) => {
  const reader = { ...req.body, id: readers.length + 1 };
  readers.push(reader);
  res.send(reader);
});

/**
 * @swagger
 * /readers:
 *   get:
 *     summary: Получить список всех читателей
 *     responses:
 *       200:
 *         description: Список читателей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reader'
 */
app.get('/readers', (req, res) => {
  res.send(readers);
});

/**
 * @swagger
 * /readers/{id}:
 *   put:
 *     summary: Обновить информацию о читателе
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID читателя
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reader'
 *     responses:
 *       200:
 *         description: Читатель обновлен
 */
app.put('/readers/:id', (req, res) => {
  const reader = readers.find(r => r.id == req.params.id);
  if (!reader) return res.status(404).send({ message: 'Reader not found' });
  Object.assign(reader, req.body);
  res.send(reader);
});

/**
 * @swagger
 * /readers/{id}:
 *   delete:
 *     summary: Удалить читателя
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID читателя
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Читатель удален
 */
app.delete('/readers/:id', (req, res) => {
  readers = readers.filter(r => r.id != req.params.id);
  res.send({ message: 'Reader Deleted' });
});

// CRUD для книг
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         author:
 *           type: string
 *         genre:
 *           type: string
 *         year:
 *           type: integer
 *         isAvailable:
 *           type: boolean
 *       required:
 *         - title
 *         - author
 *         - genre
 * 
 * /books:
 *   post:
 *     summary: Создание новой книги
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Книга создана
 */
app.post('/books', (req, res) => {
  const book = { ...req.body, id: books.length + 1, isAvailable: true };
  books.push(book);
  res.send(book);
});

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Получить список всех книг
 *     responses:
 *       200:
 *         description: Список книг
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
app.get('/books', (req, res) => {
  res.send(books);
});

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Обновить информацию о книге
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID книги
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Книга обновлена
 */
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).send({ message: 'Book not found' });
  Object.assign(book, req.body);
  res.send(book);
});

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Удалить книгу
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID книги
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Книга удалена
 */
app.delete('/books/:id', (req, res) => {
  books = books.filter(b => b.id != req.params.id);
  res.send({ message: 'Book deleted' });
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Library management system is running on port 3000');
});
