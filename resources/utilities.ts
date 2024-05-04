import { Tile } from './types';

export const getRandomTile = (tiles: Tile[]): Tile => {
    const randomIndex = Math.floor(Math.random() * tiles.length);
    return tiles[randomIndex];
};