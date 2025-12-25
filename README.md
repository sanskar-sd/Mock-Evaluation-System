# 🎯 Mock Evaluation System 

A role-based **Mock Evaluation Management System** built using **MERN Stack** for managing mock interviews and evaluations.

---

## ✨ Key Features

### 🔐 Authentication
- Login & Registration
- Role-based access (**Admin / Evaluator**)
- JWT authentication

### 👨‍💼 Admin
- ➕ Create & view **Batches**
- ➕ Create & view **Technologies**
- ➕ Create & view **Participants**
- 🔗 Assign **Evaluators** to Participants
- 📊 View **Assignments & Evaluation Results**

### 🧑‍🏫 Evaluator
- 👀 View assigned **Participants**
- 📝 Submit **Scores & Feedback**
- 📄 Access evaluation forms

---

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS v4
- Axios
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT, bcryptjs

---

**🔄 App Flow**
Login / Register 🔐
Admin → Admin Dashboard 👨‍💼
Evaluator → Evaluator Dashboard 🧑‍🏫
Admin assigns evaluators → Evaluator submits results
Admin views evaluation reports 📊