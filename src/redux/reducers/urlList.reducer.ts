import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Url } from "../../interfaces";

export interface UrlListState {
    urls: Url[];
  }

  const initialState: UrlListState = {
    urls: JSON.parse(localStorage.getItem("urls") as string) ? JSON.parse(localStorage.getItem("urls") as string)  : [],
  };
  
  const urlListSlice = createSlice({
    name: 'urlList',
    initialState,
    reducers: {
      addUrl: (state, action: PayloadAction<Url>) => {
        state.urls = [...state.urls, {...action.payload}];
      },
      updateUrls: (state, action: PayloadAction<Url[]>) => { 
        state.urls = [...action.payload]
      }
    },
  });

export const {addUrl, updateUrls} = urlListSlice.actions;
export default urlListSlice.reducer;

