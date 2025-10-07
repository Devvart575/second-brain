import SideBar from "./components/SideBar"
import { useState } from 'react';
import { Twitter, Video, FileText, Link } from 'lucide-react';
import ContentArea from "./components/ContentArea";
export default function App() {
  const [activeItem, setActiveItem] = useState('tweets');

  const menuItems = [
    { id: 'tweets', label: 'Tweets', icon: Twitter },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'links', label: 'Links', icon: Link },
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
      />
    </div>
  );
}
