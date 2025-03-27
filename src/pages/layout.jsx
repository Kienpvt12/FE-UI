import Navbar from '../components/js/navbar';
import Footer from '../components/js/footer';

function Layout({ children }) {
  return (
    <>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </>
  );
}

export default Layout;
