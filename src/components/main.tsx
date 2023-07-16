import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Tags from './tags';
import Create from './create';
import Wrapper from './wrapper';
import EditNote from './edit';
import { useAppSelector } from '../app/hooks';

const Main = () => {
  const location = useLocation();
  const { id, title, content, tags } = useAppSelector(({ todoReducer }) => todoReducer.currentNote) ?? {
    id: 0,
    title: '',
    content: [],
    tags: [],
  };

  return (
    <>
      {location.pathname === '/' && <Tags />}
      <main className="container">
        <Routes>
          <Route path="/" element={<Wrapper />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit" element={<EditNote {...{ id, title, content, tags }} />} />
          <Route path="*" element={null} />
        </Routes>
      </main>
    </>
  );
};

export default Main;
