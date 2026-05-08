'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Heart, Download, User } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname() || '/';

  const navItems = [
    { href: '/', icon: Home, label: 'Accueil' },
    { href: '/search', icon: Search, label: 'Recherche' },
    { href: '/favorites', icon: Heart, label: 'Favoris' },
    { href: '/downloads', icon: Download, label: 'Téléchargements' },
    { href: '/profile', icon: User, label: 'Profil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-background/95 backdrop-blur-xl border-t border-gray-800 pb-safe z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.3)]">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className="relative">
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'drop-shadow-[0_0_8px_rgba(0,191,255,0.6)] transform scale-110 transition-transform' : 'transition-transform'} />
                {isActive && (
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_5px_rgba(0,191,255,0.8)]"></span>
                )}
              </div>
              <span className={`text-[10px] mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
