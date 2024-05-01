import React from "react";
import { Tile, selectTiles } from "../slices/afternoonZoologistSlice";

import { useAppSelector } from "../app/store";
import { useGetTilesQuery } from "../slices/afternoonZoologist.service";


export const World: React.FC = () => {
    const tiles = useAppSelector(selectTiles);

    useGetTilesQuery();

    return (
        <div>
            <h1>AZ-app start</h1>
            {/* placeholder list */}
            <ul>
                {tiles.map((tile: Tile) => (
                    <li key={tile.ID}>
                        <div>{tile.landscape}</div>
                        <div>{tile.description}</div>
                        <div>{tile.accessible ? "accessible" : "inaccessible"}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
