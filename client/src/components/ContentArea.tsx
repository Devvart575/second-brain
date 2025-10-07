import { FileText } from 'lucide-react';
import  ContentHeader from './ContentHeader';
import type{ MenuItem } from './SideBar';

interface ContentAreaProps {
  activeItem: string;
  menuItems: MenuItem[];
  onShareBrain?: () => void;
  onAddContent?: () => void;
}

export default function ContentArea({ 
  activeItem, 
  menuItems, 
  onShareBrain, 
  onAddContent 
}: ContentAreaProps) {
  const currentMenuItem = menuItems.find(item => item.id === activeItem);

  return (
    <div className="flex-1 bg-neutral-900 flex flex-col">
      {/* Content Header */}
      <div className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white capitalize">
              {currentMenuItem?.label}
            </h2>
            <p className="text-neutral-400 mt-1">
              Manage your {activeItem}
            </p>
          </div>
          
          <ContentHeader 
            onShareBrain={onShareBrain}
            onAddContent={onAddContent}
          />
        </div>
      </div>

      {/* Content Body */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl">
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3].map((item) => {
              const Icon = currentMenuItem?.icon || FileText;
              
              return (
                <div 
                  key={item}
                  className="p-6 bg-neutral-800 rounded-lg border border-neutral-700 hover:border-neutral-600 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-neutral-700 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-2">
                        Sample {currentMenuItem?.label} Item {item}
                      </h3>
                      <p className="text-neutral-400 text-sm">
                        This is a placeholder for your {activeItem}. Click "Add Content" to start adding items to your Second Brain.
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-neutral-500">
                        <span>Added 2 days ago</span>
                        <span>•</span>
                        <span>Last viewed 1 hour ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}