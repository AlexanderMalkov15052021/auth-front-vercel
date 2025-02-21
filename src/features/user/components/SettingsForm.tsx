'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Loading,
	Switch
} from '@/shared/components/ui'
import { useProfile } from '@/shared/hooks'

import { useUpdateProfileMutation } from '../hooks'
import { SettingsSchema, type TypeSettingsSchema } from '../schemes'

import { UserButton, UserButtonLoading } from './index'
import Link from 'next/link'
import { Tooltip } from 'react-tooltip'

/**
 * Форма для настройки профиля пользователя.
 */
export function SettingsForm() {
	const { user, isLoading } = useProfile()

	const form = useForm<TypeSettingsSchema>({
		resolver: zodResolver(SettingsSchema),
		values: {
			name: user?.display_name || '',
			email: user?.email || '',
			password: user?.password || '',
			isTwoFactorEnabled: user?.is_two_factor_enabled || false
		}
	})

	const { update, isLoadingUpdate } = useUpdateProfileMutation()

	const onSubmit = (values: TypeSettingsSchema) => {
		update({ values })
	}

	if (!user?.id) {
		console.log("Пользователь не найден!");

		return null;
	}


	return (
		<Card className='w-[400px]'>
			<CardHeader className='flex flex-row items-center justify-between'>
				<CardTitle>Настройки профиля</CardTitle>
				{isLoading ? <UserButtonLoading /> : <UserButton user={user} />}
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<Loading />
				) : (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='grid gap-2 space-y-2'
						>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Имя</FormLabel>
										<FormControl>
											<Input
												placeholder='Иван'
												disabled={isLoadingUpdate}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Почта</FormLabel>
										<FormControl>
											<Input
												placeholder='example@example.com'
												disabled={isLoadingUpdate}
												type='email'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<div className='flex items-center justify-between'>
											{
												field.value
													? <>
														<FormLabel>Пароль</FormLabel>
														<Link
															href='/auth/reset-password'
															className='ml-auto inline-block text-sm underline'
														>
															Сброс пароля
														</Link>
													</>
													: <>
														<FormLabel>
															<span>Пароль</span>
															<Tooltip anchorSelect=".my-anchor-element" place="top" >
																<p style={{
																	width: "300px",
																	lineHeight: "1.5rem",
																	fontSize: "1rem",
																	textAlign: "justify"
																}}>
																	При входе через сторонние сервисы,
																	провайдеры не предоставляют пароли,
																	чтобы избежать проблем со входом в
																	будущем, настоятельно рекомендуем
																	установить пароль в нашем приложении!
																</p>
															</Tooltip>
															&nbsp;
															<span className="my-anchor-element" style={{
																color: "red",
																fontSize: "1rem",
																cursor: "help"
															}}>
																?
															</span>
														</FormLabel>
														<Link
															href='/auth/reset-password'
															className='ml-auto inline-block text-sm underline'
														>
															Установить пароль
														</Link>
													</>
											}
										</div>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='isTwoFactorEnabled'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
										<div className='space-y-0.5'>
											<FormLabel>
												Двухфакторная аутентификация
											</FormLabel>
											<FormDescription>
												Включите двухфакторную
												аутентификацию для вашей учетной
												записи
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
												disabled={isLoadingUpdate}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button type='submit' disabled={isLoadingUpdate}>
								Сохранить
							</Button>
						</form>
					</Form>
				)}
			</CardContent>
		</Card>
	)
}
