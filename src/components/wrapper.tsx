import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import FakeCard from './fake-card';
import Cards from './cards';

const Wrapper = () => {
  const notes = useSelector((state: RootState) => state.todoReducer.notes);

  return (
    <>
      {!notes.length ? (
        <div className="d-flex" style={{ gap: '1.3rem', flexWrap: 'wrap' }}>
          <FakeCard />
          <FakeCard />
          <FakeCard />
          <FakeCard />
          <FakeCard />
        </div>
      ) : (
        <Cards />
      )}
    </>
  );
};

export default Wrapper;
