import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const requestUrl = req.url;

        const serverReq = await fetch(`${process.env.SERVER_URL}/auth/proxy/logout` as string, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({})
        });

        const { cookie } = await serverReq.json();

        const res = NextResponse.json({
            request: requestUrl,
            cookie: cookie
        });

        const tmpCookie = cookie.replace(";", `; Domain=${process.env.COOKIE_DOMAIN};`);

        res.headers.set('set-cookie', tmpCookie);

        return res;

    } catch (error) {
        console.error("Ошибка при обработке JSON:", error);
        return NextResponse.json({ error: 'Некорректный JSON' });
    }

}