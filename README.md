# Phonebook app

This is the backend component of the Phonebook application, part of the Open
Full Stack course. It provides a RESTful API for managing contacts in a phonebook. The backend is built using Node.js and Express.

## Deployed version

The deployed version of this app is available at [Vercel](https://openfullstack-deploy-test-morefews-projects.vercel.app/).


## Prerequisites

Before running, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Morefew/openfullstack-part3.git
   cd openfullstack-part3/api/backend
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

- **GET /api/persons**: Fetch all contacts.
- **GET /api/persons/:id**: Fetch a single contact by ID.
- **POST /api/persons**: Create a new contact.
- **PUT /api/persons:id**: Update an existing contact by ID.
- **DELETE /api/persons:id**: Delete a contact by ID.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Part of the Open Full Stack course.
- Built with Node.js, Express, React, Axios and Morgan.

---