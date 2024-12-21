import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
     {children}
      <Footer />
    </>
  );
}
