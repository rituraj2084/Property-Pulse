import '@/assets/styles/globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
export const metadata = {
  title: 'PropertyPulse',
  keywords: 'rental, property, real-estate',
  description: 'Find the perfect rental property',
};
const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
