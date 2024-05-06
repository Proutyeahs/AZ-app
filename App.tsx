import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { World } from './pages/World/World';
import { store } from './app/store';


export default function App() {
  return (
    <View>
      <Provider store={store}>
        <World />
      </Provider>
    </View>
  );
}
