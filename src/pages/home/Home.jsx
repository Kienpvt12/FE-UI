import Navbar from '../../components/js/navbar';
import Footer from '../../components/js/footer';
import Content from './components/js/content';
import './components/css/content.css';
import './components/css/product.css';
import './components/css/pagination.css';
import './components/css/slider.css';
import './components/css/siderbar.css';

function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Content></Content>
      <Footer></Footer>
    </>
  );
}

export default Home;
