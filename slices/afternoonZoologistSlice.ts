import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../app/store';
import { afternoonZoologistApi } from './afternoonZoologist.service';

export type Tile = {
    ID: number,
    landscape: string,
    description: string,
    accessible: boolean,
}

export type AfternoonZoologistState = {
    tiles : Tile[]
};

const initialState: AfternoonZoologistState = {
    tiles : []
};

export const afternoonZoologistSlice = createSlice({
    name: 'afternoonZoologist',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                afternoonZoologistApi.endpoints.getTiles.matchFulfilled,
                (state, action: PayloadAction<Tile[]>) => {
                    state.tiles = action.payload;
                }
            )
    }
});

export const {  } = afternoonZoologistSlice.actions;

export const selectTiles = (state: RootState) => state.afternoonZoologist.tiles;
