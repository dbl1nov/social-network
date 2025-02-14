"use server";

import { prisma } from "@/lib/prisma";

export async function uploadAvatar(userId: number, formData: FormData) {
  const file = formData.get("avatar") as File;
  const filePath = `/uploads/${file.name}`;

  // Сохраните файл на сервере (например, в папку `public/uploads`)
  // Здесь можно использовать библиотеку для работы с файлами, например `fs` или `multer`.

  // Обновите аватар пользователя в базе данных
  await prisma.user.update({
    where: { id: userId },
    data: {
      avatar: filePath,
    },
  });
}