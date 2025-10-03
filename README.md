# Qubiz Assignment

This project contains a file explorer application with an Angular frontend and Node.js/Express backend.

## Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

## Getting Started

### Backend (Server)

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
   The server will start with nodemon for automatic reloading during development.

### Frontend (Client)

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   
   The Angular development server will start and the application will be available at `http://localhost:4200/`.

## Project Structure

- `server/` - Node.js/Express backend application
- `client/` - Angular frontend application

## Development

- Backend runs on development mode with hot reload using nodemon
- Frontend runs on Angular development server with live reload
- Both applications should be running simultaneously for full functionality
