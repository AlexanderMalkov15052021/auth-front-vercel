import { NextResponse } from "next/server";

export async function POST() {

    try {

        const serverReq = await fetch(`${process.env.SERVER_URL}/auth/proxy/logout` as string, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });

        const res = NextResponse.json({});

        const { cookie } = await serverReq.json();

        res.headers.set('set-cookie', cookie);

        return res;

    } catch (error) {
        console.error("Ошибка при обработке JSON:", error);
        return NextResponse.json({ error: 'Некорректный JSON' });
    }

}