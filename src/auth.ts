import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

/** Crea un JWT con payload { userId } */
export function signToken(userId: number) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "30d" });
}

/** Verifica JWT y devuelve payload */
export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET) as { userId: number };
}
