#**📋 Task Manager – Productivity Web Application**

A high-performance **task management web application** built using the **MERN Stack**.
This project focuses on **intelligent task prioritization using data structures** to ensure the most critical work is always prioritized.

---

# 📌 Project Overview

Unlike a standard **To-Do list**, TaskFlow uses a **Priority-Weighting Algorithm** to rank tasks dynamically.

It also provides:

* A **dedicated analytics profile** to track productivity
* A **dynamic dashboard** for task creation and management
* A **smart home page** that surfaces the most important task automatically

# 🛠 Features

## 1️⃣ Interactive Navigation

* **Home**
  Your command center displaying the highest priority task.

* **Dashboard**
  The engine where tasks are created, edited, and managed.

* **Profile**
  Displays user information and other important details

---

## 2️⃣ Dashboard – Task Management

* **Task Input System**
  Add tasks with title, description, and due date.

* **Importance Scale**
  Assign an importance level from **1 – 10** to each task.

* **Real-Time Updates**
  Tasks appear instantly using React state management without page refresh.

---

## 3️⃣ Home Page – Smart View

### ⭐ Priority Bar

The central feature of the application.

It dynamically displays the **Most Important Task** based on a weighted priority algorithm.

### 📊 Activity Feed

Displays the **two most recently completed tasks**, helping users track immediate progress.

---

## 4️⃣ User Profile & Analytics

### 👤 Identity Tracking

Stores and displays user:

* Name
* Email

### 📈 Efficiency Metrics

**Accuracy Percentage**

A dynamic metric used to measure reliability:

```
Accuracy % = (Completed Tasks / Total Tasks) × 100
```

This helps track how efficiently tasks are being completed before expiration.

### 📜 Task Completion History

A complete record of all successfully completed tasks.

---

# 🧠 Data Structures & Core Logic

To determine the **Most Important Task**, the system uses **Priority Queue logic**.

Instead of simple sorting, each task receives a **priority weight** based on importance and urgency.

### Priority Weight Formula

```
Priority Weight = (Importance × 0.7) + (Urgency Factor × 0.3)
```

This ensures that:

* High-importance tasks
* Tasks with approaching deadlines

are automatically surfaced in the **Priority Bar** on the Home page.

---

# 💻 Tech Stack

### Frontend

* React.js
* React Hooks
* Context API

### Backend

* Node.js
* Express.js

### Database

* MongoDB


Built as a full-stack project focusing on **data structures applied to real productivity tools.**
