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
    likeHaiku: (state, action: PayloadAction<number>) => {
      const target_index = state.value.haikus.findIndex(
        (h) => h.id === action.payload
      );

      state.value.haikus[target_index].likesCount =
        state.value.haikus[target_index].likesCount + 1;
    },
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { swapHaikus, isLoading, setAllHaikusCount, likeHaiku } =
  haikuSlice.actions;
export default haikuSlice.reducer;
