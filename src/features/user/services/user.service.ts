import { api, proxyAPI } from '@/shared/api'

import type { TypeSettingsSchema } from '../schemes'
import type { IUser } from '../types'

/**
 * Сервис для работы с пользователями.
 */
class UserService {
	/**
	 * Получает профиль текущего пользователя.
	 *
	 * @returns {Promise<IUser>} - Профиль пользователя.
	 */
	public async findProfile() {
		const response = await proxyAPI.get<IUser>('api/users/profile')
		// const response = await api.get<IUser>('users/profile')

		return response
	}

	/**
	 * Обновляет профиль текущего пользователя.
	 *
	 * @param {TypeSettingsSchema} body - Данные для обновления профиля.
	 * @returns {Promise<IUser>} - Обновленный профиль пользователя.
	 */
	public async updateProfile(body: TypeSettingsSchema) {
		const response = await proxyAPI.patch<IUser>('api/users/profile', body)

		return response
	}
}

export const userService = new UserService()
