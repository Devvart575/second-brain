import { Brain, ChevronRight } from 'lucide-react';
import type{LucideIcon} from 'lucide-react'

export interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  activeItem: string;
  setActiveItem: (id: string) => void;
  menuItems: MenuItem[];
}

export default function Sidebar({ activeItem, setActiveItem, menuItems }: SidebarProps) {
  return (
    <div className="w-64 bg-neutral-800 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-neutral-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-neutral-700 rounded-lg">
            <Brain className="w-6 h-6 text-blue-400" />
          </div>
          <h1 className="text-xl font-bold text-white">Second Brain</h1>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-neutral-700 text-white'
                      : 'text-neutral-400 hover:bg-neutral-700/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-700">
        <div className="text-xs text-neutral-500 text-center">
          Your knowledge, organized
        </div>
      </div>
    </div>
  );
}