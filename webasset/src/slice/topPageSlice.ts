import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Haiku, Haikus } from "../model/haikus";

export interface TopPageState {
  value: Haikus;
  after: number;
  loading: boolean;
  errorMessage: string | undefined;
}
const initialState: TopPageState = {
  value: {
    haikus: [],
  },
  after: 0,
  loading: false,
  errorMessage: undefined,
};
export const topPageSlice = createSlice({
  name: "topPage",
  initialState: initialState,
  reducers: {
    addLetter: (state, action: PayloadAction<Haiku>) => {
      const haiku = action.payload;
      state.value.haikus.push(haiku);
    },
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // likeLetter: (state, action: PayloadAction<string>) => {
    //   const id = action.payload;
    //   state.value.haikus.map((it) => {
    //     if (it.id == id) {
    //       it.likesCount = it.likesCount++;
    //       console.log(it.likesCount++);
    //     }
    //   });
    // },
  },
});

export const { addLetter, isLoading } = topPageSlice.actions;
export default topPageSlice.reducer;
