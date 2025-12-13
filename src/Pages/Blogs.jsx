import CustomNavbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import BackgroundShapes from "../Components/BackgroundShapes";

const BlogsPage = () => {
  return (
    <>
      <BackgroundShapes />
      <CustomNavbar />
      <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '80vh' }}>
        <h1 style={{ color: '#007bff', marginBottom: '20px' }}>Our Blog</h1>
        <p style={{ fontSize: '1.2rem', color: '#6c757d', maxWidth: '600px', margin: '0 auto' }}>
          Stay updated with the latest trends in digital marketing, technology, and business growth strategies.
        </p>
        <div style={{ marginTop: '40px' }}>
          <p style={{ fontSize: '1.1rem', color: '#6c757d' }}>
            Blog posts coming soon! Check back for valuable insights and tips.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogsPage;