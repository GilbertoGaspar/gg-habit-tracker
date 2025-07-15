# GG Habit Tracker

> A modern, feature-rich habit tracking application built with Next.js that helps users build and maintain positive habits through consistent tracking and reminders.

<a  href="https://gg-habit-tracker.vercel.app/">Demo App</a>

## Features

- **Habit Management**

  - Create, edit, and delete habits
  - Set custom frequencies (daily, weekly)
  - Add descriptions and icons to habits

- **Progress Tracking**

  - Log daily habit completions
  - View streak statistics
  - Track current and longest streaks
  - Visualize progress with charts (powered by Recharts)

- **Smart Reminders**

  - Set customizable reminders for specific days and times
  - Email notification support
  - Flexible reminder scheduling

- **User Management**
  - Secure authentication with credentials and Google sign-in
  - Password reset functionality
  - Email notification preferences
  - Personal habit dashboard

## Tech Stack

- **Frontend**

  - Next.js 15.3 with App Router
  - React 19
  - TailwindCSS for styling
  - Radix UI components for accessible UI elements
  - React Query for data fetching
  - React Hook Form for form handling
  - Zod for validation

- **Backend**
  - Next.js API routes
  - Prisma ORM with MySQL database
  - NextAuth.js for authentication
  - Brevo for email services
  - bcrypt for password hashing

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:

   ```env
   DATABASE_URL="your_mysql_connection_string"

   NEXT_PUBLIC_APP_URL=""
   NEXTAUTH_URL=""
   NEXTAUTH_SECRET=""
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET="

   BREVO_API_KEY=""
   BREVO_SENDER_NAME=""
   BREVO_SENDER_EMAIL=""
   ```

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Database Schema

The application uses a MySQL database with the following main entities:

- Users (authentication and preferences)
- Habits (core habit tracking)
- HabitLogs (daily completion records)
- Streaks (streak tracking)
- Reminders (notification settings)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)
