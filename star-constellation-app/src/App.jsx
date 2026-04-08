import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Constellation from "./pages/Constellation";
import About from "./pages/About";
import ForYou from "./pages/ForYou";
import Blog from "./pages/Blog";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

import StarBackground from "./components/StarBackground";
import ShootingStars from "./components/ShootingStars";

export default function App() {
  return (
    <>
      <StarBackground />
      <ShootingStars />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/constellation/:name" element={<Constellation />} />
        <Route path="/about" element={<About />} />
        <Route path="/for-you" element={<ForYou />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}
