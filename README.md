
# Roxiler Assignment

This project is a MERN stack-based application designed to manage product transaction data. It fetches data from a third-party API, processes it, and stores it in a MongoDB database. The frontend allows users to interact with this data through transactions tables, statistics, and visualizations such as bar and pie charts.
## Demo Video

You can view the demo of the project in action by clicking on the image below:

[![Watch the video](https://drive.google.com/uc?export=view&id=1ojjtC9CDadSO5mbwjUYo0mGH1eG_eg9g)](https://drive.google.com/file/d/1vU2dMVRMDEVzdvRCDMNnN8hfGMPI3e-W/view?usp=sharing)



## Table of Contents

1. [Backend Setup](#backend-setup)
2. [Frontend Setup](#frontend-setup)
3. [API Endpoints](#api-endpoints)
4. [Project Structure](#project-structure)
5. [Technologies Used](#technologies-used)
6. [License](#license)

## Backend Setup

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use MongoDB Atlas)

### Steps to Set Up Backend

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Aditya9103/Roxiler_Assignment.git
   cd Roxiler_Assignment/server
   ```

2. **Install backend dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```
   MONGO_URI=<Your MongoDB URI>
   PORT=5000
   ```

4. **Run the backend server**:
   To start the backend server:
   ```bash
   npm run dev
   ```

   This will start the server on `http://localhost:5000`.

## Frontend Setup

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (LTS version recommended)

### Steps to Set Up Frontend

1. **Navigate to the client directory**:
   ```bash
   cd Roxiler_Assignment/client
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Run the frontend server**:
   ```bash
   npm start
   ```

4. **Access the application**:
   Open a browser and navigate to `http://localhost:3000` to view the frontend.

## API Endpoints

### `/api/initialize-database`
- **Method**: `GET`
- **Description**: Fetches product transaction data from a third-party API and initializes the database with seed data.

### `/api/transactions`
- **Method**: `GET`
- **Description**: Lists all product transactions. Supports pagination and search by product title, description, or price.
- **Query Parameters**:
  - `month` (required): Month (January to December)
  - `page` (optional): Page number for pagination (default: 1)
  - `perPage` (optional): Number of items per page (default: 10)
  - `search` (optional): Search text to match against product title, description, or price

### `/api/statistics`
- **Method**: `GET`
- **Description**: Fetches statistics for a selected month:
  - Total sale amount
  - Total number of sold items
  - Total number of not sold items
- **Query Parameters**:
  - `month` (required): Month (January to December)

### `/api/bar-chart`
- **Method**: `GET`
- **Description**: Returns price range distribution for the selected month.
- **Query Parameters**:
  - `month` (required): Month (January to December)

### `/api/pie-chart`
- **Method**: `GET`
- **Description**: Returns unique product categories and the number of items in each category for the selected month.
- **Query Parameters**:
  - `month` (required): Month (January to December)

### `/api/dashboard`
- **Method**: `GET`
- **Description**: Fetches data from all the previous APIs, combines them, and returns a single JSON response.
- **Query Parameters**:
  - `month` (required): Month (January to December)

## Project Structure

```
Roxiler_Assignment/
├── client/                 # Frontend application
│   ├── src/
│   ├── public/
│   ├── package.json        # Frontend dependencies
├── server/                 # Backend application
│   ├── controllers/        # API route controllers
│   ├── models/             # MongoDB models
│   ├── routes/             # Express routes
│   ├── .env                # Environment variables
│   ├── package.json        # Backend dependencies
├── README.md               # Project documentation
```

## Technologies Used

- **Frontend**:
  - React.js
  - Chart.js
  - Axios
  - Ant Design
  - React Router

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (Mongoose ORM)
  - Axios

- **Development Tools**:
  - Nodemon (for auto-reloading in development)


