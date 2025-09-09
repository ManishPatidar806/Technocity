
# Technocity 

This repository contains a full-stack web application for a company website, featuring a modern Frontend built with Vite, React, and Tailwind CSS, and a robust Backend powered by Spring Boot (Java). The project supports job applications, static content pages, and file uploads.

---

## Table of Contents
- [Project Structure](#project-structure)
- [Frontend](#frontend)
- [Backend](#backend)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [File Uploads](#file-uploads)
- [Development](#development)
- [License](#license)

---

## Project Structure

```
ASSIGNMENt/
├── Backend/         # Spring Boot backend (Java)
│   ├── src/         # Source code (main & test)
│   ├── pom.xml      # Maven build file
│   └── ...
├── Frontend/        # React frontend (Vite + Tailwind CSS)
│   ├── src/         # Source code (components, pages, hooks, etc.)
│   ├── package.json # NPM dependencies
│   └── ...
└── uploads/         # Uploaded files (PDF resumes, etc.)
```

---

## Frontend

- **Framework:** React 18 (with TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Folder:** `Frontend/`

### Key Features
- Responsive company website UI
- Careers page with job application modal
- Admin UI components (modals, forms)
- Context-based authentication (`AuthContext`)
- API integration with backend

### Main Files
- `src/pages/` — Main pages (Home, About, Careers, Contact, Services, NotFound)
- `src/components/` — UI and admin components
- `src/api/` — API client and service functions
- `src/contexts/` — React context for authentication

---

## Backend

- **Framework:** Spring Boot (Java)
- **Build Tool:** Maven
- **Folder:** `Backend/`

### Key Features
- RESTful API for jobs, authentication, and file uploads
- Serves static files and templates
- Stores uploaded files in `uploads/`

### Main Files
- `src/main/java/org/company/` — Java source code
- `src/main/resources/application.properties` — App configuration
- `pom.xml` — Maven dependencies

---

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm or bun (for Frontend)
- Java 21+ (for Backend)
- Maven (for Backend)

### 1. Clone the Repository
```bash
git clone <repo-url>
cd ASSIGNMENt
```

### 2. Setup Backend
```bash
cd Backend
mvn clean install
# To run the backend server:
mvn spring-boot:run
# Or run the JAR directly:
# java -jar target/CompanyWebsite-0.0.1-SNAPSHOT.jar
```
The backend will start on [http://localhost:8080](http://localhost:8080)

### 3. Setup Frontend
```bash
cd Frontend
npm install  # or bun install
npm run dev  # or bun run dev
```
The frontend will start on [http://localhost:5173](http://localhost:5173) (default Vite port)

---

## Usage


1. **Open the Frontend** in your browser: [http://localhost:5173](http://localhost:5173)
2. **API requests** from the frontend are proxied to the backend (configure base URL in `src/api/apiClient.ts` if needed).
3. **Admin features** (like job posting, editing, deleting jobs, viewing applicants) require authentication.
4. **Uploaded files** (e.g., resumes) are stored in `uploads/pdfs/`.

---

## Admin Features & Authentication

- **Admin Login:**
	- Go to [http://localhost:5173/admin/login](http://localhost:5173/admin/login) to access the admin login page.
    - insert username and password in database then use them
	- Enter your admin username and password. On success, you will be redirected to the admin dashboard.
	- The frontend stores the JWT token in localStorage and uses it for authenticated API requests.
- **Admin Dashboard:**
	- After login, access the dashboard at [http://localhost:5173/admin/dashboard](http://localhost:5173/admin/dashboard).
	- You can create, edit, and delete jobs, and view applicants.
- **API Endpoints:**
	- Admin APIs are available under `/api/v1/admin/` (e.g., `/api/v1/admin/login`, `/api/v1/admin/changepassword`).
	- All protected endpoints require a valid JWT token in the `Authorization` header.
- **Initial Admin Setup:**
	- If no admin user exists, you may need to insert one directly into the database (see your DB setup for details).
	- Passwords may be stored as plain text or hashed depending on your implementation. Check the backend code for details.

---

## API Documentation (Swagger)

- The backend provides interactive API documentation using Swagger UI (SpringDoc OpenAPI).
- **Access Swagger UI:**
	- Start the backend server.
	- Open [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html) or [http://localhost:8080/swagger-ui/](http://localhost:8080/swagger-ui/) in your browser.
	- You can explore and test all available API endpoints, including authentication and job management.
- **JWT Authentication in Swagger:**
	- No need "Authorize" token in Swagger UI or JWT token as `Bearer <token>` to access protected endpoints.

---

---

## File Uploads

- Uploaded PDFs (resumes, etc.) are saved in `uploads/pdfs/`.
- Ensure this directory exists and is writable by the backend.

---

## Development

- **Frontend:**
	- Use Vite for fast refresh: `npm run dev`
	- Linting: `npm run lint`
	- Build: `npm run build`
- **Backend:**
	- Run with: `mvn spring-boot:run` or `java -jar ...`
	- Tests: `mvn test`

---


