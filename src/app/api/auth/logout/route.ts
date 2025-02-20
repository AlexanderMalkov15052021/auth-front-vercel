import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const requestUrl = req.url;

        await fetch(`${process.env.SERVER_URL}/auth/proxy/logout` as string, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({})
        });

        const res = NextResponse.json({
            request: requestUrl,
        });

        res.cookies.delete("nset_auth_session");

        return res;

    } catch (error) {
        console.error("Ошибка при обработке JSON:", error);
        return NextResponse.json({ error: 'Некорректный JSON' });
    }

}