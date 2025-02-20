import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {

        // const cookie = req.headers.get('cookie');
        const cookie = req.cookies.getAll();

        const serverReq = await fetch(`${process.env.SERVER_URL}/users/proxy/profile` as string, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ cookie: `${(cookie as any)["name"]}=${(cookie as any)["value"]}` })
        });

        const response = await serverReq.json();

        const res = NextResponse.json(response);

        return res;

    } catch (error) {
        console.error("Ошибка при обработке JSON:", error);
        return NextResponse.json({ error: `Некорректный JSON - ${error}` });
    }

}