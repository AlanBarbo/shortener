import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
    message: string;
    user?: {
        email: string;
    };
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            email,
        },
    });
}
