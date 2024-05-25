import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useHttp } from '../hooks/use-http'

const initialState = {
	filterStatus: 'success',
	filters: [],
	nom: 'All',
}

export const filtersAcync = createAsyncThunk(
	'filters/filtersAcync',
	async () => {
		const { request } = useHttp()
		return await request('http://localhost:3000/filters')
	}
)

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		filterCreated: (state, action) => {
			state.nom = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(filtersAcync.pending, state => {
				state.filterStatus = 'loading'
			})
			.addCase(filtersAcync.fulfilled, (state, action) => {
				state.filterStatus = 'success'
				state.filters = action.payload
			})
			.addCase(filtersAcync.rejected, state => {
				state.filterStatus = 'error'
			})
			.addDefaultCase(() => {})
	},
})

const { actions, reducer } = filtersSlice

export default reducer

export const { filterCreated } = actions
