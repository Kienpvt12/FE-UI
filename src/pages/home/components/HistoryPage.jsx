import React, { useEffect, useState } from 'react';
import { useGetMoviesMutation } from '../../../apis/movieApi.js';
import Navbar from '../../../components/js/navbar.jsx';
import Footer from '../../../components/js/footer.jsx';
import Slider from './js/slider.jsx';
import Siderbar from './js/siderbar.jsx';
import History from './js/history.jsx';

function HistoryPage() {
  return (
    <>
      <Navbar></Navbar>
      <div className="all-content container mt-4">
        <div className="row">
          <div className="row-left col-lg-8">
            <Slider />
            <History />
          </div>
          <div className="row-right all-sidebar col-lg-3">
            <Siderbar />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default HistoryPage;
