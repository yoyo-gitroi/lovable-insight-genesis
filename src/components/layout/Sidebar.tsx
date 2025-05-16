
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, User, BarChartBig } from 'lucide-react'; // Using available icons

const navigationItems = [
  { name: 'Welcome', href: '/', icon: LayoutDashboard },
  { name: 'AE Dashboard', href: '/ae-dashboard', icon: User },
  { name: 'CRO Dashboard', href: '/cro-dashboard', icon: BarChartBig },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col w-64 bg-gray-50 border-r border-gray-200 min-h-screen">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800">GTM Intel</h1>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              'flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-200 hover:text-gray-900 transition-colors',
              location.pathname === item.href
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600'
            )}
          >
            <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200 mt-auto">
        <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Lovable Inc.</p>
      </div>
    </div>
  );
};

export default Sidebar;
