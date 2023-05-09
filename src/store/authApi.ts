import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from '../utils/url';

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string, device_id: string }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${baseUrl}/users/signin`, payload);
      console.log(data.data);
      
      return data;
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
}  catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (payload: { firstName?: string;  lastName?:  string; email?: string; roleId?: string }, thunkAPI) => {
    try {
      const { data } = await axios.put(`${baseUrl}/users/updateUser/:id`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);