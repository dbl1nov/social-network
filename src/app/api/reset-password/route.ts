import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const { token, newPassword } = await request.json();

  // Логирование для отладки
  console.log("Токен из запроса:", token);
  console.log("Новый пароль из запроса:", newPassword);

  // Проверка наличия токена
  if (!token) {
    return NextResponse.json(
      { message: "Токен не предоставлен." },
      { status: 400 }
    );
  }

  // Проверка JWT_SECRET
  if (!process.env.JWT_SECRET) {
    return NextResponse.json(
      { message: "JWT_SECRET не настроен." },
      { status: 500 }
    );
  }

  try {
    // Проверка токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { email: string };

    // Логирование для отладки
    console.log("Email из токена:", decoded.email);

    // Здесь добавьте логику для обновления пароля в базе данных
    console.log("Новый пароль:", newPassword);

    return NextResponse.json({ message: "Пароль успешно изменен." });
  } catch (error) {
    console.error("Ошибка при сбросе пароля:", error);
    return NextResponse.json(
      { message: "Недействительный или истекший токен." },
      { status: 400 }
    );
  }
}