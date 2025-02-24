import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {

    try {

        // const res = NextResponse.json({});

        // console.log(222);


        // const response = NextResponse.redirect(`${process.env.APPLICATION_URL}/dashboard/settings`);

        // const token = 123;

        // const cookieName = "asd";

        // const day = 60 * 60 * 24 * 1000;
        // const maxAge = new Date(new Date().getTime() + day).toUTCString();

        // const cookie = `${cookieName}=${token}; Domain=${process.env.COOKIES_DOMAIN}; Path=/; Expires=${maxAge}; HttpOnly; SameSite=Lax`;

        // res.headers.set('set-cookie', cookie);

        console.log(req);

        const res = NextResponse.json({});

        return res;

        // const body = await req.json();

        // const res = NextResponse.redirect(`${process.env.APPLICATION_URL}/dashboard/settings`);

        // res.headers.set('set-cookie', body["cookie"]);

        // return res;

    } catch (error) {
        console.error("Ошибка при обработке JSON:", error);
        return NextResponse.json({ error: `Некорректный JSON - ${error}` });
    }
}
