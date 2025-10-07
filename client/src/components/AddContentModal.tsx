import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import type { ContentItem } from "../App";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (item: ContentItem) => void;
}

export default function AddContentModal({ open, onClose, onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"tweet" | "video" | "document" | "image">("tweet");
  const [tags, setTags] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = () => {
    const newItem: ContentItem = {
      id: Date.now(),
      title,
      type,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      url,
      createdAt: new Date().toISOString(),
    };
    onSubmit(newItem);
    setTitle("");
    setTags("");
    setUrl("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-800 border-neutral-700 text-white">
        <DialogHeader>
          <DialogTitle>Add New Content</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-neutral-700 border-neutral-600 text-white"
          />

          <Select value={type} onValueChange={(v: any) => setType(v)}>
            <SelectTrigger className="bg-neutral-700 border-neutral-600 text-white">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
              <SelectItem value="tweet">Tweet</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="document">Document</SelectItem>
              <SelectItem value="image">Image</SelectItem>
            </SelectContent>
          </Select>

          {(type === "video" || type === "image") && (
            <Input
              placeholder="Media URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-neutral-700 border-neutral-600 text-white"
            />
          )}

          <Input
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="bg-neutral-700 border-neutral-600 text-white"
          />

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-transparent border-neutral-600 text-white hover:bg-neutral-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
