import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // В реальном проекте пароль должен быть хэширован!
        emailVerified: false,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Ошибка при создании пользователя' },
      { status: 500 }
    );
  }
}