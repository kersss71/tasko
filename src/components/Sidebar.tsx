import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, DollarSign } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white shadow-lg h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Tasko: менеджер задач</h1>
      </div>
      <nav className="mt-6">
        <SidebarLink 
          to="/" 
          icon={<LayoutDashboard size={20} />} 
          text="Главная панель" 
          active={location.pathname === '/'} 
        />
        <SidebarLink 
          to="/tasks" 
          icon={<FileText size={20} />} 
          text="Задачи" 
          active={location.pathname === '/tasks'} 
        />
        <SidebarLink 
          to="/deals" 
          icon={<DollarSign size={20} />} 
          text="Сделки" 
          active={location.pathname === '/deals'} 
        />
        <SidebarLink 
          to="/team" 
          icon={<Users size={20} />} 
          text="Команда" 
          active={location.pathname === '/team'} 
        />
        <SidebarLink 
          to="/settings" 
          icon={<Settings size={20} />} 
          text="Настройки" 
          active={location.pathname === '/settings'} 
        />
      </nav>
    </div>
  );
};

interface SidebarLinkProps {
  icon: React.ReactNode;
  text: string;
  to: string;
  active?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, text, to, active }) => {
  return (
    <Link
      to={to}
      className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
        active ? 'bg-gray-100' : ''
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </Link>
  );
};

export default Sidebar;