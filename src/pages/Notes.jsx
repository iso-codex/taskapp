import React, { useEffect, useState } from 'react'
import { Plus, Search, FileText, Trash2, MoreVertical, Tag, Clock, Edit2, Save, X } from 'lucide-react'
import { useNoteStore } from '../store/noteStore'
import { Button } from '../components/ui/Button'
import { cn } from '../utils/cn'

const Notes = () => {
    const { notes, fetchNotes, addNote, updateNote, deleteNote, loading } = useNoteStore()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedNote, setSelectedNote] = useState(null)
    const [editTitle, setEditTitle] = useState('')
    const [editContent, setEditContent] = useState('')
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [noteToDelete, setNoteToDelete] = useState(null)

    useEffect(() => {
        fetchNotes()
    }, [fetchNotes])

    useEffect(() => {
        if (notes.length > 0 && !selectedNote) {
            setSelectedNote(notes[0])
            setEditTitle(notes[0].title)
            setEditContent(notes[0].content || '')
        }
    }, [notes])

    useEffect(() => {
        if (selectedNote) {
            setEditTitle(selectedNote.title)
            setEditContent(selectedNote.content || '')
        }
    }, [selectedNote])

    const filteredNotes = notes.filter(note => {
        const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content?.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesSearch
    })

    // CREATE - Add new note
    const handleCreateNote = async () => {
        const newNote = await addNote({
            title: 'Untitled Note',
            content: 'Start writing your ideas here...',
            color: 'yellow'
        })
        setSelectedNote(newNote)
        setEditTitle(newNote.title)
        setEditContent(newNote.content)
    }

    // UPDATE - Save note changes
    const handleSave = async () => {
        if (selectedNote) {
            await updateNote(selectedNote.id, {
                title: editTitle,
                content: editContent
            })
        }
    }

    // DELETE - Remove note
    const handleDeleteClick = (note, e) => {
        e.stopPropagation()
        setNoteToDelete(note)
        setShowDeleteConfirm(true)
    }

    const confirmDelete = async () => {
        if (noteToDelete) {
            await deleteNote(noteToDelete.id)
            if (selectedNote?.id === noteToDelete.id) {
                const remainingNotes = notes.filter(n => n.id !== noteToDelete.id)
                setSelectedNote(remainingNotes[0] || null)
            }
            setShowDeleteConfirm(false)
            setNoteToDelete(null)
        }
    }

    // Auto-save on content change (UPDATE)
    useEffect(() => {
        if (selectedNote && (editTitle !== selectedNote.title || editContent !== selectedNote.content)) {
            const timer = setTimeout(() => {
                handleSave()
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [editTitle, editContent])

    return (
        <div className="flex h-[calc(100vh-8rem)] max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-border overflow-hidden">
            {/* Left Sidebar - Notes List */}
            <div className="w-80 border-r border-border flex flex-col bg-gray-50">
                {/* Header */}
                <div className="p-4 border-b border-border bg-white">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold">All Ideas</h2>
                        <div className="flex gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={handleCreateNote}
                                title="Create new note"
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search notes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>

                {/* Notes List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredNotes.length === 0 ? (
                        <div className="p-8 text-center">
                            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-20" />
                            <p className="text-sm text-muted-foreground">
                                {searchQuery ? 'No notes found' : 'No notes yet'}
                            </p>
                        </div>
                    ) : (
                        filteredNotes.map((note) => (
                            <div
                                key={note.id}
                                onClick={() => setSelectedNote(note)}
                                className={cn(
                                    "group p-4 border-b border-border cursor-pointer transition-colors hover:bg-white relative",
                                    selectedNote?.id === note.id ? "bg-white border-l-4 border-l-primary" : "border-l-4 border-l-transparent"
                                )}
                            >
                                <div className="flex items-start justify-between mb-1">
                                    <h3 className="font-medium text-sm line-clamp-1 pr-8">{note.title}</h3>
                                    <button
                                        onClick={(e) => handleDeleteClick(note, e)}
                                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded"
                                        title="Delete note"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </button>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                    {note.content || 'No content'}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Clock className="w-3 h-3" />
                                    {new Date(note.updated_at).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Add New Note Button */}
                <div className="p-4 border-t border-border bg-white">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/5"
                        onClick={handleCreateNote}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Ideas
                    </Button>
                </div>
            </div>

            {/* Right Side - Editor */}
            <div className="flex-1 flex flex-col">
                {selectedNote ? (
                    <>
                        {/* Editor Header */}
                        <div className="p-6 border-b border-border bg-white">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className={cn(
                                        "px-3 py-1 rounded-full text-xs font-medium",
                                        selectedNote.color === 'yellow' && "bg-yellow-100 text-yellow-700",
                                        selectedNote.color === 'blue' && "bg-blue-100 text-blue-700",
                                        selectedNote.color === 'green' && "bg-green-100 text-green-700",
                                        selectedNote.color === 'pink' && "bg-pink-100 text-pink-700",
                                        selectedNote.color === 'purple' && "bg-purple-100 text-purple-700",
                                        selectedNote.color === 'orange' && "bg-orange-100 text-orange-700"
                                    )}>
                                        {selectedNote.color}
                                    </div>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        Last edited {new Date(selectedNote.updated_at).toLocaleTimeString('en-US', {
                                            hour: 'numeric',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleSave}
                                        className="text-xs"
                                    >
                                        <Save className="w-3 h-3 mr-1" />
                                        Save
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-red-500 hover:bg-red-50"
                                        onClick={(e) => handleDeleteClick(selectedNote, e)}
                                        title="Delete note"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Title Input */}
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="w-full text-3xl font-bold border-0 focus:outline-none bg-transparent mb-3"
                                placeholder="Untitled"
                            />

                            {/* Tags */}
                            <div className="flex items-center gap-2">
                                <div className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                                    Note
                                </div>
                                <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">
                                    <Tag className="w-3 h-3 mr-1" />
                                    Add tag
                                </Button>
                            </div>
                        </div>

                        {/* Editor Content */}
                        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full h-full min-h-[400px] border-0 focus:outline-none resize-none text-base leading-relaxed bg-transparent"
                                placeholder="Start writing..."
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-gray-50/30">
                        <div className="text-center">
                            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                            <h3 className="text-lg font-semibold text-muted-foreground mb-2">No note selected</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Select a note from the list or create a new one
                            </p>
                            <Button onClick={handleCreateNote}>
                                <Plus className="w-4 h-4 mr-2" />
                                Create Note
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold mb-2">Delete Note?</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            Are you sure you want to delete "{noteToDelete?.title}"? This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setShowDeleteConfirm(false)
                                    setNoteToDelete(null)
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={confirmDelete}
                                className="bg-red-500 hover:bg-red-600"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Notes
