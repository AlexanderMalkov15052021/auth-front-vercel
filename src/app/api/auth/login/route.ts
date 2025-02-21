import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {

        const body = await req.json();

        const serverReq = await fetch(`${process.env.SERVER_URL}/auth/proxy/login` as string, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        });

        const reqBody = await serverReq.json();

        const res = NextResponse.json(reqBody["body"]);

        reqBody["cookie"] && res.headers.set('set-cookie', reqBody["cookie"]);

        return res;

    } catch (error) {
        console.error("Ошибка при обработке JSON:", error);
        return NextResponse.json({ error: 'Некорректный JSON' });
    }

}