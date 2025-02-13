import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export function signJwt(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" })
}

export function verifyJwt(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

