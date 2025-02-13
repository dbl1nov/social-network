import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="text-center flex flex-col items-center p-0 m-0">
            <Image src={'/error-ufo.svg'} width={300} height={1} alt="error img"/>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Упс! Страница не найдена</h2>
            <p className="text-gray-600 mb-6">
              Похоже, вы заблудились в нашей социальной сети. Не волнуйтесь, такое случается даже с лучшими из нас!
            </p>
            <Link href="/" passHref>
              <Button className="w-full">Вернуться на главную</Button>
            </Link>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:py-6">
          <p className="text-xs text-gray-500 text-center">© 2025 SocialNet. Все права защищены.</p>
        </div>
      </div>
    </div>
  )
}

