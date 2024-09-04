
import { configureStore } from '@reduxjs/toolkit';
import contactsSlice from './features/contact/contactsSlice';


export const store = configureStore({
  reducer: {
    contacts: contactsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
