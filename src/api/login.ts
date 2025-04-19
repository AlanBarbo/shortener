import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    if (!email || !password) {
        return NextResponse.json({ message: "Email y password requeridos" }, {
            status: 400,
        });
    }
    const hashed = await bcrypt.hash(password, 10);
    try {
        const { rows } = await pool.query(
            `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email`,
            [email, hashed],
        );
        return NextResponse.json(rows[0], { status: 201 });
    } catch (err: any) {
        if (err.code === "23505") {
            return NextResponse.json({ message: "Email ya registrado" }, {
                status: 409,
            });
        }
        return NextResponse.json({ message: "Error interno" }, { status: 500 });
    }
}
