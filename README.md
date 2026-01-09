📍 Proximity Chat
A real-time, location-based anonymous group chat application that enables users to join conversations only when they're within 5km of the group's location. Built with the MERN stack and Socket.IO for seamless real-time communication.
Show Image
Show Image
Show Image
🌟 Key Features
🎯 Proximity-Based Access

Location Verification: Users must be within 5km radius to join a group chat
Anonymous Chat: No registration required - join with just a username
Geofenced Groups: Groups are tied to specific geographic locations

💬 Real-Time Communication

Instant Messaging: Powered by Socket.IO for zero-latency chat
Socket.IO Rooms: Isolated chat rooms for each group
Active Users Count: Live tracking of participants in each group
System Notifications: Join/leave messages for better context

🔧 Smart Group Management

Auto-Cleanup: Empty groups are automatically deleted after a delay
Group Validation: Invalid or non-existent group IDs are rejected
Optimized Lifecycle: Robust handling of connect, reconnect, and disconnect events

🚀 Production-Ready

CORS Enabled: Secure cross-origin resource sharing
Error Handling: Comprehensive error management
Scalable Architecture: Built for performance and reliability

🛠️ Tech Stack
Frontend

React - UI framework
React Router - Client-side routing
Socket.IO Client - Real-time bidirectional communication
Tailwind CSS - Utility-first styling
Lucide Icons - Modern icon library

Backend

Node.js - JavaScript runtime
Express.js - Web application framework
MongoDB - NoSQL database
Mongoose - MongoDB object modeling
Socket.IO - Real-time engine

📋 Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v14 or higher)
MongoDB (v4.4 or higher)
npm or yarn package manager

🚀 Installation
1. Clone the Repository
bashgit clone https://github.com/yourusername/proximity-chat.git
cd proximity-chat
2. Install Backend Dependencies
bashcd backend
npm install
3. Install Frontend Dependencies
bashcd ../frontend
npm install
4. Environment Configuration
Create a .env file in the backend directory:
env# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb://localhost:27017/proximity-chat

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:****

# Socket.IO Configuration
SOCKET_PING_TIMEOUT=60000
SOCKET_PING_INTERVAL=25000

# Group Management
GROUP_DELETION_DELAY=300000  # 5 minutes in milliseconds

# Location Settings
PROXIMITY_RADIUS_KM=5
Create a .env file in the frontend directory:
env# API Configuration
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
🏃 Running the Application
Development Mode
Start Backend Server
bashcd backend
npm run dev
Start Frontend Development Server
bashcd frontend
npm start
The application will be available at:

Frontend: http://localhost:3000
Backend API: http://localhost:5000

Production Mode
Build Frontend
bashcd frontend
npm run build
Start Backend Server
bashcd backend
npm start
```

## 📱 Usage

### Creating a Group
1. Navigate to the home page
2. Click "Create Group"
3. Allow location access when prompted
4. Enter a group name
5. Share the generated group ID with others nearby

### Joining a Group
1. Obtain a group ID from someone nearby
2. Navigate to the join page
3. Allow location access when prompted
4. Enter the group ID and your username
5. If within 5km range, you'll be connected to the chat

### Chatting
- Type your message in the input field
- Press Enter or click Send
- See real-time messages from other users
- View system notifications when users join/leave
- Monitor active user count in the header

## 🏗️ Project Structure
```
proximity-chat/
├── backend/
│   ├── utils/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── Group.js              # Group schema
│   │   
│   ├── routes/
│   │   ├── groups.js             # Group routes
│   │   
│   ├── socket/
│   │   └── socket.js           # Socket.IO event handlers
│   ├── server.js                 # Express & Socket.IO setup
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Pages/
│   │   │   ├── Chat.jsx          # Chat interface
│   │   │   ├── GroupList.jsx     # Group listing
│   │   │   ├── JoinGroup.jsx     # Join group form
│   │   │   └── CreateGroup.jsx   # Create group form
│   │   ├── lib/
│   │   │   └── Socket.js# Socket.IO context
│   │   │   └── api.js
│   │   ├── hooks/
│   │   │   ├── useSocket.js      # Socket hook
│   │   │   └── useLocation.js    # Geolocation hook
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css             # Tailwind styles
│   └── package.json
│
└── README.md


🔄 Socket.IO Events
Client → Server

join-group - Join a chat room
send-message - Send a message
leave-group - Leave a chat room
disconnect - Handle disconnection

Server → Client

user-joined - Notify when user joins
user-left - Notify when user leaves
receive-message - Receive new messages
active-users-update - Update active user count
error - Error notifications

🌍 Location Verification
The application uses the Haversine formula to calculate distances between coordinates:
javascriptfunction calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
            
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
🔒 Security Considerations

✅ CORS configured for specific origins
✅ Input validation on all endpoints
✅ Rate limiting recommended for production
✅ Location data not stored permanently
✅ Anonymous usernames (no personal data required)

🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository
Create a feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

## 👨‍💻 Author

**Your Name**

- GitHub: [@SwaroopDangal](https://github.com/SwaroopDangal)
- LinkedIn: [Swaroop Dangal](https://www.linkedin.com/in/swaroop-dangal-891a05375/)
- Email: swaroopdangal732@gmail.com



🙏 Acknowledgments

Socket.IO team for the real-time engine
MongoDB team for the database
React team for the frontend framework
Tailwind CSS for the styling framework
Lucide for the icon library


⭐ Star this repo if you find it helpful!
