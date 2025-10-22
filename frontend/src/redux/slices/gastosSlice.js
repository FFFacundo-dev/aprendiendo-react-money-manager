import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import gastosService from '../../api/gastos.service';

const initialState = {
  gastos: [],
  isLoading: false,
  isError: false,
  message: '',
};

export const updateGasto = createAsyncThunk('gastos/update', async ({ id, titulo, monto }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    return await gastosService.updateGasto(id, { titulo, monto }, token);
  } catch (error) {
     const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteGasto = createAsyncThunk('gastos/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    await gastosService.deleteGasto(id, token);
    return id;
  } catch (error) {
     const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// Thunks para operaciones CRUD de gastos
export const getGastos = createAsyncThunk('gastos/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    return await gastosService.getGastos(token);
  } catch (error) {
     const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createGasto = createAsyncThunk('gastos/create', async (gastoData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    return await gastosService.createGasto(gastoData, token);
  } catch (error) {
     const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const gastosSlice = createSlice({
    name: 'gastos',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGastos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGastos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.gastos = action.payload;
            })
            .addCase(getGastos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createGasto.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createGasto.fulfilled, (state, action) => {
                state.isLoading = false;
                state.gastos.push(action.payload.gasto);
            })
            .addCase(createGasto.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteGasto.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteGasto.fulfilled, (state, action) => {
                state.isLoading = false;
                state.gastos = state.gastos.filter(gasto => gasto.id_gasto !== action.payload.id);
            })
            .addCase(deleteGasto.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateGasto.fulfilled, (state, action) => {
                state.gastos = state.gastos.map((gasto) =>
                gasto.id_gasto === action.payload.gasto.id_gasto 
                ? action.payload.gasto // Reemplaza el gasto viejo
                : gasto // Mantén el gasto como estaba
              );
            });
    }
});

export const { reset } = gastosSlice.actions;
export default gastosSlice.reducer;
