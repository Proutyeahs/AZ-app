import React, { useEffect } from "react";
import { worldGridInit, selectGrid, selectTiles, setDestination, selectDestination, shiftGrid, selectPath } from "../../slices/afternoonZoologistSlice";

import { useAppDispatch, useAppSelector } from "../../app/store";
import { useGetTilesQuery } from "../../slices/afternoonZoologist.service";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Path } from "./Path";

export const World: React.FC = () => {
  useGetTilesQuery();

  const dispatch = useAppDispatch();
  const screenWidth = Dimensions.get('window').width;
  const tiles = useAppSelector(selectTiles);
  const worldGrid = useAppSelector(selectGrid);
  const destination = useAppSelector(selectDestination);
  const path = useAppSelector(selectPath);
  const tileSize = 30;

  useEffect(() => {
    dispatch(worldGridInit());
  }, [tiles]);

  useEffect(() => {
    if (path.length > 1 && path[1].tile.accessible) {
      const dx = path[1].x - 5;
      const dy = path[1].y - 5;

      const interval = setInterval(() => {
        dispatch(shiftGrid({ dx, dy }));
      }, 2000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [path]);

  const setTileGold = (x: number, y: number) => {
    if (x === 5 && y === 5) {
      return 'gold';
    } else if (x === destination.x && y === destination.y && destination.tile.accessible) {
      return 'gold';
    } else if (
      x === destination.x && y === destination.y && !destination.tile.accessible ||
      path[1]?.tile.accessible === false && x === path[1].x && y === path[1].y
    ) {
      return 'red';
    } else {
      return 'transparent';
    }
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
                onPress={() => dispatch(setDestination({ x: cellIndex, y: rowIndex, tile: cell.tile }))}
              >
                <Text>{cell.tile?.landscape[0]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        {Path(tileSize, destination)}
      </View>
    </View>
  );
};
