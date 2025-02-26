/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	// Экспериментальные функции для Next.js
	experimental: {
		// Отключение функции "missing Suspense with CSR bailout"
		missingSuspenseWithCSRBailout: false
	},
	env: {
		// URL сервера для API-запросов, получаемый из переменных окружения
		SERVER_URL: process.env.SERVER_URL,
		// URL сервера для Proxy-запросов, получаемый из переменных окружения
		PROXY_URL: process.env.PROXY_URL,
		// URL клиента для API-запросов, получаемый из переменных окружения
		APPLICATION_URL: process.env.APPLICATION_URL,
		// Ключ сайта Google reCAPTCHA для клиентской валидации
		GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY
	},
	images: {
		// Шаблоны для оптимизации изображений
		remotePatterns: [
			{
				// Шаблон для изображений, размещенных на Google User Content
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				// Шаблон для изображений, размещенных на Yandex
				protocol: 'https',
				hostname: 'avatars.yandex.net'
			}
		]
	},
	async headers() {
        return [
            {
                source: "/",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "https://nestjs-vercel-deploy-nu.vercel.app" },
                    { key: "Access-Control-Allow-Methods", value: "GET, DELETE, PATCH, POST, PUT, OPTIONS, PATCH" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    }
};

export default nextConfig;