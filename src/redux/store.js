import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import reducer from './Reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['albumes', "fotos", "usuarios"]
};


const rootReducer = combineReducers({
  reducer: persistReducer(persistConfig, reducer)
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);