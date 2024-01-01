import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface BlockNumberInterface {
  value: number;
}

export const blockNumberSlice = createSlice({
  name: "blockNumber",
  initialState: {
    value: 0,
  } as BlockNumberInterface,
  reducers: {
    updateBlockNumber: (
      state: BlockNumberInterface,
      action: PayloadAction<number>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { updateBlockNumber } = blockNumberSlice.actions;
export default blockNumberSlice.reducer;
