import { createSlice } from "@reduxjs/toolkit";
const balanceSlice = createSlice({
    name:'balance',
    initialState: 0,
    reducers:{
        updateBalance:(state,action)=>{
            state = action.payload;
            return state;
        }
    }
});

export default balanceSlice.reducer;
export const {updateBalance} = balanceSlice.actions;