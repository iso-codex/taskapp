import React, { useState } from 'react'
import { Trash2, Pin, Edit2, Check, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { useNoteStore } from '../../store/noteStore'
import { cn } from '../../utils/cn'

const NoteCard = ({ note }) => {
    const { updateNote, deleteNote, togglePin } = useNoteStore()
    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(note.title)
    const [editContent, setEditContent] = useState(note.content || '')

    const colorConfig = {
        yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', hover: 'hover:border-yellow-300' },
        blue: { bg: 'bg-blue-50', border: 'border-blue-200', hover: 'hover:border-blue-300' },
        green: { bg: 'bg-green-50', border: 'border-green-200', hover: 'hover:border-green-300' },
        pink: { bg: 'bg-pink-50', border: 'border-pink-200', hover: 'hover:border-pink-300' },
        purple: { bg: 'bg-purple-50', border: 'border-purple-200', hover: 'hover:border-purple-300' },
        orange: { bg: 'bg-orange-50', border: 'border-orange-200', hover: 'hover:border-orange-300' },
    }

    const config = colorConfig[note.color] || colorConfig.yellow

    const handleSave = async () => {
        await updateNote(note.id, { title: editTitle, content: editContent })
        setIsEditing(false)
    }

    const handleCancel = () => {
        setEditTitle(note.title)
        setEditContent(note.content || '')
        setIsEditing(false)
    }

    return (
        <div className={cn(
            "group relative rounded-xl border-2 p-4 transition-all duration-200 break-inside-avoid mb-4",
            config.bg,
            config.border,
            config.hover,
            "hover:shadow-lg"
        )}>
            {/* Pin Icon */}
            <button
                onClick={() => togglePin(note.id, note.pinned)}
                className={cn(
                    "absolute top-3 right-3 p-1.5 rounded-full transition-all",
                    note.pinned ? "text-primary bg-white shadow-sm" : "text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-white/50"
                )}
            >
                <Pin className={cn("w-4 h-4", note.pinned && "fill-current")} />
            </button>

            {isEditing ? (
                <div className="space-y-3">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full bg-white/50 border border-border rounded-lg px-3 py-2 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Note title..."
                    />
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full bg-white/50 border border-border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                        rows={4}
                        placeholder="Note content..."
                    />
                    <div className="flex gap-2">
                        <Button size="sm" onClick={handleSave} className="flex-1">
                            <Check className="w-4 h-4 mr-1" />
                            Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancel}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                    <h3 className="font-semibold text-lg mb-2 pr-8">{note.title}</h3>
                    {note.content && (
                        <p className="text-sm text-foreground/80 whitespace-pre-wrap">{note.content}</p>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1 mt-4 pt-3 border-t border-current/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsEditing(true)}
                            className="text-xs h-7"
                        >
                            <Edit2 className="w-3 h-3 mr-1" />
                            Edit
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNote(note.id)}
                            className="text-xs h-7 text-destructive hover:text-destructive"
                        >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}

export default NoteCard
