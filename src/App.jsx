import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import SeeMore from './pages/SeeMoreProduct/SeeMore';
import ProducrtDetels from './components/product-details/ProductDetails';
import Admin from './admin/Admins';
import CreateUser from './admin/admin-manager/User/CreateUser';
import ShowListUser from './admin/admin-manager/User/ShowListUser';
import ShowDashboard from './admin/components/ShowDashboard';
import ShowUpdateUser from './admin/admin-manager/User/ShowUpdateUser';
import ShowListFilm from './admin/admin-manager/Film/Show/ShowListFilm';
import ShowUpdateFilm from './admin/admin-manager/Film/Update/ShowUpdateFilm';
import UpdateEpisodeList from './admin/admin-manager/Film/Update/UpdateEpisodeList';
import UpdateReview from './admin/admin-manager/Film/Update/UpdateReview';
// import CreateFilm from './admin/admin-manager/Film/Create/js/CreateFilm';


function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/seemore" element={<SeeMore />} />
            <Route path="/videos" element={<ProducrtDetels />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/createuser" element={<CreateUser />} />
            <Route path="/admin/listuser" element={<ShowListUser />} />
            <Route path="/admin/update-user" element={<ShowUpdateUser />} />
            <Route path="/admin/dasboard" element={<ShowDashboard />} />
            <Route path="/admin/listfilm" element={<ShowListFilm />} />
            <Route path="/admin/update-Film" element={<ShowUpdateFilm />} />
            <Route path="/admin/update-Film/update-episode-list" element={<UpdateEpisodeList />} />
            <Route path="/admin/update-Film/update-review" element={<UpdateReview />} />
            {/* <Route path="/admin/Create-Film/" element={<CreateFilm />} /> */}
        </Routes>
    </Router>
  );
}

export default App;
