import {configureStore } from '@reduxjs/toolkit'

import ComposeReducers from "./ComposeToggle";
import InboxReducer from "./InboxToggle";

const store = configureStore({
    reducer:{
        compose:ComposeReducers,
        isInbox:InboxReducer
    },
});

export default store;