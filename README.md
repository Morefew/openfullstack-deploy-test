# Phonebook app

This is the backend component of the Phonebook application, part of the Open
Full Stack course. It provides a RESTful API for managing contacts in a phonebook. The backend is built using Node.js and Express.

## Deployed version

The deployed version of this app is available at [https://phonebook-backend.vercel.app/](https://phonebook-backend.vercel.app/).

## Prerequisites

Before running, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Morefew/openfullstack-part3.git
   cd openfullstack-part3/phonebook/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root of the `backend` directory and add the following:


4. Start the server:

   ```bash
   npm run server
   ```

   The server will start on the port specified in the `.env` file (default: `3001`).

## API Endpoints

### Contacts

- **GET /api/contacts**: Fetch all contacts.
- **GET /api/contacts/:id**: Fetch a single contact by ID.
- **POST /api/contacts**: Create a new contact.
- **PUT /api/contacts/:id**: Update an existing contact by ID.
- **DELETE /api/contacts/:id**: Delete a contact by ID.

### Example Requests

#### Fetch All Contacts

```bash
curl -X GET http://localhost:3001/api/contacts
```

#### Create a New Contact

```bash
curl -X POST http://localhost:3001/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "phone": "123-456-7890"}'
```

#### Update a Contact

```bash
curl -X PUT http://localhost:3001/api/contacts/12345 \
  -H "Content-Type: application/json" \
  -d '{"phone": "987-654-3210"}'
```

#### Delete a Contact

```bash
curl -X DELETE http://localhost:3001/api/contacts/12345
```

## Testing

To run tests, use the following command:

```bash
npm test
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Part of the Open Full Stack course.
- Built with Node.js, Express, Axios and Morgan.

---