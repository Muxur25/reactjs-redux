import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useHttp } from '../hooks/use-http'

const initialState = {
	status: 'success',
	players: [],
}

export const fetchPlayers = createAsyncThunk(
	'players/fetchPlayers',
	async () => {
		const { request } = useHttp()
		return await request('http://localhost:3000/players')
	}
)

const playerSlice = createSlice({
	name: 'players',
	initialState,
	reducers: {
		create: (state, action) => {
			state.players.push(action.payload)
		},
		deleted: (state, action) => {
			state.players = state.players.filter(
				player => player.id != action.payload
			)
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPlayers.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchPlayers.fulfilled, (state, action) => {
				state.status = 'success'
				state.players = action.payload
			})
			.addCase(fetchPlayers.rejected, state => {
				state.status = 'error'
			})
			.addDefaultCase(() => {})
	},
})

const { reducer, actions } = playerSlice

export const { fetching, fetched, error, create, deleted } = actions

export default reducer
