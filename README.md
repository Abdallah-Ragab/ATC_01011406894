# Eventista (Event Booking Platform)

A modern web application for booking and managing events. This full-stack application allows users to browse, search, and book various events while administrators can create and manage event listings.

Note: This project was developed as part of AREEB Technology Competition (ATC).

## Features

### User Features
- **User Authentication**: Secure login and registration system
- **Event Discovery**: Browse and search for events with filtering options
- **Event Booking**: Book tickets for events with confirmation
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Multi-language Support**: Supports Arabic and English languages

### Admin Panel Features
- **Event Management**: Create, edit, and delete events

## Tech Stack

### Frontend
- **React**: UI library for building the user interface
- **TypeScript**: For type safety and better developer experience
- **Vite**: Fast and efficient build tool
- **React Router**: For client-side routing
- **Shadcn UI**: Modern UI component library
- **Axios**: HTTP client for API requests
- **Lucide React**: Icons library
- **React Hook Form**: Form validation library

### Backend
- **Django**: Python web framework
- **Django REST Framework**: For building RESTful APIs
- **Simple JWT**: For secure token-based authentication
- **SQLite**: Database (development)

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- Python (3.10 or later)
- pip

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/Abdallah-Ragab/ATC_01011406894.git
cd ATC_01011406894
```

#### 2. Set up the backend
```bash
cd backend
```
- Create a virtual environment and activate it (optional but recommended)
```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```
- Install dependencies
```bash
pip install -r requirements.txt
```
- Set up the database
```bash
python manage.py migrate
```
- Create a superuser for the admin panel
```bash
python manage.py createsuperuser  # Follow the prompts to create an admin user
```
- Load initial data (optional)
```bash
python manage.py mock 
```

####  3. Set up the frontend
   
```bash
cd ../frontend
npm install  # or yarn install
```

### Running the Application

1. Start the backend server
```bash
cd backend
python manage.py runserver
```

2. In a separate terminal, start the frontend development server
```bash
cd frontend
npm run dev  # or yarn dev
```

3. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000/api/
   - Django Admin panel: http://localhost:8000/admin/

## Project Structure

### Backend
- `api/`: Main API application with models, views, and serializers
- `backend/`: Project configuration and settings
- `manage.py`: Django's command-line utility for administrative tasks

### Frontend
- `public/`: Static assets
- `src/`: Source code
  - `components/`: Reusable UI components
  - `context/`: React context providers
  - `hooks/`: Custom React hooks
  - `lib/`: Utility libraries
  - `pages/`: Page components
  - `utils/`: Helper functions