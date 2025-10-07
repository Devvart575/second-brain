import { Share2, Trash2, Tag, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import type { ContentItem } from "../App";

interface Props {
  item: ContentItem;
  onDelete: () => void;
  onShare: () => void;
}

export default function ContentCard({ item, onDelete, onShare }: Props) {
  return (
    <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700 hover:border-neutral-600 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-white font-semibold">{item.title}</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onShare}
            className="bg-transparent border-neutral-600 text-white hover:bg-neutral-700"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="bg-transparent border-neutral-600 text-red-400 hover:bg-neutral-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview */}
      {item.type === "video" && item.url && (
        <video
          src={item.url}
          controls
          className="rounded-lg w-full mb-4 border border-neutral-700"
        />
      )}

      {item.type === "image" && item.url && (
        <img
          src={item.url}
          alt={item.title}
          className="rounded-lg w-full mb-4 border border-neutral-700"
        />
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {item.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-xs bg-neutral-700 text-neutral-300 px-2 py-1 rounded-md flex items-center gap-1"
          >
            <Tag className="w-3 h-3" /> {tag}
          </span>
        ))}
      </div>

      {/* Meta */}
      <div className="text-xs text-neutral-500 flex items-center gap-1">
        <Calendar className="w-3 h-3" />
        {new Date(item.createdAt).toLocaleString()}
      </div>
    </div>
  );
}
