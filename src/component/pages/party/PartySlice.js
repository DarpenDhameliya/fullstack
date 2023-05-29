import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  axios  from "../../commonLink/Axios";
const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const PartySlice = createAsyncThunk(
    "PartySlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      try {
        const response = await axios({
          method: "post",
          data:payload,
          url: `party/add`,
          headers:{
            "Content-Type": "multipart/form-data application/json",
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

export const Partyslice = createSlice({
  name: "Partyslice",
  initialState,

  reducers: {
    Partyslicestatus:(state) => {
      state.status = 'idle'
    },
    
  },
  extraReducers(builder) {
    builder
      .addCase(PartySlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(PartySlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload.result
        state.error = []
      })
      .addCase(PartySlice.rejected, (state, action) => {
        state.status = "failed";
        state.response = []
        state.error = action.payload.response.data;
      });
    },
  });
  
export const { Partyslicestatus } = Partyslice.actions;

export const Partyslicestate = (state) => state.party;

export default Partyslice.reducer;