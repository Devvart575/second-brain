import { Share2, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';

interface ContentHeaderProps {
  onShareBrain?: () => void;
  onAddContent?: () => void;
}

export default function ContentHeader({ onShareBrain, onAddContent }: ContentHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <Button 
        variant="outline" 
        onClick={onShareBrain}
        className="bg-transparent border-neutral-700 text-white hover:bg-neutral-800 hover:text-white"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share Brain
      </Button>
      <Button 
        onClick={onAddContent}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Content
      </Button>
    </div>
  );
}