import {configureStore } from '@reduxjs/toolkit'
import MailItemReducer from "./InboxToggle";
import ComposeReducers from "./ComposeToggle";
import InboxReducer from "./InboxToggle";

const store = configureStore({
    reducer:{
        compose:ComposeReducers,
        isInbox:InboxReducer,
        milItem:MailItemReducer,
    },
});

export default store;