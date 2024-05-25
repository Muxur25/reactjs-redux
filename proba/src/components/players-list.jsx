import { createSelector } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHttp } from '../hooks/use-http'
import { deleted, fetchPlayers } from '../slices/players-slice'
import Empty from './empty'
import Error from './error'
import PlayersListItem from './players-list-item'
import Spinner from './spinner'

const PlayersList = () => {
	const selector = createSelector(
		state => state.filters.nom,
		state => state.players.players,
		(filter, players) => {
			if (filter == 'All') {
				return players
			} else {
				return players.filter(player => player.continent == filter)
			}
		}
	)

	const filtersCrea = useSelector(selector)

	const status = useSelector(state => state.players.status)
	const dispatch = useDispatch()
	const { request } = useHttp()

	useEffect(() => {
		dispatch(fetchPlayers())
	}, [])

	if (status == 'loading') {
		return <Spinner />
	}
	if (status == 'error') {
		return <Error />
	}

	const onDeleted = id => {
		request(`http://localhost:3000/players/${id}`, 'DELETE')
			.then(res => console.log(res))
			.then(() => dispatch(deleted(id)))
			.catch(e => console.log(e))
	}

	const render = () => {
		if (!filtersCrea.length) {
			return <Empty />
		}

		return filtersCrea.map(({ id, ...props }) => (
			<PlayersListItem onDeleted={() => onDeleted(id)} key={id} {...props} />
		))
	}

	console.log(filtersCrea)

	return <div className='flex flex-col space-y-3'>{render()}</div>
}

export default PlayersList
