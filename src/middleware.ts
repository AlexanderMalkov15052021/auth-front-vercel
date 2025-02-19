import { type NextRequest, NextResponse } from 'next/server'

/**
 * Middleware для обработки запросов в приложении Next.js.
 *
 * @param {NextRequest} request - Объект запроса, содержащий информацию о текущем запросе.
 * @returns {NextResponse} - Ответ, который будет отправлен клиенту.
 */
export default function middleware(request: NextRequest) {

	const res = NextResponse.next();

	const { url, cookies } = request

	const session = cookies.get('nset_auth_session')?.value

	const isAuthPage = url.includes('/auth')

	const isResettingPassword = url.includes('/auth/reset-password');

	const isSettingNewPassword = url.includes('auth/new-password');

	if (isResettingPassword || isSettingNewPassword) {
		return res;
	}

	if (isAuthPage) {
		if (session) {
			return NextResponse.redirect(new URL('/dashboard/settings', url))
		}

		return res;
	}

	if (!session) {
		return NextResponse.redirect(new URL('/auth/login', url))
	}
}

/**
 * Конфигурация middleware, определяющая маршруты, к которым будет применяться данный middleware.
 *
 * @type {{ matcher: string[] }}
 */
export const config = {
	matcher: ['/auth/:path*', '/dashboard/:path*']
}
