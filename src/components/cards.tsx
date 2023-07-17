import React from 'react';
import { RootState } from '../app/store';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Note, editCurrentElement, removeNote, setChecked, setFilterTag } from '../features/todo-slice';
import { useNavigate } from 'react-router-dom';
import NoteCard from './note-card';

const Cards = () => {
  const notes = useAppSelector((state: RootState) => state.todoReducer.notes);
  const filteredNotes = useAppSelector((state: RootState) => state.todoReducer.filteredNotes);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEdit = (note: Note) => {
    dispatch(editCurrentElement(note));
    navigate('/edit');
  };

  const handleDelete = (id: number) => {
    dispatch(removeNote(id));
  };

  const handleFilterTag = (tag: string) => {
    dispatch(setFilterTag(tag));
  };

  const handleChecked = (noteIndex: number, contentIndex: number) => {
    dispatch(setChecked({ noteIndex, contentIndex }));
  };

  return (
    <div className="d-flex" style={{ gap: '1.3rem', flexWrap: 'wrap' }}>
      {filteredNotes.length
        ? filteredNotes.map((note, noteIndex) => (
            <div key={note.id}>
              <NoteCard
                note={note}
                onChecked={handleChecked}
                onEdit={handleEdit}
                onFilterTag={handleFilterTag}
                noteIndex={noteIndex}
                handleDelete={handleDelete}
              />
            </div>
          ))
        : notes.map((note, noteIndex) => (
            <div key={note.id}>
              <NoteCard
                note={note}
                onChecked={handleChecked}
                onEdit={handleEdit}
                onFilterTag={handleFilterTag}
                noteIndex={noteIndex}
                handleDelete={handleDelete}
              />
            </div>
          ))}
    </div>
  );
};

export default Cards;
