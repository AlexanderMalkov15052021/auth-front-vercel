import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {

        const cookie = req.headers.get('cookie');

        const serverReq = await fetch(`${process.env.SERVER_URL}/users/proxy/profile` as string, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ cookie })
        });

        const response = await serverReq.json();

        // const res = NextResponse.json(response);

        const res = NextResponse.json({
            "id": 56,
            "email": "malkov.fighter@yandex.ru",
            "password": "$argon2id$v=19$m=65536,t=3,p=4$6WefCc7c1wuV/ZiehP+Ozw$5+UndhFrv/ITiEkUwCFz8HYhiL42ZtoRr60Aru54xXQ",
            "display_name": "Alex",
            "picture": "",
            "role": "REGULAR",
            "is_verified": true,
            "is_two_factor_enabled": false,
            "method": "CREDENTIALS",
            "created_at": "2025-02-19T09:41:06.844Z",
            "updated_at": "2025-02-19T09:41:06.844Z"
        });

        return res;

    } catch (error) {
        console.error("Ошибка при обработке JSON:", error);
        return NextResponse.json({ error: 'Некорректный JSON' });
    }

}