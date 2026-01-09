import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import { Toaster } from "react-hot-toast";
import Creategroup from "./pages/CreateGroup";
import NearByGroups from "./pages/NearByGroups";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/createGroup" element={<Creategroup />} />
        <Route path="/nearbyGroups" element={<NearByGroups />} />
        <Route path="/group/:id" element={<ChatPage />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
