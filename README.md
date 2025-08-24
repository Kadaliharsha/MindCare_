# MindCare - Digital Mental Healthcare Platform

A comprehensive mental health platform with a Spring Boot backend and React frontend.

## Project Structure

```
MindCare/
├── backend/          # Spring Boot Backend
│   ├── src/
│   ├── pom.xml
│   └── ...
└── frontend/         # React Frontend
    ├── src/
    ├── package.json
    └── ...
```

## Prerequisites

### Backend Requirements
- Java 17 or higher
- Maven 3.6+
- MySQL Database

### Frontend Requirements
- Node.js 16 or higher
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd MindCare/backend
   ```

2. Configure database in `src/main/resources/application.properties`

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

4. Backend will be available at: `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd MindCare/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Frontend will be available at: `http://localhost:5173`

## Features

### Backend Features
- User authentication and authorization
- Therapist management
- Appointment scheduling
- Blog management
- Emergency contact system
- SOS functionality
- Feedback system

### Frontend Features
- Modern, responsive UI with Tailwind CSS
- User dashboard
- Therapist dashboard
- Appointment booking
- Blog creation and viewing
- Emergency support
- Assessment tools

## Technology Stack

### Backend
- Spring Boot 3.x
- Spring Security
- Spring Data JPA
- MySQL Database
- Twilio (for SMS)

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios

## Development

The project has been reorganized from the original nested structure to a cleaner, more maintainable layout. All functionality remains the same with improved project organization.

## Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **Backend Health Check**: http://localhost:8080/actuator/health

## Notes

- Make sure both backend and frontend are running simultaneously for full functionality
- Database must be properly configured before starting the backend
- All API endpoints are prefixed with `/api/v1/` 
