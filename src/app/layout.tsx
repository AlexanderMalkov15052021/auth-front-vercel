import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

import { ToggleTheme } from '@/shared/components/ui'
import { MainProvider } from '@/shared/providers'
import '@/shared/styles/globals.css'
import Head from 'next/head'

import 'react-tooltip/dist/react-tooltip.css';

export const metadata: Metadata = {
	title: {
		absolute: 'Авторизация в приложении',
		template: '%s | Авторизация в приложении'
	},
	description:
		'Приложение для авторизации пользователей'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<body className={GeistSans.variable}>
				<MainProvider>
					<div className='relative flex min-h-screen flex-col'>
						<ToggleTheme />
						<div className='flex h-screen w-full items-center justify-center px-4'>
							{children}
						</div>
					</div>
				</MainProvider>
			</body>
		</html>
	)
}
