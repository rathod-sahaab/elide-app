export interface PaginationArgs {
	offset: number
	limit: number
}

export interface APIError {
	error: string
	message: string
	statusCode: number
}
