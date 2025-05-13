import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import themeReducer from './features/theme/store/theme-slice';
import navReducer from './features/nav/store/nav-slice';
import sidebarReducer from './features/sidebar/store/sidebar-slice';

const rootReducer = combineReducers({
    nav: navReducer,
    theme: themeReducer,
    sidebar: sidebarReducer
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
export type RootState = ReturnType<AppStore['getState']>;
export type AppPersistor = ReturnType<typeof makeStore>['persistor'];
export type AppDispatch = AppStore['dispatch'];