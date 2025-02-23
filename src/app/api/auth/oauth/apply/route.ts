import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {

    try {

        const body = await req.json();
        
        const res = NextResponse.redirect(`${process.env.APPLICATION_URL}/dashboard/settings`);

        res.headers.set('set-cookie', body["cookie"]);

        return res;

    } catch (error) {
        console.error("Ошибка при обработке JSON:", error);
        return NextResponse.json({ error: `Некорректный JSON - ${error}` });
    }
}
