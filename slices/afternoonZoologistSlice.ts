import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../app/store';
import { afternoonZoologistApi } from './afternoonZoologist.service';
import { WorldGrid, Tile } from '../resources/types';
import { getRandomTile } from '../resources/utilities';

export type AfternoonZoologistState = {
    tiles: Tile[];
    worldGrid: WorldGrid[][];
    path: WorldGrid[];
    destination: WorldGrid;
};

const initialState: AfternoonZoologistState = {
    tiles: [],
    worldGrid: [],
    path: [],
    destination: { x: 5, y: 5, tile: { ID: 0, landscape: '', description: '', accessible: false } },
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
                    if (x === 5 && y === 5) {
                        tile = centerTile;
                    } else {
                        // update to get tiles based on surrounding tiles
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
        },
        setDestination: (state, action: PayloadAction<WorldGrid>) => {
            state.destination = action.payload;
        },
        calculatePath: (state, action: PayloadAction<WorldGrid>) => {
            const end = action.payload;
            const path: WorldGrid[] = [];
            const current = { x: 5, y: 5 };

            while (current.x !== end.x || current.y !== end.y) {
                path.push({ x: current.x, y: current.y, tile: state.worldGrid[current.y][current.x].tile });

                if (current.x !== end.x && current.y !== end.y) {
                    current.x += (end.x > current.x) ? 1 : -1;
                    current.y += (end.y > current.y) ? 1 : -1;
                } else if (current.x !== end.x) {
                    current.x += (end.x > current.x) ? 1 : -1;
                } else if (current.y !== end.y) {
                    current.y += (end.y > current.y) ? 1 : -1;
                }
            }
            path.push(end);
            state.path = path;
        },
        shiftGrid: (state, action: PayloadAction<{ dx: number; dy: number }>) => {
            const { dx, dy } = action.payload;
            const newGrid = Array.from({ length: 11 }, () => new Array(11).fill(null));

            for (let y = 0; y < 11; y++) {
                for (let x = 0; x < 11; x++) {
                    const newX = x + dx;
                    const newY = y + dy;

                    if (newX >= 0 && newX < 11 && newY >= 0 && newY < 11) {
                        newGrid[y][x] = state.worldGrid[newY][newX].tile;
                    } else {
                        // update to get tiles based on surrounding tiles
                        let randomTile;
                        if ((x === 0 && dx === -1) || (x === 10 && dx === 1) || (y === 0 && dy === -1) || (y === 10 && dy === 1)) {
                            randomTile = getRandomTile(state.tiles);
                        } else {
                            const adjY = y + (dy !== 0 ? dy : 0);
                            const adjX = x + (dx !== 0 ? dx : 0);
                            randomTile = state.worldGrid[adjY][adjX].tile;
                        }
                        newGrid[y][x] = randomTile;
                    }
                }
            }

            for (let y = 0; y < 11; y++) {
                for (let x = 0; x < 11; x++) {
                    state.worldGrid[y][x].tile = newGrid[y][x];
                }
            }

            const newDestinationX = state.destination.x - dx;
            const newDestinationY = state.destination.y - dy;

            state.destination = {
                ...state.destination,
                x: newDestinationX,
                y: newDestinationY,
                tile: state.worldGrid[newDestinationY][newDestinationX].tile
            };
        },
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
    worldGridInit,
    calculatePath,
    setDestination,
    shiftGrid,
} = afternoonZoologistSlice.actions;

export const selectTiles = (state: RootState) => state.afternoonZoologist.tiles;
export const selectGrid = (state: RootState) => state.afternoonZoologist.worldGrid;
export const selectPath = (state: RootState) => state.afternoonZoologist.path;
export const selectDestination = (state: RootState) => state.afternoonZoologist.destination;
