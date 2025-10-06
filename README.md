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

## How to use the app?

1. **Enter a directory path**: In the File Explorer input field, type the full path to any directory on your computer (e.g., `C:\Users\YourName\Documents`)

2. **Search for files**: Click the "Search" button to explore the contents of the specified directory

3. **Navigate directories**: 
   - Click on any folder to navigate into it
   - Use the breadcrumb navigation to go back to parent directories
   - The current path is always displayed at the top

4. **View file details**: Click on any file to see detailed information including:
   - File name and extension
   - File size
   - File type
   - Last modified date

5. **Explore your system**: The app allows you to browse through your entire file system, making it easy to find your files
