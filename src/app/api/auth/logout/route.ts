import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

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

        console.log(cookie);

        res.headers.set('set-cookie', cookie);

        return res;

    } catch (error) {
        console.error("Ошибка при обработке JSON:", error);
        return NextResponse.json({ error: 'Некорректный JSON' });
    }

}