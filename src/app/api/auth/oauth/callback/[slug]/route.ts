import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {

    try {

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

        const res = NextResponse.redirect(`${process.env.APPLICATION_URL}/dashboard/settings`);

        res.headers.set('set-cookie', cookie);

        return res;

    } catch (error) {
        console.error("Ошибка при обработке JSON:", error);
        return NextResponse.json({ error: `Некорректный JSON - ${error}` });
    }
}
