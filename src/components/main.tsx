import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Tags from './tags';
import Create from './create';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const Main = () => {
  const location = useLocation();
  const all = useSelector((state: RootState) => state.todoReducer);
  console.log(all);
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
