import jwt from 'jsonwebtoken';
import { envConfig } from '../config/env.config';

export function generateToken(payload: Record<string, unknown>) {

    const token = jwt.sign(payload, envConfig.JWT_SECRET, { expiresIn: '7d' });

    return token;
}