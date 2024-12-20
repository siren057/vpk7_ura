# Library Management System API

This is a simple RESTful API for managing library data, including readers and books. The API uses Express.js and Swagger for documentation.

## Features

- Manage readers (CRUD operations)
- Manage books (CRUD operations)
- Fully documented API using Swagger

## Prerequisites

Before running this application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd library-management-api
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the server:
   ```bash
   node index.js
   ```

2. The API will be available at:
   ```
   http://localhost:3000
   ```

3. Swagger documentation is available at:
   ```
   http://localhost:3000/api-docs
   ```

## Endpoints

### Readers

#### Create a Reader
- **POST** `/readers`
- Request body:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890"
  }
  ```

#### Get All Readers
- **GET** `/readers`

#### Update a Reader
- **PUT** `/readers/{id}`
- Request body:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "phone": "987-654-3210"
  }
  ```

#### Delete a Reader
- **DELETE** `/readers/{id}`

### Books

#### Create a Book
- **POST** `/books`
- Request body:
  ```json
  {
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian",
    "year": 1949
  }
  ```

#### Get All Books
- **GET** `/books`

#### Update a Book
- **PUT** `/books/{id}`
- Request body:
  ```json
  {
    "title": "Animal Farm",
    "author": "George Orwell",
    "genre": "Satire",
    "year": 1945
  }
  ```

#### Delete a Book
- **DELETE** `/books/{id}`

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **Swagger**: API documentation

## How to Contribute

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
