import Navbar from '../../../components/js/navbar';
import Siderbar from '../../../components/js/siderbar';
import EpisodeList from './js/EpisodeList'

function UpdateEpisodeList() {
  return (
    <>
        <Navbar></Navbar>
        <Siderbar></Siderbar>
        <EpisodeList></EpisodeList>
    </>
  );
}

export default UpdateEpisodeList;
