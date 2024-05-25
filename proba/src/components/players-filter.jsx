import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHttp } from '../hooks/use-http'
import { filterCreated, filtersAcync } from '../slices/filters-slices.js'

const PlayersFilter = () => {
	const { filters, filterStatus } = useSelector(state => state.filters)
	const dispatch = useDispatch()
	const { request } = useHttp()

	useEffect(() => {
		dispatch(filtersAcync())
	}, [])

	if (filterStatus == 'loading') {
		return <span>Loading...</span>
	}
	if (filterStatus == 'error') {
		return <span className=' bg-red-500'>Someting weng wrong</span>
	}

	const render = () => {
		if (!filters.length) {
			return <span className=' bg-red-500'>Someting weng wrong</span>
		}

		return filters.map(({ id, label, clasess }) => (
			<button
				key={id}
				onClick={() => dispatch(filterCreated(label))}
				className={`py-2 px-4 bg-gradient-to-r text-white hover:opacity-90 transition-all ${clasess}`}
			>
				{label}
			</button>
		))
	}

	return (
		<div className='px-4 py-6 bg-white rounded-md shadow-lg bg-gradient-to-b from-cyan-500 to-transparent bg-opacity-10 mt-4'>
			<h1 className='text-xl font-bold'>Filter players by continent</h1>

			<div className='flex mt-2'>{render()}</div>
		</div>
	)
}

export default PlayersFilter
