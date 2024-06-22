import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Haikus } from "../model/haikus";

export interface HaikuState {
  value: Haikus;
  allHaikusCount: number;
  loading: boolean;
  errorMessage: string | undefined;
}
const haikuState: HaikuState = {
  value: {
    haikus: [],
  },
  allHaikusCount: 0,
  loading: false,
  errorMessage: undefined,
};
export const haikuSlice = createSlice({
  name: "haikuState",
  initialState: haikuState,
  reducers: {
    swapHaikus: (state, action: PayloadAction<Haikus>) => {
      if (action.payload.haikus === undefined) return;
      state.value.haikus = action.payload.haikus;
    },
    setAllHaikusCount: (state, action: PayloadAction<number>) => {
      state.allHaikusCount = action.payload;
    },
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { swapHaikus, isLoading, setAllHaikusCount } = haikuSlice.actions;
export default haikuSlice.reducer;
