'use client'

import { PropsWithChildren, useRef } from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { makeStore } from "../lib/store"
import type { AppStore, AppPersistor } from "../lib/store"

type StorePersistPair = {
    store: AppStore,
    persistor: AppPersistor
}

export default function StoreProvider({ children }: PropsWithChildren) {
    const storeRef = useRef<StorePersistPair | null>(null);

    if (!storeRef.current) {
        const { store, persistor } = makeStore();
        storeRef.current = { store, persistor };
    }

    return (
        <Provider store={storeRef.current.store}>
            <PersistGate loading={null} persistor={storeRef.current.persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}
