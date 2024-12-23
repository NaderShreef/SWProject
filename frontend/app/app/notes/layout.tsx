import Footer from "@/app/components/Footer";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
     {children}
      <Footer />
    </>
  );
}