
import { createSlice } from "@reduxjs/toolkit"


let initialState = {
  fetching :  null,
  error : null
}

const messageSlice = createSlice({
  name :"message",
  initialState,
  reducers:{
    fetchStart :(state)=>{
      state.fetching =  true
    },
    fetchFailed :(state)=>{
      state.fetching =  false
      state.error = true
    },
    fetchSuccess :(state)=>{
      state.fetching =  false
    }
  }

})


export const { fetchFailed , fetchStart ,fetchSuccess} = messageSlice.actions;
export default messageSlice.reducer; 