
# SkillUp

SkillUp is an online learning and educational course management platform. This web application will revolutionize the way educational institutions, tutors and students interact, making skill learning and class management more efficient and accessible than ever before.
 

## Demo

- [Live Link](https://skillup-57533.web.app/)
- [Server Side Repo](https://github.com/nhnaahid/skillup-server)
- Admin email: admin@gmail.com
- Admin password: Admin@123

# Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

Make sure you have the following installed:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Firebase CLI](https://firebase.google.com/docs/cli)

## Installation

1. **Clone & Install client dependencies:**

    ```bash
    git clone https://github.com/nhnaahid/skillup-client.git
    cd your-client-repository
    npm install
    ```

2. **Clone & Install server dependencies:**

    ```bash
    git clone https://github.com/nhnaahid/skillup-server.git
    cd your-server-repository
    npm install
    ```

4. **Set up environment variables:**

    Create a `.env.local` file in the `client` directory and add the following:

    ```env
    VITE_apiKey=your_firebase_api_key
    VITE_authDomain=your_firebase_auth_domain
    VITE_projectId=your_firebase_project_id
    VITE_storageBucket=your_firebase_storage_bucket
    VITE_messagingSenderId=your_firebase_messaging_sender_id
    VITE_appId=your_firebase_app_id
    VITE_IMAGE_HOSTING_KEY=imgbb_hosting_key
    VITE_Payment_Gateway_PK=stripe_payment_gateway_publishable_key
    ```

    Create a `.env` file in the `server` directory and add the following:

    ```env
    DB_USER=mongodb_uri_user
    DB_PASS=mongodb_uri_pass
    ACCESS_TOKEN_SECRET=generated_jwt_token
    STRIPE_SECRET_KEY=stripe_payment_gateway_secret_key
    ```

5. **Run the server:**

    ```bash
    cd your-server-repository
    nodemon index.js
    ```

6. **Run the client:**

    Open a new terminal window/tab and run:

    ```bash
    cd your-client-repository
    npm run dev
    ```

## Firebase & JWT Setup
Please follow their docs to integrate firebase authentication, create and store jwt in local storage for authentication and authorization.

## Usage

Once the server and client are running, open your web browser and go to `http://localhost:5173` to view the application.




## Features

1. **Browse Courses**
   - Users can explore a wide range of courses across different subjects.

2. **Create Profile**
   - Users can create and customize their profiles.
   - Profile includes personal information, enrolled courses, and progress tracking.

3. **Firebase Authentication**
   - Secure authentication using Firebase for user login and registration.
   - Supports email/password and social media login options.

4. **Separate Dashboards**
   - **Admin Dashboard**: Comprehensive control panel for site management.
   - **Student Dashboard**: Personalized area for course management and tracking progress.
   - **Teacher Dashboard**: Interface for managing courses, assignments, and student interactions.

5. **Enroll Course**
   - Easy course enrollment process for students.
   - Instant access to course materials upon enrollment.

6. **Secure Payment**
   - Integrated secure payment gateway for course purchases.

7. **Assignment Management**
   - Teachers can post assignments with deadlines.
   - Students can submit assignments directly through the platform.

8. **User Behavior Statistics**
   - Detailed analytics on user engagement and behavior.
   - Helps in understanding user preferences and improving the platform.

9. **Fully Controlled Admin Panel**
   - Full control over user management, course management, and site settings.
   - Ability to generate reports, manage payments, and monitor site activity.

10. **Feedback Section**
    - Users can provide feedback on courses and platform functionality.
    - Helps in continuous improvement based on user input.

11. **Responsive Design**
    - Mobile-friendly design ensuring accessibility on all devices.
    - Consistent and intuitive user experience across desktops, tablets, and smartphones.



## Tech Stack

SkillUp is built using the MERN stack, a powerful combination of technologies that provide a seamless development experience for both the frontend and backend.

### Frontend

- **React.js**
- **Tailwind CSS**

### Backend

- **Node.js**
- **Express.js**

### Database

- **MongoDB**

### Authentication

- **Firebase Authentication**

### Payment Gateway

- **Stripe**

### Additional Tools and Packages

- **JWT (JSON Web Tokens)**
- **Axios**
- **React Hook Form**
- **Swiper Slider**

By utilizing the MERN stack and these additional tools, SkillUp ensures a robust, scalable, and high-performance web application that delivers a seamless learning experience for all users.


