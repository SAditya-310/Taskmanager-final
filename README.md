# Task Manager – MERN Productivity App

A task management web application built using the MERN stack.
The app focuses on **smart task prioritization using data structures**, helping users quickly identify the most important task instead of managing a basic to-do list.

---

## Overview

This project includes:

* A dashboard to create and manage tasks
* A home page that highlights the most important task
* A profile page that shows user details and productivity analytics

The goal is to make task management **simple, efficient, and smarter**.

---

## Features

### Navigation

* **Home** – Displays the highest priority task
* **Dashboard** – Create and manage tasks
* **Profile** – Shows user details and analytics

### Task Management

* Add tasks with **title, description, and due date**
* Set **importance level (1–10)**
* **Real-time updates** so tasks appear instantly without refreshing

### Home Page

* Shows the **most important task** using a priority algorithm
* Displays the **two most recently completed tasks**

### Profile & Analytics

* Stores **name and email**
* Calculates **Accuracy Percentage**

```
Accuracy % = (Completed Tasks / Total Tasks) × 100
```

* Shows a history of completed tasks

---

## Core Logic

The system uses a **priority queue concept** to determine the most important task.

```
Priority Weight = (Importance × 0.7) + (Urgency Factor × 0.3)
```

This ensures that tasks with **higher importance and closer deadlines appear first**.

---

## Tech Stack

Frontend

* React.js
* React Hooks
* Context API

Backend

* Node.js
* Express.js

Database

* MongoDB

---

A full-stack MERN project demonstrating how **data structures can improve productivity tools**.
