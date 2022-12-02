import {configureStore } from '@reduxjs/toolkit'
import MailItemReducer from "./InboxToggle";
import AuthReducers from "./auth";
import ComposeReducers from "./ComposeToggle";
import InboxReducer from "./InboxToggle";

const store = configureStore({
    reducer:{
        compose:ComposeReducers,
        isInbox:InboxReducer,
        milItem:MailItemReducer,
        auth:AuthReducers
    },
});

export default store;