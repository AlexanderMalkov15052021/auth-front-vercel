import type { Metadata } from 'next'

import { SettingsForm } from '@/features/user/components/SettingsForm'

export const metadata: Metadata = {
	title: 'Настройки профиля'
}

export const dynamic = 'force-dynamic';

export default function SettingsPage() {
	return <SettingsForm />
}
