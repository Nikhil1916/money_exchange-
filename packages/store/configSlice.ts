import { createSlice } from "@reduxjs/toolkit";
const configSlice = createSlice({
    name:'config',
    initialState: {
        notify:""
    },
    reducers:{
        sendNotification:(state,action)=>{
            state.notify = action.payload;
        },
    }
});

export default configSlice.reducer;
export const {sendNotification} = configSlice.actions;