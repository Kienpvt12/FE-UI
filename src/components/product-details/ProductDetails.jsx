import React from 'react';
import Navbar from '../js/navbar';
import Footer from '../js/footer';
import Content from './js/content';
import ErrorBoundary from '../ErrorBoundary';
import LoadingSpinner from '../LoadingSpinner';

function ProductDetails() {
  return (
    <ErrorBoundary>
      <Navbar />
      <Content />
      <Footer />
    </ErrorBoundary>
  );
}

export default ProductDetails;
