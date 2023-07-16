import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Note {
  id: number;
  title: string;
  content: string[];
  tags: string[];
  checked: boolean;
}

interface NotesState {
  notes: Note[];
  filteredNotes: Note[];
  tags: string[];
}

const initialState: NotesState = {
  notes: [],
  filteredNotes: [],
  tags: [],
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
      state.filteredNotes = state.notes;
    },
    removeNote: (state, action: PayloadAction<number>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.filteredNotes = state.filteredNotes.filter((note) => note.id !== action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload.id);
      state.notes[index] = action.payload;
      state.filteredNotes[index] = action.payload;
    },
    setFilterTag: (state, action: PayloadAction<string>) => {
      state.filteredNotes = state.notes.filter((note) => note.tags.includes(action.payload));
    },
    clearFilter: (state) => {
      state.filteredNotes.length = 0;
    },
    setChecked: (state, action: PayloadAction<number>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload);
      state.notes[index].checked = !state.notes[index].checked;
      state.filteredNotes[index].checked = !state.filteredNotes[index].checked;
    },
  },
});

export const { addNote, removeNote, updateNote, setFilterTag, setChecked, clearFilter } = notesSlice.actions;

export default notesSlice.reducer;
