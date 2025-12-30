"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Paperclip, File } from "lucide-react"
import type { TaskAttachment } from "./types"

interface AttachmentManagerProps {
  attachments: TaskAttachment[]
  onChange: (attachments: TaskAttachment[]) => void
}

export function AttachmentManager({ attachments, onChange }: AttachmentManagerProps) {
  const [newAttachmentName, setNewAttachmentName] = useState("")
  const [newAttachmentUrl, setNewAttachmentUrl] = useState("")

  const addAttachment = () => {
    if (!newAttachmentName.trim() || !newAttachmentUrl.trim()) return

    const newAttachment: TaskAttachment = {
      id: Math.random().toString(36).substring(7),
      name: newAttachmentName,
      url: newAttachmentUrl,
      type: "link",
      size: 0,
      uploadedAt: new Date().toISOString(),
    }

    onChange([...attachments, newAttachment])
    setNewAttachmentName("")
    setNewAttachmentUrl("")
  }

  const removeAttachment = (attachmentId: string) => {
    onChange(attachments.filter((att) => att.id !== attachmentId))
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          placeholder="Attachment name"
          value={newAttachmentName}
          onChange={(e) => setNewAttachmentName(e.target.value)}
          className="flex-1"
        />
        <Input
          placeholder="URL"
          value={newAttachmentUrl}
          onChange={(e) => setNewAttachmentUrl(e.target.value)}
          className="flex-1"
        />
        <Button type="button" onClick={addAttachment} size="sm">
          <Paperclip className="h-4 w-4" />
        </Button>
      </div>

      {attachments.length > 0 && (
        <div className="space-y-2">
          {attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="flex items-center gap-2 rounded-md border p-2"
            >
              <File className="h-4 w-4 text-muted-foreground" />
              <a
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-sm hover:underline"
              >
                {attachment.name}
              </a>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => removeAttachment(attachment.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
