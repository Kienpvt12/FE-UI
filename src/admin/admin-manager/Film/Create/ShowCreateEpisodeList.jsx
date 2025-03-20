import Navbar from '../../../components/js/navbar';
import Siderbar from '../../../components/js/siderbar';
import CreateEpisodeList from './js/CreateEpisodeList'

function ShowCreateEpisodeList() {
  return (
    <>
        <Navbar></Navbar>
        <Siderbar></Siderbar>
        <CreateEpisodeList></CreateEpisodeList>
    </>
  );
}

export default ShowCreateEpisodeList;
