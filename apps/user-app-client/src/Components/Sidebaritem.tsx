
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SidebarItem = ({ href, title, icon , tooltip }: { href: string; title: string; icon: React.ReactNode, tooltip?:string }) => {
    const navigate = useNavigate();
    const pathname = useLocation()
    if(pathname.pathname == '/') {
        pathname.pathname = '/dashboard';
    }
    const selected = pathname.pathname == href;

    return <div title={tooltip} className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer  p-2 pl-4`} onClick={() => {
        navigate(href);
    }}>
        <div className="pr-2">
            {icon}
        </div>
        <div className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>
            {title}
        </div>
    </div>
}