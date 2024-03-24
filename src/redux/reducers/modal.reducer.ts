import { createSlice } from "@reduxjs/toolkit";

const modalReducer = createSlice({
    name: 'modal',
    initialState: {
        isDeleteSingleOpen: false,
        isDeleteMultiOpen: false,
        isAddMultiOpen: false,
        isOpenMultiOpen: false,
        deleteSingleIndex: 0
    },
    reducers: {
        //AddMulti
        openAddMultiModal: (state, action) => { 
            state.isAddMultiOpen = action.payload;
        },
        closeAddMultiModal: (state, action) => { 
            state.isAddMultiOpen = action.payload
        },

        //DeleteSingle
        openDeleteSingleModal: (state, action) => { 
            state.isDeleteSingleOpen = action.payload.bool;
            state.deleteSingleIndex = action.payload.index;
        },
        closeDeleteSingleModal: (state, action) => { 
            state.isDeleteSingleOpen = action.payload;
            state.deleteSingleIndex = 0;
        },

        //DeleteMulti
        openDeleteMultiModal: (state, action) => { 
            state.isDeleteMultiOpen = action.payload;
        },
        closeDeleteMultiModal: (state, action) => { 
            state.isDeleteMultiOpen = action.payload;
        },

        //openMultiModal
        openOpenMultiModal: (state, action) => { 
        state.isOpenMultiOpen = action.payload;
        },
        closeOpenMultiModal: (state, action) => { 
        state.isOpenMultiOpen = action.payload;
        }
    }
})

export const {
    openAddMultiModal,
    closeAddMultiModal, 
    openDeleteSingleModal, 
    closeDeleteSingleModal,
    openDeleteMultiModal, 
    closeDeleteMultiModal,
    openOpenMultiModal,
    closeOpenMultiModal
} = modalReducer.actions;
export default modalReducer.reducer;