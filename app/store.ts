import { configureStore } from '@reduxjs/toolkit';
import { afternoonZoologistSlice } from '../slices/afternoonZoologistSlice';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { afternoonZoologistApi } from '../slices/afternoonZoologist.service';

export const store = configureStore({
    reducer: {
        afternoonZoologist: afternoonZoologistSlice.reducer,
        [afternoonZoologistApi.reducerPath]: afternoonZoologistApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            afternoonZoologistApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
