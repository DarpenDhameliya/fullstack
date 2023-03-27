import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const SellSlice = createAsyncThunk(
    "SellSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      try {
        const response = await axios({
          method: "get",
          url: `http://localhost:4000/api/party/list`,
          headers:{
            Authorization: `${localStorage.getItem("nodeuser")}`
          },
        });
        let data = await response.data;
          return data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

export const Sellslice = createSlice({
  name: "Sellslice",
  initialState,

  reducers: {
    Sellslicestatus:(state) => {
      state.status = 'idle'
    },
    
  },
  extraReducers(builder) {
    builder
      .addCase(SellSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(SellSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload.result
        state.error = []
      })
      .addCase(SellSlice.rejected, (state, action) => {
        state.status = "failed";
        state.response = []
        state.error = action.payload.response.data;
      });
    },
  });
  
export const { Sellslicestatus } = Sellslice.actions;

export const Sellslicestate = (state) => state.sellslice;

export default Sellslice.reducer;