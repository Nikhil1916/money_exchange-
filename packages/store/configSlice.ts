import { createSlice } from "@reduxjs/toolkit";
const configSlice = createSlice({
    name:'config',
    initialState: {
        notify:""
    },
    reducers:{
        sendNotification:(state,action)=>{
            console.log(action.payload);
            state.notify = action.payload;
            return state;
        },
        resetState: () => {
            return undefined; // This will reset the state slice to its initial state
        },
    }
});

export default configSlice.reducer;
export const {sendNotification,resetState} = configSlice.actions;