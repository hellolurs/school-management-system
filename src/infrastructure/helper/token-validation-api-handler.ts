import { NextRequest } from "next/server";
import { validateToken } from "./validate-token";
import { AuthError } from "./error";

export default function tokenValidationApiHandler(request: NextRequest) {
    //token validation
    const token = request.headers.get('authorization')
    if (!validateToken(token)) throw new AuthError('Unauthorized')
}