'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, Type, TestTube2, Home } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    {
      href: '/',
      label: 'Fonts',
      icon: Type,
      description: 'Quản lý Font chữ',
    },
    {
      href: '/auto-reply',
      label: 'Auto-Reply',
      icon: MessageSquare,
      description: 'Quản lý trả lời tự động',
    },
    {
      href: '/auto-reply/test',
      label: 'Test Auto-Reply',
      icon: TestTube2,
      description: 'Test tính năng tìm kiếm',
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white shadow-md border-b-2 border-blue-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <Home size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-600">
                NVN Bot Manager
              </h1>
              <p className="text-xs text-gray-500">Font & Auto-Reply System</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
                    ${
                      active
                        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }
                  `}
                  title={link.description}
                >
                  <Icon size={20} />
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Route Indicator */}
      {navLinks.map((link) => {
        if (isActive(link.href)) {
          return (
            <div
              key={`indicator-${link.href}`}
              className="h-1 bg-blue-600"
            ></div>
          );
        }
        return null;
      })}
    </nav>
  );
}

