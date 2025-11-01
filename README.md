# Jenkins Pipeline Project

A full-stack application with a React frontend and Node.js backend, showcasing CI/CD implementation using Jenkins pipeline.

## Project Overview

This project demonstrates a modern web application with:
- **Frontend**: React application with a modern UI using Tailwind CSS
- **Backend**: Express.js REST API
- **CI/CD**: Jenkins pipeline configuration for automated testing and deployment

## Project Structure

```
jenkins_pipeline/
├── frontend/               # React application
│   ├── src/               # Source files
│   ├── public/            # Static files
│   └── package.json       # Frontend dependencies
├── backend/               # Express.js server
│   ├── server.js         # Main server file
│   ├── test/             # Backend tests
│   └── package.json      # Backend dependencies
└── Jenkinsfile           # Jenkins pipeline configuration
```

## Getting Started

### Prerequisites

- Option 1: Local Development
  - Node.js (v18 or higher)
  - npm (v9 or higher)
  - Git

- Option 2: Docker Development
  - Docker
  - Docker Compose

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Hasebul21/jenkins-pipeline.git
cd jenkins-pipeline
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

## Running the Application

### Option 1: Using Docker (Recommended)

Run the entire application stack with a single command:

```bash
docker-compose up --build
```

This will:
- Build both frontend and backend images
- Start the backend service on http://localhost:3000
- Start the frontend service on http://localhost:80

To stop the services:
```bash
docker-compose down
```

Individual Docker Commands:
```bash
# Build and run backend only
cd backend
docker build -t jenkins-pipeline-backend .
docker run -p 3000:3000 jenkins-pipeline-backend

# Build and run frontend only
cd frontend
docker build -t jenkins-pipeline-frontend .
docker run -p 80:80 jenkins-pipeline-frontend
```

### Option 2: Local Development

### Backend

Start the backend server:
```bash
cd backend
npm start
```
The server will run on http://localhost:3000

Build the backend (creates bundled version in dist/):
```bash
npm run build
```

Run backend tests:
```bash
npm test
```

### Frontend

Start the development server:
```bash
cd frontend
npm run dev
```
The application will be available at http://localhost:5173

Build the frontend:
```bash
npm run build
```

Run frontend tests:
```bash
npm test
```

## Features

- **Frontend**:
  - Modern, responsive UI with glassmorphism design
  - Real-time calculation interface
  - Error handling and loading states
  - Unit tests using Jest and React Testing Library

- **Backend**:
  - RESTful API endpoints
  - Express.js server
  - Mocha/Supertest for API testing
  - Bundle generation using esbuild

- **CI/CD Pipeline**:
  - Automated testing
  - Build verification
  - Deployment stages

## API Endpoints

### POST /price
Calculate the sum of two numbers.

Request body:
```json
{
  "a": number,
  "b": number
}
```

Response:
```json
{
  "sum": number
}
```

## Docker Configuration

The project includes Docker configuration for both services:

### Frontend Dockerfile
- Base image: node:24-alpine for build
- Multi-stage build process:
  1. Build stage: Builds the React application
  2. Production stage: Serves via nginx
- Exposed port: 80

### Backend Dockerfile
- Base image: node:24-alpine
- Production-ready configuration
- Exposed port: 3000

### Docker Compose
- Orchestrates both services
- Sets up proper networking
- Handles service dependencies
- Environment configuration

## Development

The project uses:
- React with Vite for frontend
- Express.js for backend
- Tailwind CSS for styling
- Jest and React Testing Library for frontend testing
- Mocha and Supertest for backend testing
- esbuild for backend bundling

## Testing

Both frontend and backend include comprehensive test suites:

- Frontend tests cover:
  - Component rendering
  - User interactions
  - API integration
  - Error handling

- Backend tests cover:
  - API endpoints
  - Request validation
  - Response formatting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
