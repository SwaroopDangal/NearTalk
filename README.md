# Real-Time Group Chat App

A real-time proximity group chat application built using the **MERN stack** and **Socket.IO**.  
Users can join chat groups(within 5km range), send messages instantly, see active users, and groups are automatically deleted when empty.

---

## 🚀 Features

- Real-time messaging using Socket.IO
- Proximity based groups.Only users within 5km can join group and chat
- Active users count per group
- System messages on join/leave
- Auto-delete groups when empty (with safety delay)
- Validation for invalid or non-existing groups
- Optimized socket lifecycle handling
- Clean and responsive UI with Tailwind CSS

---

## 🛠 Tech Stack

### Frontend
- React
- React Router
- Socket.IO Client
- Tailwind CSS
- Lucide Icons
- Vite

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO
- CORS

---

## 📁 Project Structure

```
backend/
 ├─ src/
 │  ├─ socket/
 │  │  └─ socket.js
 │  ├─ models/
 │  │  └─ group.models.js
 │  ├─ routes/
 │  ├─ lib/
 │  └─ app.js
 └─ server.js

frontend/
 ├─ src/
 │  ├─ pages/
 │  │  └─ ChatPage.jsx
 │  ├─ lib/
 │  │  └─ socket.js
 │  ├─ hooks/
 │  └─ main.jsx
```

---

## 🔌 Socket.IO Event Flow

### Client → Server
| Event | Payload | Description |
|------|--------|-------------|
| join-group | { groupId, username } | Join a chat group |
| send-message | { groupId, text, username } | Send a message |
| leave-group | — | Leave the group |

### Server → Client
| Event | Payload | Description |
|------|--------|-------------|
| receive-message | message | New chat message |
| system-message | text | Join/leave notifications |
| active-users | number | Active users count |
| group-not-found | — | Invalid group |

---

## 🗑 Auto Group Deletion Logic

- When the last user leaves a group
- Server waits **5 seconds**
- If no one rejoins → group is deleted from MongoDB
- Prevents accidental deletion on refresh

---

## 🔐 Environment Variables

### Backend (`.env`)
```
PORT=5000
MONGO_URI=your_mongodb_uri
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (`.env`)
```
VITE_API_URL=http://localhost:5000
```

---

## ▶️ Run Locally

### 1. Clone Repository
```bash
git clone <repo-url>
cd project
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## ✅ Expected Behavior

- Users join groups via URL
- Messages appear instantly
- Active users update correctly
- Groups disappear when empty
- Refresh-safe socket handling

---


## 👤 Author

**Swaroop Dangal**  
