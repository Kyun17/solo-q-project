import { Link, NavLink } from "react-router-dom";
import { User } from "lucide-react";

export default function QuestionHeader() {
  const menus = [
    { name: "대시보드", path: "/dashboard" },
    { name: "모의 면접", path: "/mock" },
    { name: "질문 노트", path: "/questions" },
    { name: "커뮤니티", path: "/community" },
  ];

  return (
    <header className="w-full bg-gradient-to-r from-[#070A14] to-[#0B1020] border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600 text-sm">
              Q
            </span>
            <span>Solo-Q</span>
          </Link>

          {/* Menu */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {menus.map((menu) => (
              <NavLink
                key={menu.name}
                to={menu.path}
                className={({ isActive }) =>
                  `transition ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`
                }
              >
                {menu.name}
              </NavLink>
            ))}
          </nav>

          {/* Profile */}
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
            <User size={16} className="text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
