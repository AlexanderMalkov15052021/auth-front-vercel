import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {

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

        // const cookie = res.headers.get('set-cookie');

        const urlParts = req.url.split("?");

        const code = urlParts[1].split("&")[0].replace("code=", "");

        const serverReq = await fetch(`${process.env.SERVER_URL}/auth/oauth/proxy/callback/${params.slug}` as string, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ slug: params.slug, code })
        });

        const { cookie } = await serverReq.json();

        console.log(cookie);

        const res = NextResponse.redirect(`${process.env.APPLICATION_URL}/dashboard/settings`);

        res.headers.set('set-cookie', cookie);

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
