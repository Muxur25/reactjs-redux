import { configureStore } from '@reduxjs/toolkit'

import filters from '../slices/filters-slices'
import players from '../slices/players-slice'

const middile = () => next => action => {
	if (typeof action == 'string') {
		return next({
			type: action,
		})
	} else {
		return next(action)
	}
}

export const store = configureStore({
	reducer: { players, filters },
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middile),
	devTools: true,
})
