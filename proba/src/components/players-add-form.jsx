import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { useHttp } from '../hooks/use-http'
import { create } from '../slices/players-slice'

// const PlayersAddForm = () => {
// 	const onSubmit = e => {
// 		e.preventDefault()
// 		const name = e.target.name.value
// 		const country = e.target.country.value
// 		const continent = e.target.continent.value
// 		const data = {
// 			id: uuidv4(),
// 			name,
// 			country,
// 			continent,
// 		}
// 		return data
// 	}

// 	const data = onSubmit()

// 	const { players } = useSelector(state => state)
// 	const dispatch = useDispatch()

// 	const { request } = useHttp()

// 	request('http://localhost:3000/players')
// 		.then(res => console.log(res))
// 		.then(() => dispatch(create(data)))
// 		.catch(e => console.log(e))

const PlayersAddForm = () => {
	const dispatch = useDispatch()
	const { request } = useHttp()
	const { filters, filterStatus } = useSelector(state => state.filters)

	const onSubmit = e => {
		e.preventDefault()
		const name = e.target.name.value
		const country = e.target.country.value
		const continent = e.target.continent.value

		const data = {
			id: uuidv4(),
			name,
			country,
			continent,
		}

		request('http://localhost:3000/players', 'POST', JSON.stringify(data))
			.then(res => console.log(res))
			.then(() => dispatch(create(data)))
			.catch(e => console.log(e))
	}

	const render = () => {
		if (filterStatus == 'loading') {
			return <option>Loading...</option>
		} else if (filterStatus == 'error') {
			return <option>Someting weng wrong</option>
		}

		if (filters && filters.length > 0) {
			return filters.map(({ label, id }) => {
				if (id == 'all') return

				return (
					<option key={id} value={label}>
						{label}
					</option>
				)
			})
		}
	}

	return (
		<form onSubmit={onSubmit}>
			<div className='px-4 py-6 bg-white rounded-md shadow-lg bg-gradient-to-t from-cyan-500 to-transparent bg-opacity-10'>
				<div className='flex flex-col space-y-3'>
					<div>
						<label htmlFor='name' className='text-2xl'>
							New football player
						</label>
						<input
							type='text'
							className='block w-full py-2 px-4 rounded-md mt-1'
							placeholder='Mohammad Salah'
							name='name'
							required
						/>
					</div>

					<div>
						<label htmlFor='country' className='text-2xl'>
							Country
						</label>
						<input
							type='text'
							className='block w-full py-2 px-4 rounded-md mt-1'
							placeholder='Egypt'
							name='country'
							required
						/>
					</div>

					<div>
						<label htmlFor='continent' className='text-2xl'>
							Select player continent
						</label>
						<select
							className='block w-full py-2 px-4 rounded-md mt-1'
							name='continent'
							required
						>
							{render()}
						</select>
					</div>

					<button className='py-2 px-4 w-fit rounded-md ml-auto bg-gradient-to-r from-blue-500 to-blue-950 text-white hover:scale-105 transition-all font-medium'>
						Add player
					</button>
				</div>
			</div>
		</form>
	)
}

export default PlayersAddForm
