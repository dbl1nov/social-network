import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-[100vh]">
      <div className="flex flex-col gap-6 p-5 bg-white mt-1 m-2 shadow-lg rounded-lg">
        <div className="bg-slate-500 w-[80px] h-[80px] rounded-[50%] border-2 border-black cursor-pointer"></div>
        <Link href="/">Главная</Link>
        <Link href="/notification">Уведомления</Link>
        <Link href="/messages">Сообщения</Link>
        <Link href="/friends">Друзья</Link>
        <Link href="/settings">Настройки</Link>
      </div>

      <div className="flex flex-col bg-white mt-1 m-2 shadow-lg rounded-lg w-[500px]">
        <div className="flex shadow-sm">
          <input
            className="w-full h-[66px] p-2 outline-none rounded-lg"
            type="text"
            placeholder="Поиск"
          />
        </div>
        <div className="flex gap-3 p-2 border-b-2">
          <div className="flex flex-col gap-1">
            <p className="font-bold text-xl">Имя Фамилия</p>
            <p className="text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque
              vel dolore enim sint velit consectetur earum quasi odit
              architecto!
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full bg-white mt-1 m-2 shadow-lg rounded-lg flex-1">
        <div className="flex p-2 items-center gap-2 shadow-sm">
          <div className="bg-slate-500 w-[50px] h-[50px] rounded-[50%] border-black cursor-pointer"></div>
          <p className="font-bold text-xl">Имя Фамилия</p>
        </div>
        <div className="flex-1 overflow-x-hidden bg-slate-300">
          <div className="w-full h-full m-2">
            <div className="bg-gray-500 rounded-md rounded-bl-none mb-2 ml-3 p-2 w-[350px]">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque
              vel dolore enim sint velit consectetur earum quasi odit
              architecto!</p>
            </div>
            <div className="bg-gray-500 w-[20px] h-[20px] rounded-[50%] border-black cursor-pointer"></div>
          </div>
        </div>
        <div className="flex w-full">
          <textarea
            className="w-full p-2 outline-none resize-none rounded-lg"
            placeholder="Написать сообщение"
          />
          <button className="bg-slate-500 p-4 text-white rounded-br-lg">
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}