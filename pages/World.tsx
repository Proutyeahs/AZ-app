import React, { useEffect, useState } from "react";
import { worldGridInit, selectGrid, selectTiles } from "../slices/afternoonZoologistSlice";

import { useAppDispatch, useAppSelector } from "../app/store";
import { useGetTilesQuery } from "../slices/afternoonZoologist.service";
import { Card } from "@mui/material";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";

export const World: React.FC = () => {
  useGetTilesQuery();

  const dispatch = useAppDispatch();
  const screenWidth = Dimensions.get('window').width;
  //const screenHeight = Dimensions.get('window').height;
  const tiles = useAppSelector(selectTiles);
  const worldGrid = useAppSelector(selectGrid);
  const [chosenTile, setChosenTile] = useState({ x: 6, y: 6,});

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
        //height: screenHeight,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        style={{
          outline: '.5px solid black',
        }}
      >
        {worldGrid.map((row, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: 'row' }}>
            {row.map((cell, cellIndex) => (
              <TouchableOpacity 
                key={cellIndex}
                style={{
                  width: 30, 
                  height: 30, 
                  borderWidth: 0.5, 
                  borderColor: 'black', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: setTileGold(cell.x, cell.y),
                }}
                onPress={() => setChosenTile({ x: cell.x, y: cell.y })}
              >
                <Text>{cell.tile?.landscape[0]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </Card>
    </View>
  );
};
