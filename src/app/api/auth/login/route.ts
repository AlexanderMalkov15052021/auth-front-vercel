import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const requestUrl = req.url;

        const body = await req.json();

        const serverReq = await fetch(`${process.env.SERVER_URL}/auth/proxy/login` as string, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        });

        const res = NextResponse.json({
            request: requestUrl,
        });

        const { cookie } = await serverReq.json();

        // console.log("cookie: ", cookie);

        // const cookie = serverReq.headers.get('set-cookie');

        // console.log("cookie: ", cookie);

        res.headers.set('set-cookie', cookie);  // nset_auth_session

        console.log(serverReq);

        // res.cookies.set('nset_auth_session', data);

        return res;

    } catch (error) {
        console.error("Ошибка при обработке JSON:", error);
        return NextResponse.json({ error: 'Некорректный JSON' });
    }

}