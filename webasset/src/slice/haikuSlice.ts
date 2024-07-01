import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Haiku, Haikus } from "../model/haikus";

export interface HaikuState {
  value: Haikus;
  backupHaikus: Haikus;
  allHaikusCount: number;
  loading: boolean;
  errorMessage: string | undefined;
}
const haikuState: HaikuState = {
  value: {
    haikus: [],
  },
  backupHaikus: {
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
    addHaiku: (state, action: PayloadAction<Haiku>) => {
      console.log("add haiku!!");
      console.log(action.payload);
      state.value.haikus = [...state.value.haikus, action.payload];
    },
    sortHaikuByPriority: (state, _: PayloadAction) => {
      state.value.haikus = state.value.haikus.sort((a, b) => {
        return b.likesCount - a.likesCount;
      });
    },
    doneHaiku: (state, action: PayloadAction<number>) => {
      state.value.haikus = state.value.haikus.filter((h) => {
        return h.id !== action.payload;
      });
    },
    backupHaiku: (state, action: PayloadAction<Haiku>) => {
      state.backupHaikus.haikus = [
        ...state.backupHaikus.haikus,
        action.payload,
      ];
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

export const {
  swapHaikus,
  isLoading,
  setAllHaikusCount,
  likeHaiku,
  doneHaiku,
  backupHaiku,
  addHaiku,
  sortHaikuByPriority,
} = haikuSlice.actions;
export default haikuSlice.reducer;
