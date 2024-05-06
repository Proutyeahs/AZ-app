import React, { useEffect, useState } from "react";
import { worldGridInit, selectGrid, selectTiles } from "../../slices/afternoonZoologistSlice";

import { useAppDispatch, useAppSelector } from "../../app/store";
import { useGetTilesQuery } from "../../slices/afternoonZoologist.service";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Path } from "./Path";
import { WorldGrid } from "../../resources/types";

export const World: React.FC = () => {
  useGetTilesQuery();

  const dispatch = useAppDispatch();
  const screenWidth = Dimensions.get('window').width;
  const tiles = useAppSelector(selectTiles);
  const worldGrid = useAppSelector(selectGrid);
  const [chosenTile, setChosenTile] = useState<WorldGrid>({ x: 5, y: 5, tile: { ID: 0, landscape: '', description: '', accessible: false }});
  const tileSize = 30;

  useEffect(() => {
    dispatch(worldGridInit());
  }, [tiles]);

  const setTileGold = (x: number, y: number) => {
    return (x === 5 && y === 5) || (x === chosenTile.x && y === chosenTile.y) ? 'gold' : 'transparent';
  }

  return (
    <View 
      style={{
        width: screenWidth,
        marginTop: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          position: 'relative',
          borderWidth: 0.5,
          borderColor: 'black',
        }}
      >
        {worldGrid.map((row, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: 'row' }}>
            {row.map((cell, cellIndex) => (
              <TouchableOpacity 
                key={cellIndex}
                style={{
                  width: tileSize,
                  height: tileSize,
                  borderWidth: 0.5,
                  borderColor: 'black',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: setTileGold(cell.x, cell.y),
                }}
                onPress={() => setChosenTile({ x: cellIndex, y: rowIndex, tile: cell.tile })}
              >
                <Text>{cell.tile?.landscape[0]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))} 
        {Path(tileSize, chosenTile)}
      </View>
    </View>
  );
};
