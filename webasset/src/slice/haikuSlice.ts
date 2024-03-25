import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Haikus } from "../model/haikus";

export interface HaikuState {
  value: Haikus;
  loading: boolean;
  errorMessage: string | undefined;
}
const haikuState: HaikuState = {
  value: {
    haikus: [],
  },
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
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { swapHaikus, isLoading } = haikuSlice.actions;
export default haikuSlice.reducer;
