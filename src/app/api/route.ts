import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const requestUrl = request.url;

    return NextResponse.json({
        message: "Hello from the API",
        request: requestUrl,
    });
}

export async function HEAD(request: NextRequest) { }

export async function POST(request: NextRequest) {

    const body = await request.json();

    console.log({ body });

    return Response.json({ body });
}

export async function PUT(request: NextRequest) { }

export async function DELETE(request: NextRequest) { }

export async function PATCH(request: NextRequest) { }

export async function OPTIONS(request: NextRequest) { }