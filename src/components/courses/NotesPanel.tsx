import React, { useState } from 'react';
import { Plus, X, Edit3, Trash2, Clock } from 'lucide-react';
import { CourseNote } from '../../types/courses';

interface NotesPanelProps {
  notes: CourseNote[];
  onAdd: (content: string) => void;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}

export const NotesPanel: React.FC<NotesPanelProps> = ({ notes, onAdd, onUpdate, onDelete }) => {
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleAdd = () => {
    if (newNote.trim()) {
      onAdd(newNote.trim());
      setNewNote('');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <textarea value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Write a note..."
          className="glass-input flex-1 text-xs p-2.5 resize-none h-20" />
        <button onClick={handleAdd} disabled={!newNote.trim()}
          className="bg-violet-600 hover:bg-violet-700 disabled:bg-gray-200 text-white px-3 rounded-xl transition shrink-0">
          <Plus size={16} />
        </button>
      </div>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {notes.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-4">No notes yet. Start writing above.</p>
        ) : notes.map(n => (
          <div key={n.id} className="bg-white border border-gray-100 rounded-xl p-3 group">
            {editingId === n.id ? (
              <div className="space-y-2">
                <textarea value={editContent} onChange={e => setEditContent(e.target.value)}
                  className="glass-input w-full text-xs p-2 resize-none h-16" autoFocus />
                <div className="flex gap-2">
                  <button onClick={() => { onUpdate(n.id, editContent); setEditingId(null); }}
                    className="text-xs bg-violet-600 text-white px-3 py-1 rounded-lg">Save</button>
                  <button onClick={() => setEditingId(null)} className="text-xs text-gray-500 px-3 py-1 rounded-lg hover:bg-gray-100">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-xs text-gray-700 whitespace-pre-wrap">{n.content}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[9px] text-gray-400 flex items-center gap-1">
                    <Clock size={10} /> {new Date(n.updatedAt).toLocaleDateString()}
                  </span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button onClick={() => { setEditingId(n.id); setEditContent(n.content); }}
                      className="p-1 rounded hover:bg-gray-100 text-gray-400"><Edit3 size={12} /></button>
                    <button onClick={() => onDelete(n.id)}
                      className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
