import { createSlice } from "@reduxjs/toolkit";

const initialValue={
    isCompose:false
}

const ComposeSlice = createSlice({
    name: 'ComposeCheck',
    initialState: initialValue,
    reducers:{
        toggleCompose(state){
            state.isCompose= !state.isCompose;
        }
    }
})

export const composeActions = ComposeSlice.actions;

export default ComposeSlice.reducer;