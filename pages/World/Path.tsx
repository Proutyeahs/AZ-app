import React, { useEffect } from "react";
import { View } from "react-native";
import { WorldGrid } from "../../resources/types";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { calculatePath } from "../../slices/afternoonZoologistSlice";
import { selectPath } from "../../slices/afternoonZoologistSlice";

export const Path = (tileSize: number, chosenTile: WorldGrid) => {
    const dispatch = useAppDispatch();
    const selectedPath: WorldGrid[] = useAppSelector(selectPath);

    useEffect(() => {
        dispatch(calculatePath(chosenTile));
    }, [chosenTile]);

    if (selectedPath) {
        const path = selectedPath as WorldGrid[];
        const lines = [];

        for (let i = 1; i < path.length; i++) {
            const current = path[i - 1];
            const next = path[i];

            const startX = current.x * tileSize + tileSize / 2;
            const startY = current.y * tileSize + tileSize / 2;
            const endX = next.x * tileSize + tileSize / 2;
            const endY = next.y * tileSize + tileSize / 2;

            const width = Math.abs(endX - startX);
            const height = Math.abs(endY - startY);

            // horizontal line
            if (startY === endY) {
                lines.push(
                    <View
                        key={`line-${i}`}
                        style={{
                            position: 'absolute',
                            left: Math.min(startX, endX),
                            top: startY - 1,
                            width: width,
                            height: 2,
                            backgroundColor: 'transparent',
                            borderBottomWidth: 2,
                            borderColor: 'red',
                            borderStyle: 'dashed',
                            zIndex: 10
                        }}
                    />
                );
            }

            // vertical line
            else if (startX === endX) {
                lines.push(
                    <View
                        key={`line-${i}`}
                        style={{
                            position: 'absolute',
                            left: startX - 1,
                            top: Math.min(startY, endY),
                            width: 2,
                            height: height,
                            backgroundColor: 'transparent',
                            borderLeftWidth: 2,
                            borderColor: 'red',
                            borderStyle: 'dashed',
                            zIndex: 10
                        }}
                    />
                );
            }

            // diagonal line
            else {
                const centerX = (startX + endX) / 2;
                const centerY = (startY + endY) / 2;

                lines.push(
                    <View
                        key={`line-${i}`}
                        style={{
                            position: 'absolute',
                            left: centerX - width / 2,
                            top: centerY - 1,
                            width: width,
                            height: 2,
                            backgroundColor: 'transparent',
                            borderBottomWidth: 2,
                            borderColor: 'red',
                            borderStyle: 'dashed',
                            transform: [
                                { rotateZ: `${Math.atan2(endY - startY, endX - startX)}rad` }
                            ],
                            zIndex: 10
                        }}
                    />
                );
            }
        }
        return lines;
    }
    return null;
};
