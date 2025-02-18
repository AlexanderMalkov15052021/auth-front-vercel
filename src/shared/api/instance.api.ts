import { FetchClient } from '../utils'

/**
 * Экземпляр клиента для выполнения HTTP-запросов к API.
 */
export const api = new FetchClient({
	baseUrl: process.env.SERVER_URL as string,
	options: {
		credentials: 'include'
	}
})

/**
 * Экземпляр клиента для выполнения HTTP-запросов к API через proxy.
 */
export const proxyAPI = new FetchClient({
	baseUrl: process.env.APPLICATION_URL as string,
	options: {
		credentials: 'include'
	}
})
