import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Tags from './tags';
import Create from './create';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Wrapper from './wrapper';

const Main = () => {
  const location = useLocation();
  const all = useSelector((state: RootState) => state.todoReducer);
  console.log(all);
  return (
    <>
      {location.pathname === '/' && <Tags />}
      <main className="container">
        <Routes>
          <Route path="/" element={<Wrapper />} />
          <Route path="/create" element={<Create />} />
          <Route path="*" element={null} />
        </Routes>
      </main>
    </>
  );
};

export default Main;
