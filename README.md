# 📋 Task Manager – Productivity Web Application

A **task management web application built with the MERN stack** that focuses on **smart task prioritization using data structures**.
Instead of a simple to-do list, this app highlights the **most important task** so users can focus on what matters most.

---

# 📌 Overview

This project includes:

* A **dashboard** to create and manage tasks
* A **smart home page** that highlights the most important task
* A **profile page with analytics** to track productivity

The goal is to make task management **more intelligent and efficient**.

---

# 🛠 Features

## Navigation

* **Home** – Shows the highest priority task
* **Dashboard** – Create and manage tasks
* **Profile** – Displays user information and analytics

---

## Dashboard (Task Management)

* Add tasks with **title, description, and due date**
* Set **importance level (1–10)** for each task
* **Real-time updates** so tasks appear instantly without refreshing

---

## Home Page

### ⭐ Priority Bar

Displays the **most important task** based on a priority algorithm.

### 📊 Activity Feed

Shows the **two most recently completed tasks** so users can quickly see their progress.

---

## Profile & Analytics

### 👤 User Information

Stores and displays:

* Name
* Email

### 📈 Efficiency Metric

**Accuracy Percentage**

```
Accuracy % = (Completed Tasks / Total Tasks) × 100
```

This shows how efficiently tasks are completed before they expire.

### 📜 Task History

A list of all completed tasks for tracking productivity.

---

# 🧠 Core Logic

The app uses a **Priority Queue concept** to determine the most important task.

Each task is given a **priority weight** based on importance and urgency.

```
Priority Weight = (Importance × 0.7) + (Urgency Factor × 0.3)
```

This ensures that **important tasks with close deadlines appear first** on the home page.

---

# 💻 Tech Stack

**Frontend**

* React.js
* React Hooks
* Context API

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB

---

Built as a **full-stack MERN project demonstrating how data structures can improve productivity tools.**
