import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(_: NextRequest, { params }: { params: { slug: string } }) {

    try {

        const serverReq = await fetch(`${process.env.SERVER_URL}/auth/oauth/proxy/connect/${params.slug}` as string, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ slug: params.slug })
        });

        const reqBody = await serverReq.json();

        console.log(reqBody);

        const res = NextResponse.json(reqBody["body"]);

        res.headers.set('set-cookie', reqBody["cookie"]);

        return res;

    } catch (error) {
        console.error("Ошибка при обработке JSON:", error);
        return NextResponse.json({ error: `Некорректный JSON - ${error}` });
    }
}
