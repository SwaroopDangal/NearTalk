import { io } from "socket.io-client";

const API_URl = import.meta.env.VITE_BACKEND_URL;
console.log(API_URl);

const socket = io(API_URl, {
  withCredentials: true,
  autoConnect: false, // 🔑 VERY IMPORTANT
});

export default socket;
