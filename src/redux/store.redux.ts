import modalReducer from "./reducers/modal.reducer";
import urlListReducer from "./reducers/urlList.reducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        urlList: urlListReducer,
        modal: modalReducer,
    },
})


export default store
