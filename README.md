College Attendance Portal (Face Authentication Based)

📌 Overview

The College Attendance Portal is a secure and automated attendance management system that uses face authentication to verify student identity and record attendance in real time. The project ensures high accuracy, eliminates proxy attendance, and provides a seamless experience for students, faculty, and administrators.

This system consists of a React-based Frontend and a Node.js + Express + MongoDB Backend with face recognition integrated using Python services.


---

🚀 Key Features

Face Authentication System ensuring secure and proxy-free attendance.

Real-Time Attendance Marking through camera-based recognition.

Faculty Dashboard for viewing, managing, and exporting attendance.

Student Portal displaying attendance history and daily logs.

Admin Panel for managing departments, faculty, and student onboarding.

REST APIs for smooth communication between modules.

Role-Based Authentication (Student / Faculty / Admin).



---

📂 Tech Stack

Frontend:

React.js

Tailwind CSS / CSS Modules

Axios

React Router


Backend:

Node.js

Express.js

MongoDB (Mongoose ORM)

JSON Web Tokens (JWT)


Face Recognition Module:

Python (face-recognition, dlib, OpenCV)

Flask API (integrated with backend)



---

📁 Project Structure

📦 Attendance Portal
├── 📁 frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   └── utils
│   └── public
├── 📁 backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   └── face-recognition (Python Service)
└── README.md


---

🔄 System Workflow (Flow Diagram)

flowchart TD
A[Student Opens Portal] --> B[Camera Captures Image]
B --> C[Send Image to Backend]
C --> D[Backend Sends to Python Face Auth Service]
D --> E{Face Match?}
E -->|Yes| F[Mark Attendance]
E -->|No| G[Reject Attendance]
F --> H[Update DB]
H --> I[Show Success to UI]


---

🧱 System Architecture Diagram

graph LR
A[React Frontend] -- API Calls --> B[Node.js Express Backend]
B -- Requests --> C[Python Face Auth Service]
B -- DB Queries --> D[(MongoDB)]
C -- Match Result --> B
B -- JSON Response --> A


---

🧪 API Structure

POST /auth/login

Authenticates student/faculty/admin.

POST /attendance/mark

Uploads face image → verifies → marks attendance.

GET /attendance/student/:id

Fetches attendance logs for a student.

GET /dashboard/faculty

Faculty dashboard analytics.


---

📊 Database Models

Student Model

Name

Roll Number

Department

Face Embedding

Attendance Logs


Attendance Model

Student ID

Timestamp

Status


Faculty Model

Courses

Attendance Sheets



---

📈 Impact

Eliminates proxy attendance

Reduces human effort in manual attendance

Generates fast, real-time attendance reports

Improves accuracy and security in academic workflow



---

📸 Screens & Demo (Add URLs if hosted)

Login Page

Student Dashboard

Faculty Panel

Admin Management Panel



---

🛠️ Installation Guide

Frontend Setup

cd frontend
npm install
npm start

Backend Setup

cd backend
npm install
npm start


---

🤝 Contributors

Sambhav Rawani (Frontend & Backend Integration)

Team members (as applicable)



---

📬 Contact

For any queries: sambhavrawani@gmail.com


---