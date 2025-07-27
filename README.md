<h1 align="center">📁 File Storage System</h1>
<p align="center">
  A secure and scalable file uploader built using the MERN stack with Next.js and Tailwind CSS.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Tech-Stack-blue?style=flat-square"/>
  <img src="https://img.shields.io/badge/Frontend-Next.js-blue?style=flat-square"/>
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=flat-square"/>
  <img src="https://img.shields.io/badge/Database-MongoDB-yellow?style=flat-square"/>
</p>

---

## 🚀 Features

- 🔐 JWT-based authentication and secure file access
- ☁️ Cloudinary file upload integration
- 🧾 File listing with metadata
- 🗂️ Organized folder-based storage (virtual)
- 📦 Modern UI with Next.js + Tailwind CSS
- 🔄 Persistent Redux store with `redux-persist`
- 🌍 CORS-enabled API with cookie support

---

## 🛠️ Tech Stack

### Frontend
- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Flowbite + Flowbite React](https://flowbite.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Framer Motion](https://www.framer.com/motion/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [Cloudinary](https://cloudinary.com/)
- [Multer (file uploads)](https://github.com/expressjs/multer)
- [JWT (Authentication)](https://jwt.io/)
- [Cookie-Parser](https://www.npmjs.com/package/cookie-parser)
- [Morgan (logging)](https://www.npmjs.com/package/morgan)

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/file-storage-system.git
```
cd file-storage-system


2. Setup Environment Variables
Create a .env file in both server and client directories.

For server/.env:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

For client/.env.local:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api



```

📡 API Endpoints
🔐 Authentication & User Management

| Method  | Endpoint                   | Description                    |
| ------- | -------------------------- | ------------------------------ |
| `GET`   | `/api/users/profile`       | Fetch logged-in user's profile |
| `PATCH` | `/api/users/profile`       | Update user profile            |
| `POST`  | `/api/users/reauth`        | Refresh access token           |
| `POST`  | `/api/users/logout`        | Logout from current session    |
| `POST`  | `/api/users/master-logout` | Logout from all devices        |


📁 Folder Management

| Method   | Endpoint                            | Description                    |
| -------- | ----------------------------------- | ------------------------------ |
| `POST`   | `/api/users/folder/createFolder`    | Create a new folder            |
| `GET`    | `/api/users/folderItem`             | Get all items in user's folder |
| `PATCH`  | `/api/users/:folderId/renameFolder` | Rename a folder by ID          |
| `DELETE` | `/api/users/:folderId/deleteFolder` | Delete a folder by ID          |

📄 File Management

| Method   | Endpoint                        | Description              |
| -------- | ------------------------------- | ------------------------ |
| `POST`   | `/api/users/createFile`         | Upload one or more files |
| `PATCH`  | `/api/users/:fileId/renameFile` | Rename a file by ID      |
| `DELETE` | `/api/users/:fileId/deleteFile` | Delete a file by ID      |



🔧 Run the App Locally

```bash

cd server
npm install
npm run start
```
Frontend
```bash

cd client
npm install
npm run dev
```
📁 Folder Structure

```bash
file-storage-system/
├── client/          # Next.js Frontend
├── server/          # Express Backend
```

🧑‍💻 Author
Muhammed Fahiz K
```bash
🔗 Portfolio: fahiz.vercel.app

📫 GitHub: @fahiz-mavoor
```
🌟 Show Your Support
Give a ⭐️ if you like this project or found it helpful!
This README was generated with ❤️ and refined by AI + Dev hands.


