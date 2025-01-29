import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../../../utils/localStorage";

interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: loadFromLocalStorage("tasks") || [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.push(action.payload);
      saveToLocalStorage("tasks", state.items);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.items.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
        saveToLocalStorage("tasks", state.items);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
      saveToLocalStorage("tasks", state.items);
    },
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
