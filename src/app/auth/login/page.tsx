import type { Metadata } from 'next'

import { LoginForm } from '@/features/auth/components'

import dynamic from "next/dynamic";

export const metadata: Metadata = {
	title: 'Войти в аккаунт'
}

const LoginPage = () => <LoginForm />


export default dynamic(() => Promise.resolve(LoginPage), {
	ssr: false,
});
