import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import themeReducer from './features/theme/store/theme-slice';

const rootReducer = combineReducers({
    theme: themeReducer
})

const persisteConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persisteConfig, rootReducer);

export const makeStore = () => {
    const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
            }
        })
    })

    const persistor = persistStore(store);
    return { store, persistor }
}

export type AppStore = ReturnType<typeof makeStore>['store'];
export type AppPersistor = ReturnType<typeof makeStore>['persistor'];