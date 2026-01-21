import React, { useState } from 'react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { useNoteStore } from '../../store/noteStore'
import { Palette, FileText } from 'lucide-react'

const AddNoteModal = ({ isOpen, onClose }) => {
    const addNote = useNoteStore((state) => state.addNote)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        color: 'yellow'
    })

    const colors = [
        { name: 'yellow', bg: 'bg-yellow-200', border: 'border-yellow-300' },
        { name: 'blue', bg: 'bg-blue-200', border: 'border-blue-300' },
        { name: 'green', bg: 'bg-green-200', border: 'border-green-300' },
        { name: 'pink', bg: 'bg-pink-200', border: 'border-pink-300' },
        { name: 'purple', bg: 'bg-purple-200', border: 'border-purple-300' },
        { name: 'orange', bg: 'bg-orange-200', border: 'border-orange-300' },
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await addNote(formData)
            onClose()
            setFormData({ title: '', content: '', color: 'yellow' })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Note">
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        Note Title
                    </label>
                    <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Enter note title..."
                        required
                        className="text-base"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Content</label>
                    <Textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Write your note here..."
                        rows={6}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <Palette className="w-4 h-4 text-muted-foreground" />
                        Color
                    </label>
                    <div className="flex gap-2 flex-wrap">
                        {colors.map((color) => (
                            <button
                                key={color.name}
                                type="button"
                                onClick={() => setFormData({ ...formData, color: color.name })}
                                className={`w-10 h-10 rounded-lg border-2 transition-all ${color.bg} ${formData.color === color.name
                                        ? 'border-primary ring-2 ring-primary/20 scale-110'
                                        : 'border-transparent hover:border-gray-300'
                                    }`}
                                title={color.name}
                            />
                        ))}
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-border">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading} className="min-w-[100px]">
                        {loading ? 'Creating...' : 'Create Note'}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default AddNoteModal
