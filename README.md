# 🐶 DogSchool

This system is built for a large dog school in Hungary – an internal web application to help manage mentors and their participation in training courses.

DogSchool is a modern full-stack web application. Mentors can apply to courses (where they want to teach), and admins can accept or reject applications, create new courses, and manage everything – all with role-based permissions.

---

## 🚀 Tech Stack

<p align="left">
  <a href="https://nextjs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
  </a>
</p>

<p align="left">
  <a href="https://reactjs.org/" target="_blank">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  </a>
</p>

<p align="left">
  <a href="https://tailwindcss.com/" target="_blank">
    <img src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  </a>
</p>

<p align="left">
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  </a>
</p>

<p align="left">
  <a href="https://www.postgresql.org/" target="_blank">
    <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  </a>
</p>

<p align="left">
  <a href="https://www.prisma.io/" target="_blank">
    <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
  </a>
</p>

<p align="left">
  <a href="https://www.docker.com/" target="_blank">
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
  </a>
</p>

<p align="left">
  <a href="https://nodejs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  </a>
</p>

<p align="left">
  <a href="https://github.com/" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
  </a>
</p>


---

## ✨ Features

- 🔐 Authentication: Login 
- 👥 Role-based access: `MENTOR`, `ADMIN`
- 📅 Course management interface
- ✅ Course application & participation tracking
- ✅ Creating courses
- ✅ Request to replacement

---

## 📦 What’s done so far

- 🧑‍🏫 Mentor Navbar – custom layout and navigation for mentors
- 🔗 Routing with App Router – `/login`, `/home`, `/courses`, etc.
- 🔐 Login UI – form with email & password, Tailwind-based
- 🧬 Prisma models – User, Course, Application, Participation
- 🧪 Test API – `/api/login` functional with hardcoded validation

## 🛠️ Getting Started

```bash
git clone https://github.com/<your-username>/dogschool.git
cd dogschool
npm install
docker-compose up -d
npx prisma migrate dev
npm run dev
