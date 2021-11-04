import React from 'react'
import { ThemeContext } from './src/components/ThemeContext';
import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';

import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { Provider } from 'react-redux'
import { store, persistor } from './src/redux/store';
import Drawer from './src/navigation/Drawer/Drawer'
import UserDataManager from './src/screens/UserDataManager';
import { PersistGate } from 'redux-persist/integration/react'

UserDataManager.getInstance().setCurrentPositionFromReact()

function App() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#FFF7EE',
      text: 'white'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: 'black'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const themeContext = React.useMemo(() => ({
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    }
  }), []);
return(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  <PaperProvider store={store} theme={theme}>
    <ThemeContext.Provider store={store} value={themeContext}>
      <NavigationContainer store={store} theme={theme}>
        <Drawer />
      </NavigationContainer>
    </ThemeContext.Provider>
  </PaperProvider>
  </PersistGate>
  </Provider>
  )
}
export default App;