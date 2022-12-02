import { createSlice } from "@reduxjs/toolkit";

const initialMailBody= { item:[], isClicked: false  }

const MailItemSlice = createSlice({
    name: 'MailItemBody',
    initialState: initialMailBody,
    reducers: {
        addNewItem(state, action){
            state.item = action.payload;
        },
        setClicked(state, action){
            state.isClicked=action.payload;
        }
    }
})

export const MailItemActions = MailItemSlice.actions;

export default MailItemSlice.reducer;