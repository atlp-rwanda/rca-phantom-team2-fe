import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from '../utils/url';

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string, device_id: string }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${baseUrl}/users/signin`, payload);
      console.log(data);
      return data;
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
}  catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);