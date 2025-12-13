import CustomNavbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import BackgroundShapes from "../Components/BackgroundShapes";

const ContactPage = () => {
  return (
    <>
      <BackgroundShapes />
      <CustomNavbar />
      <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '80vh' }}>
        <h1 style={{ color: '#007bff', marginBottom: '20px' }}>Contact Us</h1>
        <p style={{ fontSize: '1.2rem', color: '#6c757d', maxWidth: '600px', margin: '0 auto' }}>
          Get in touch with us for your digital marketing needs. We're here to help you grow your business online.
        </p>
        <div style={{ marginTop: '40px' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
            <strong>Email:</strong> contact@virtualwave.com
          </p>
          <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
            <strong>Phone:</strong> +1 (555) 123-4567
          </p>
          <p style={{ fontSize: '1.1rem' }}>
            <strong>Address:</strong> 123 Digital Street, Tech City, TC 12345
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;