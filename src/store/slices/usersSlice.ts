import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../../../utils/localStorage";

interface UsersState {
  items: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  items: loadFromLocalStorage("users") || [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.items.push(action.payload);
      saveToLocalStorage("users", state.items);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.items.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
        saveToLocalStorage("users", state.items);
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((user) => user.id !== action.payload);
      saveToLocalStorage("users", state.items);
    },
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
