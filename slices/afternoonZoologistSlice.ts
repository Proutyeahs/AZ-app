import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../app/store';
import { afternoonZoologistApi } from './afternoonZoologist.service';
import { WorldGrid, Tile } from '../resources/types';
import { getRandomTile } from '../resources/utilities';

export type AfternoonZoologistState = {
    tiles : Tile[];
    worldGrid: WorldGrid[][];
};

const initialState: AfternoonZoologistState = {
    tiles : [],
    worldGrid: []
};

export const afternoonZoologistSlice = createSlice({
    name: 'afternoonZoologist',
    initialState,
    reducers: {
        worldGridInit: (state) => {
            const centerTile: Tile = getRandomTile(state.tiles);
            const updatedGrid: WorldGrid[][] = [];

            for (let y = 0; y < 11; y++) {
                const row: WorldGrid[] = [];
                for (let x = 0; x < 11; x++) {
                    let tile: Tile;
                    if (x === 6 && y === 6) {
                        tile = centerTile;
                    } else {
                        if (Math.random() < 0.9) {
                            tile = centerTile;
                        } else {
                            tile = getRandomTile(state.tiles);
                        }
                    }
                    row.push({ x, y, tile });
                }
                updatedGrid.push(row);
            }
            state.worldGrid = updatedGrid;
        }
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

export const { 
    worldGridInit
 } = afternoonZoologistSlice.actions;

export const selectTiles = (state: RootState) => state.afternoonZoologist.tiles;
export const selectGrid = (state: RootState) => state.afternoonZoologist.worldGrid;
