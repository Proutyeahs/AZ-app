import React, { useEffect } from "react";
import { worldGridInit, selectGrid, selectTiles } from "../slices/afternoonZoologistSlice";

import { useAppDispatch, useAppSelector } from "../app/store";
import { useGetTilesQuery } from "../slices/afternoonZoologist.service";
import { Card } from "@mui/material";
import { View, Text, Dimensions } from "react-native";

export const World: React.FC = () => {
  useGetTilesQuery();

  const dispatch = useAppDispatch();
  const screenWidth = Dimensions.get('window').width;
  //const screenHeight = Dimensions.get('window').height;
  const tiles = useAppSelector(selectTiles);
  const worldGrid = useAppSelector(selectGrid);

  useEffect(() => {
    dispatch(worldGridInit());
  }, [tiles]);

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
              <View key={cellIndex} style={{ width: 30, height: 30, borderWidth: .5, borderColor: 'black', alignItems: 'center', justifyContent: 'center', backgroundColor: cell.x === 5 && cell.y === 5 ? 'gold' : 'transparent' }}>
                {cell.tile && cell.tile.landscape ? <Text>{cell.tile.landscape[0]}</Text> : null}
              </View>
            ))}
          </View>
        ))}
      </Card>
    </View>
  );  
};
