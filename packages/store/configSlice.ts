import { createSlice, current } from "@reduxjs/toolkit";
const initialState = {
    notify:""
};
const configSlice = createSlice({
    name:'config',
    initialState,
    reducers:{
        sendNotification:(state,action)=>{
            console.log(action.payload);
            state.notify = action.payload;
            console.log(current(state));
            return {...state};
        },
        resetState: () => {
            console.log("okokkokok");
            return initialState; // This will reset the state slice to its initial state
        },
    }
});

export default configSlice.reducer;
export const {sendNotification,resetState} = configSlice.actions;