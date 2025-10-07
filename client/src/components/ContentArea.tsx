import ContentHeader from "./ContentHeader";
import ContentCard from "./ContentCard";
import AddContentModal from "./AddContentModal";
import type { MenuItem } from "./SideBar";
import type { ContentItem } from "../App";

interface ContentAreaProps {
  activeItem: string;
  menuItems: MenuItem[];
  contents: ContentItem[];
  showAddModal: boolean;
  setShowAddModal: (value: boolean) => void;
  onAddContent: (item: ContentItem) => void;
  onDelete: (id: number) => void;
  onShare: (id: number) => void;
}

export default function ContentArea({
  activeItem,
  menuItems,
  contents,
  showAddModal,
  setShowAddModal,
  onAddContent,
  onDelete,
  onShare,
}: ContentAreaProps) {
  const currentMenuItem = menuItems.find((item) => item.id === activeItem);

  return (
    <div className="flex-1 bg-neutral-900 flex flex-col">
      {/* Header */}
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

          <ContentHeader onAddContent={() => setShowAddModal(true)} />
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="grid grid-cols-1 gap-4 max-w-4xl">
          {contents.length === 0 ? (
            <p className="text-neutral-500 text-sm">
              No {activeItem} yet. Click “Add Content” to create one.
            </p>
          ) : (
            contents.map((item) => (
              <ContentCard
                key={item.id}
                item={item}
                onDelete={() => onDelete(item.id)}
                onShare={() => onShare(item.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Add Modal */}
      <AddContentModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={onAddContent}
      />
    </div>
  );
}
