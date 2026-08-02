import React, { useState } from 'react';
import { Folder, File, FolderOpen, ChevronRight, ChevronDown } from 'lucide-react';

interface FileNode {
  name: string;
  type: 'folder' | 'file';
  language?: string;
  children?: FileNode[];
}

interface ProjectFilesProps {
  files: FileNode[];
}

const FileIcon: React.FC<{ name: string; language?: string }> = ({ name, language }) => {
  const extColors: Record<string, string> = {
    sql: 'text-blue-500', tsx: 'text-cyan-500', ts: 'text-blue-400',
    js: 'text-yellow-500', json: 'text-gray-400', md: 'text-gray-500',
    png: 'text-rose-400', ico: 'text-orange-400', html: 'text-orange-500',
    pdf: 'text-red-500',
  };
  const ext = name.split('.').pop() || '';
  return <span className={`text-[11px] font-mono font-bold ${extColors[ext] || 'text-gray-400'}`}>.{ext}</span>;
};

const TreeNode: React.FC<{ node: FileNode; depth: number }> = ({ node, depth }) => {
  const [open, setOpen] = useState(depth < 1);
  const isFolder = node.type === 'folder';

  return (
    <>
      <div
        onClick={() => isFolder && setOpen(!open)}
        className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-gray-100 transition cursor-pointer group"
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        {isFolder ? (
          <>
            {open ? <ChevronDown size={12} className="text-gray-400 shrink-0" /> : <ChevronRight size={12} className="text-gray-400 shrink-0" />}
            {open ? <FolderOpen size={14} className="text-amber-500 shrink-0" /> : <Folder size={14} className="text-amber-400 shrink-0" />}
          </>
        ) : (
          <>
            <span className="w-3 shrink-0" />
            <File size={14} className="text-gray-400 shrink-0" />
          </>
        )}
        <span className="text-xs text-gray-700 font-medium">{node.name}</span>
        {!isFolder && <FileIcon name={node.name} language={node.language} />}
      </div>
      {isFolder && open && node.children?.map((child, i) => (
        <TreeNode key={`${child.name}-${i}`} node={child} depth={depth + 1} />
      ))}
    </>
  );
};

export const ProjectFiles: React.FC<ProjectFilesProps> = ({ files }) => (
  <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-2 font-mono text-xs">
    {files.map((node, i) => (
      <TreeNode key={`${node.name}-${i}`} node={node} depth={0} />
    ))}
  </div>
);
