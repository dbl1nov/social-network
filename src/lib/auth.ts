import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export async function registerUser(username: string, email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    })

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1d" })
    return { user, token }
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("Пользователь с таким email уже существует")
    }
    throw error
  }
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    throw new Error("Неверный email или пароль")
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw new Error("Неверный email или пароль")
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1d" })
  return { user, token }
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
  } catch (error) {
    return null
  }
}

