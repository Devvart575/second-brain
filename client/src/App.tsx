import { useState } from "react";
import SideBar from "./components/SideBar";
import ContentArea from "./components/ContentArea";
import { Twitter, Video, FileText, Image as ImageIcon, Link } from "lucide-react";

export interface ContentItem {
  id: number;
  title: string;
  type: "tweet" | "video" | "document" | "image";
  tags: string[];
  url?: string;
  createdAt: string;
}

export default function App() {
  const [activeItem, setActiveItem] = useState("tweets");
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddContent = (newItem: ContentItem) => {
    setContents((prev) => [newItem, ...prev]);
    setShowAddModal(false);
  };

  const handleDelete = (id: number) => {
    setContents((prev) => prev.filter((item) => item.id !== id));
  };

  const handleShare = (id: number) => {
    const content = contents.find((c) => c.id === id);
    if (content) alert(`Shared: ${content.title}`);
  };

  const menuItems = [
    { id: "tweets", label: "Tweets", icon: Twitter },
    { id: "videos", label: "Videos", icon: Video },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "images", label: "Images", icon: ImageIcon },
    { id: "links", label: "Links", icon: Link },
  ];

  return (
    <div className="flex h-screen bg-neutral-900">
      <SideBar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        menuItems={menuItems}
      />
      <ContentArea
        activeItem={activeItem}
        menuItems={menuItems}
        contents={contents}
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        onAddContent={handleAddContent}
        onDelete={handleDelete}
        onShare={handleShare}
      />
    </div>
  );
}
