"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export const ForgotPasswordModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Письмо с инструкциями отправлено на ваш email.");
      } else {
        alert(data.message || "Произошла ошибка.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при отправке запроса.");
    }
    closeModal();
  };

  return (
    <>
      {/* Кнопка для открытия модального окна */}
      <Button variant="link" onClick={openModal} className="p-0">
        <p className="text-blue-600 hover:underline">Забыли пароль?</p>
      </Button>

      {/* Модальное окно */}
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Восстановление пароля</DialogTitle>
            <DialogDescription>
              Введите ваш email, чтобы получить инструкции по восстановлению пароля.
            </DialogDescription>
          </DialogHeader>

          {/* Форма для ввода email */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите ваш email"
                required
              />
            </div>

            <DialogFooter>
              <Button type="submit">Отправить</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};