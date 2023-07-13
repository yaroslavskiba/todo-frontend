import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Tags from './tags';
import Create from './create';

const Main = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/create' && <Tags />}
      <main className="container">
        <Routes>
          <Route path="/" element={null} />
          <Route path="/create" element={<Create />} />
          <Route path="*" element={null} />
        </Routes>
      </main>
    </>
  );
};

export default Main;
