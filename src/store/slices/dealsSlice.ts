import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Deal } from "../../types";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../../../utils/localStorage";

interface DealsState {
  items: Deal[];
  loading: boolean;
  error: string | null;
}

const initialState: DealsState = {
  items: loadFromLocalStorage("deals") || [],
  loading: false,
  error: null,
};

const dealsSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    addDeal: (state, action: PayloadAction<Deal>) => {
      state.items.push(action.payload);
      saveToLocalStorage("deals", state.items);
    },
    updateDeal: (state, action: PayloadAction<Deal>) => {
      const index = state.items.findIndex(
        (deal) => deal.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
        saveToLocalStorage("deals", state.items);
      }
    },
    deleteDeal: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((deal) => deal.id !== action.payload);
      saveToLocalStorage("deals", state.items);
    },
  },
});

export const { addDeal, updateDeal, deleteDeal } = dealsSlice.actions;
export default dealsSlice.reducer;
