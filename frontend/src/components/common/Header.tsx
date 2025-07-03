import { Bell, User, LogOut } from "lucide-react"
import { useAuth } from "../../auth/AuthContext";

function Header() {
  const { logout }  = useAuth();
  return (
    <nav className="bg-white min-h-[60px] px-8 py-6 flex justify-between items-center w-full">
        <ul className="">
            <li className="inline-block mr-4 text-gray-700">
                <a href="/" className="">Inicio</a>
            </li>
            <li className="inline-block mr-4">
                <a href="/carta" className="">Carta</a>
            </li>
            <li className="inline-block">
                <a href="/nosotros" className="">Sobre nosotros</a>
            </li>
        </ul>
        <div className="flex items-center gap-6 w-fit">
            <a href="/notificaciones" className=" text-black">
                <Bell strokeWidth={1} />
            </a>
            <a href="/perfil" className=" text-black">
                <User strokeWidth={1} />
            </a>
            <button className="text-black cursor-pointer" onClick={logout}>
                <LogOut strokeWidth={1} />
            </button>
        </div>
    </nav>
  )
}

export default Header