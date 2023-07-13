import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
}

interface NotesState {
  notes: Note[];
  tags: string[];
  filterTag: string | null;
}

const initialState: NotesState = {
  notes: [],
  tags: [],
  filterTag: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
      action.payload.tags.forEach((tag) => {
        if (!state.tags.includes(tag)) {
          state.tags.push(tag);
        }
      });
    },
    removeNote: (state, action: PayloadAction<number>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload.id);
      state.notes[index] = action.payload;
    },
    setFilterTag: (state, action: PayloadAction<string | null>) => {
      state.filterTag = action.payload;
    },
  },
});

export const { addNote, removeNote, updateNote, setFilterTag } = notesSlice.actions;

export default notesSlice.reducer;
