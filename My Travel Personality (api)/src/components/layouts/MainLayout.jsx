import { Outlet } from 'react-router-dom';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import GradientBlobs from '../animations/GradientBlobs';

export default function MainLayout() {
  return (
    <div className="relative min-h-screen bg-navy-900 overflow-hidden">
      <GradientBlobs />
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
