import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  axios  from "../../commonLink/Axios";
const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const PdfSlice = createAsyncThunk(
    "PdfSlice",
    async (payload, thunkAPI) => {
      console.log('add enter',payload)
      try {
        const response = await axios({
          method: "post",
          data:payload,
          // url: `party/pdffile`,
          // url: `party/excelfile`,
          url: `party/txtfile`,
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

export const Pdfslice = createSlice({
  name: "Pdfslice",
  initialState,

  reducers: {
    Pdfstatus:(state) => {
      state.status = 'idle'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(PdfSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(PdfSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload.result
        state.error = []
      })
      .addCase(PdfSlice.rejected, (state, action) => {
        state.status = "failed";
        state.response = []
        state.error = action.payload.response.data;
      });
    },
  });

export const { Pdfstatus } = Pdfslice.actions;

export const Pdfstate = (state) => state.pdf;

export default Pdfslice.reducer;