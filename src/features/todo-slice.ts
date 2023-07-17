import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type content = {
  contentInput: string;
  checked: boolean;
};

export interface Note {
  id: number;
  title: string;
  content: content[];
  tags: string[];
}

interface NotesState {
  notes: Note[];
  filteredNotes: Note[];
  tags: string[];
  currentNote: Note | null;
}

const initialState: NotesState = {
  notes: [],
  filteredNotes: [],
  tags: [],
  currentNote: null,
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
      const noteIndex = state.notes.findIndex((note) => note.id === action.payload);
      if (noteIndex !== -1) {
        const removedNoteTags = state.notes[noteIndex].tags;
        state.notes.splice(noteIndex, 1);
        state.filteredNotes = state.filteredNotes.filter((note) => note.id !== action.payload);
        removedNoteTags.forEach((tag) => {
          if (!state.notes.some((note) => note.tags.includes(tag))) {
            state.tags = state.tags.filter((t) => t !== tag);
          }
        });
      }
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
    setChecked: (state, action: PayloadAction<{ noteIndex: number; contentIndex: number }>) => {
      const { noteIndex, contentIndex } = action.payload;
      state.notes[noteIndex].content[contentIndex].checked = !state.notes[noteIndex].content[contentIndex].checked;
      if (state.filteredNotes.length) {
        state.filteredNotes[noteIndex].content[contentIndex].checked =
          !state.filteredNotes[noteIndex].content[contentIndex].checked;
      }
    },
    editCurrentElement: (state, action: PayloadAction<Note>) => {
      state.currentNote = action.payload;
    },
  },
});

export const { addNote, removeNote, updateNote, setFilterTag, setChecked, clearFilter, editCurrentElement } =
  notesSlice.actions;

export default notesSlice.reducer;
