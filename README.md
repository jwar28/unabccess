# UNABccess

![Logo](path/to/logo.png) <!-- Replace with the actual path to your logo -->

## Description

UNABccess is a powerful and user-friendly software solution designed to streamline the process of managing reservations and access to various spaces within the Universidad Autónoma de Bucaramanga (UNAB). This application aims to optimize the allocation of university spaces, ensuring they are utilized efficiently and in accordance with the needs of students, faculty, and staff.

### Key Features

- **User Friendly Interface**: Intuitive design that makes it easy for users to navigate and manage their reservations.
- **RealTime Availability**: Check the availability of various spaces in real-time to make informed decisions.
- **Reservation Management**: Create, modify, and cancel reservations with ease.
- **Notifications**: Get timely notifications about reservation statuses, approvals, and reminders.
- **Privacy and Security**: Robust security measures to protect user data and ensure privacy.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   
   ```bash
   git clone https://github.com/yourusername/unabccess.git
   cd unabccess

2. Install dependencies
	```bash
   npm install
 
3. Set up environment variables
	Create a `.env.local` file in the root directory and add your Firebase configuration
	```bash
	NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
	NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
	NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
	NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
	NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
	NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
4. Run the development server
	```bash
 	npm run dev
 	```
	Open your browser: Navigate to `http://localhost:3000` to view the application.

## Usage

- **User Registration**: New users can create an account to access the reservation system.
- **Login**: Existing users can log in to manage their reservations.
- **Make Reservations**: Users can select spaces and reserve them for specific dates and times.
- **Manage Notifications**: Users will receive notifications regarding their reservations and any updates.

## Acknowledgments
`Developer` > Javier Guerra 
`DB admin` > Javier Guerra && Santiago Áviles 
`Documentation & Management` > Lucas Porras

