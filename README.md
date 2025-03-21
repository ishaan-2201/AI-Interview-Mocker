# AI Interview Mocker Application

An AI-powered interview mock application built with Next.js, Drizzle ORM, Neon DB, Clerk for authentication, and the Gemini API. The application helps users prepare for interviews by generating tailored mock interview questions and answers based on job details. It also supports a simulated interview experience with speech-to-text input and feedback on user responses.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)


## Overview

The AI Interview Mock Application allows users to:
1. **Log in securely** using Clerk authentication.
2. **Enter job details** such as job description, job position, tech stack, years of experience, etc.
3. **Generate mock interview questions and answers** via the Gemini API based on the provided job details. These questions and answers are stored in a Neon DB.
4. **Start a simulated interview**, where the user’s speech is converted to text using the React Hook Speech-to-Text library.
5. **Receive feedback and ratings** for each answer via another call to the Gemini API. The feedback and ratings are stored in a separate Neon DB table.
6. **Access a Dashboard** where users can review past interview experiences, learn from the feedback, and prepare for upcoming interviews.

## Features

- **User Authentication:** Secure login/register using Clerk.
- **Job Detail Input:** Users can provide detailed job information.
- **Interview Question Generation:** Integrates with Gemini API to generate interview questions/answers.
- **Speech-to-Text Interview Simulation:** Uses React Hook Speech-to-Text to capture user responses during a simulated interview.
- **Feedback & Rating:** Provides automated feedback and ratings for each response, powered by Gemini API.
- **Data Storage:** Stores interview questions, answers, user responses, and feedback in Neon DB using Drizzle ORM.
- **User Dashboard:** Displays past interview experiences and analytics for continuous learning.

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS (or your preferred styling framework)
- **Backend:** Next.js API routes
- **Database:** Neon DB (PostgreSQL)
- **ORM:** Drizzle ORM
- **Authentication:** Clerk
- **APIs:** Gemini API for content generation and feedback
- **Speech-to-Text:** React Hook Speech-to-Text

## Architecture

1. **User Authentication:**
   - Users sign up/log in using Clerk.
2. **Job Detail Form:**
   - After authentication, users enter job-related details.
3. **Question Generation:**
   - A request is sent to the Gemini API with job details.
   - The Gemini API responds with tailored mock interview questions and answers.
   - These are stored in a Neon DB table.
4. **Interview Simulation:**
   - Users start the interview.
   - Their spoken responses are converted to text using React Hook Speech-to-Text.
   - The responses are stored in another table in Neon DB.
   - Another Gemini API call processes the response to provide feedback and ratings, which are also stored.
5. **Dashboard:**
   - Users can view past interview experiences, including questions, their responses, feedback, and ratings, for self-improvement.

