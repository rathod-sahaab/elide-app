import { createSlice } from '@reduxjs/toolkit'

const initialState: {
	cart: any[]
	cartTotal: number
	numberOfItems: number
} = {
	cart: [],
	cartTotal: 0,
	numberOfItems: 0,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {},
})

export default cartSlice.reducer
