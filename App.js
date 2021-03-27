import 'react-native-gesture-handler';
import React from 'react';
import {StackNavigator} from './src/navigation/StackNavigator';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {store, persistor} from './src/store';
import {StatusBar} from 'react-native';
import colors from './src/assets/colors/colors';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar backgroundColor={colors.primary} />

        <StackNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
