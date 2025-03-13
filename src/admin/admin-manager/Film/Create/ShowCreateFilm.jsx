import Navbar from '../../components/js/navbar';
import Siderbar from '../../components/js/siderbar';
import CreateFilm from './js/CreateFilm'

function ShowCreateFilm() {
  return (
    <>
        <Navbar></Navbar>
        <Siderbar></Siderbar>
        <CreateFilm></CreateFilm>
    </>
  );
}

export default ShowCreateFilm;
