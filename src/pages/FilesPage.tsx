import { useState } from 'react'
import {
  FolderOpen,
  Folder,
  ChevronRight,
  FileText,
  Image,
  Film,
  FileCode,
  Table,
  Archive,
  Upload,
  Search,
  Download,
  MessageSquare,
  Clock,
} from 'lucide-react'

import { boxFiles, folderTree, BoxFile } from '../data/mockData'
import { StatusBadge } from '../components/ui/StatusBadge'

// ─── Types ─────────────────────────────────────────────────────────────────

interface FolderNode {
  name: string
  children: FolderNode[]
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function fileIcon(type: BoxFile['type']) {
  const cls = 'shrink-0'
  switch (type) {
    case 'pdf':
    case 'docx': return <FileText size={16} className={`${cls} text-red-500`} />
    case 'jpg':  return <Image size={16} className={`${cls} text-purple-500`} />
    case 'mp4':  return <Film size={16} className={`${cls} text-blue-500`} />
    case 'ai':
    case 'indd': return <FileCode size={16} className={`${cls} text-orange-500`} />
    case 'xlsx': return <Table size={16} className={`${cls} text-green-600`} />
    case 'zip':  return <Archive size={16} className={`${cls} text-gray-500`} />
    default:     return <FileText size={16} className={`${cls} text-gray-400`} />
  }
}

function typeLabel(type: BoxFile['type']): string {
  return type.toUpperCase()
}

function formatDate(dt: string) {
  const d = new Date(dt)
  return d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })
}

// ─── Folder Tree Node ──────────────────────────────────────────────────────

function FolderTreeNode({
  node,
  depth,
  selectedFolder,
  onSelect,
  expandedSet,
  onToggle,
}: {
  node: FolderNode
  depth: number
  selectedFolder: string
  onSelect: (name: string) => void
  expandedSet: Set<string>
  onToggle: (name: string) => void
}) {
  const hasChildren = node.children.length > 0
  const isExpanded = expandedSet.has(node.name)
  const isSelected = selectedFolder === node.name

  return (
    <div>
      <button
        onClick={() => {
          if (hasChildren) onToggle(node.name)
          onSelect(node.name)
        }}
        className={`flex items-center gap-1.5 w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors ${
          isSelected
            ? 'bg-tk-blue2/10 text-tk-blue2 font-semibold'
            : 'text-tk-grey hover:bg-tk-grey-lt hover:text-tk-blue'
        }`}
        style={{ paddingLeft: `${8 + depth * 14}px` }}
      >
        {hasChildren ? (
          <ChevronRight
            size={13}
            className={`shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
          />
        ) : (
          <span className="w-[13px] shrink-0" />
        )}
        <Folder size={13} className="shrink-0" />
        <span className="truncate text-xs leading-relaxed">{node.name}</span>
      </button>

      {hasChildren && isExpanded && (
        <div>
          {node.children.map(child => (
            <FolderTreeNode
              key={child.name}
              node={child}
              depth={depth + 1}
              selectedFolder={selectedFolder}
              onSelect={onSelect}
              expandedSet={expandedSet}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── File Detail Panel ─────────────────────────────────────────────────────

const APPROVAL_HISTORY = [
  { event: 'Submitted for review', actor: 'Lerato Dlamini', date: '2026-03-07' },
  { event: 'Reviewed by Brand Guardian', actor: 'James Ferreira', date: '2026-03-08' },
  { event: 'Approved by CD', actor: 'James Ferreira', date: '2026-03-08' },
]

function FileDetailPanel({ file, onClose }: { file: BoxFile; onClose: () => void }) {
  return (
    <div className="card mt-4 p-5 animate-fade-in">
      <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-tk-grey-lt flex items-center justify-center">
            {fileIcon(file.type)}
          </div>
          <div>
            <h3 className="font-bold text-tk-blue text-sm leading-tight">{file.name}</h3>
            <p className="text-xs text-tk-grey/60 mt-0.5">{file.path.join(' / ')}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-xs text-tk-grey/50 hover:text-tk-grey underline transition-colors">
          Close
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <div>
          <p className="label mb-1">Type</p>
          <span className="inline-block px-2 py-0.5 bg-tk-blue/10 text-tk-blue text-xs font-bold rounded">{typeLabel(file.type)}</span>
        </div>
        <div>
          <p className="label mb-1">Size</p>
          <p className="text-sm font-semibold text-tk-blue">{file.size}</p>
        </div>
        <div>
          <p className="label mb-1">Version</p>
          <p className="text-sm font-semibold text-tk-blue">{file.version}</p>
        </div>
        <div>
          <p className="label mb-1">Status</p>
          <StatusBadge label={file.status} variant="file" size="md" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Approval History */}
        <div>
          <p className="label mb-3">Approval History</p>
          <div className="space-y-3">
            {APPROVAL_HISTORY.map((event, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${i === APPROVAL_HISTORY.length - 1 ? 'bg-tk-green' : 'bg-tk-blue2'}`}>
                    {i + 1}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-tk-blue">{event.event}</p>
                  <p className="text-xs text-tk-grey/60">{event.actor} · {formatDate(event.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meta */}
        <div>
          <p className="label mb-3">File Details</p>
          <dl className="space-y-2">
            <div className="flex justify-between text-xs">
              <dt className="text-tk-grey/60">Modified</dt>
              <dd className="font-semibold text-tk-blue">{formatDate(file.modified)}</dd>
            </div>
            <div className="flex justify-between text-xs">
              <dt className="text-tk-grey/60">Modified by</dt>
              <dd className="font-semibold text-tk-blue">{file.modifiedBy}</dd>
            </div>
            <div className="flex justify-between text-xs">
              <dt className="text-tk-grey/60">Path</dt>
              <dd className="font-semibold text-tk-blue text-right max-w-[160px] truncate">{file.path.join(' › ')}</dd>
            </div>
          </dl>

          <div className="flex gap-2 mt-4">
            <button className="btn-primary text-xs py-1.5 px-3 gap-1.5">
              <Download size={13} />
              Download
            </button>
            <button className="btn-outline text-xs py-1.5 px-3 gap-1.5">
              <MessageSquare size={13} />
              Request Revision
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────

export function FilesPage() {
  const DEFAULT_FOLDER = 'Samsung S26 Ultra'

  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(['Telkom', 'Campaign Files', 'Samsung S26 Ultra'])
  )
  const [selectedFolder, setSelectedFolder] = useState<string>(DEFAULT_FOLDER)
  const [selectedFile, setSelectedFile] = useState<BoxFile | null>(null)

  function toggleFolder(name: string) {
    setExpandedFolders(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  // Show files only for the Samsung S26 Ultra folder (all boxFiles have that path)
  const visibleFiles = selectedFolder === 'Samsung S26 Ultra' ? boxFiles : []

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* ── LEFT: Folder sidebar ─────────────────────────────────────── */}
      <div className="w-56 shrink-0 bg-white border-r border-tk-border flex flex-col">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-tk-border">
          <FolderOpen size={16} className="text-tk-blue2 shrink-0" />
          <span className="text-sm font-bold text-tk-blue">File Browser</span>
        </div>

        <div className="flex-1 overflow-y-auto py-2 px-2">
          {folderTree.map(node => (
            <FolderTreeNode
              key={node.name}
              node={node}
              depth={0}
              selectedFolder={selectedFolder}
              onSelect={setSelectedFolder}
              expandedSet={expandedFolders}
              onToggle={toggleFolder}
            />
          ))}
        </div>
      </div>

      {/* ── RIGHT: Main content ───────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto bg-tk-grey-lt p-5">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-tk-grey/60 mb-4">
          <span>Telkom</span>
          <ChevronRight size={12} />
          <span>Campaign Files</span>
          <ChevronRight size={12} />
          <span className="text-tk-blue font-semibold">{selectedFolder}</span>
        </nav>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <p className="text-sm text-tk-grey/70">
            {visibleFiles.length} file{visibleFiles.length !== 1 ? 's' : ''} in <span className="font-semibold text-tk-blue">{selectedFolder}</span>
          </p>
          <div className="flex items-center gap-2">
            {/* Search (visual only) */}
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-tk-grey/40" />
              <input
                type="text"
                placeholder="Search files…"
                className="pl-8 pr-3 py-1.5 text-xs border border-tk-border rounded-lg bg-white text-tk-grey placeholder-tk-grey/40 focus:outline-none focus:border-tk-blue2 w-44"
                readOnly
              />
            </div>
            <button className="btn-primary text-xs py-1.5 px-3 gap-1.5">
              <Upload size={13} />
              Upload File
            </button>
          </div>
        </div>

        {/* File list */}
        {visibleFiles.length > 0 ? (
          <div className="card overflow-hidden">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-tk-border bg-tk-grey-lt">
                  <th className="text-left py-3 px-4 label w-8" />
                  <th className="text-left py-3 px-3 label">File Name</th>
                  <th className="text-left py-3 px-3 label w-16">Type</th>
                  <th className="text-left py-3 px-3 label w-16">Version</th>
                  <th className="text-left py-3 px-3 label w-24">Size</th>
                  <th className="text-left py-3 px-3 label w-28">Status</th>
                  <th className="text-left py-3 px-3 label w-32">Modified</th>
                  <th className="text-left py-3 px-3 label w-32">Modified By</th>
                </tr>
              </thead>
              <tbody>
                {visibleFiles.map(file => {
                  const isSelected = selectedFile?.id === file.id
                  return (
                    <tr
                      key={file.id}
                      onClick={() => setSelectedFile(isSelected ? null : file)}
                      className={`border-b border-tk-border last:border-0 cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-tk-blue2/5 border-l-2 border-l-tk-blue2'
                          : 'hover:bg-tk-grey-lt/80'
                      }`}
                    >
                      <td className="py-3 px-4">{fileIcon(file.type)}</td>
                      <td className="py-3 px-3">
                        <span className="text-sm font-semibold text-tk-blue">{file.name}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-block px-2 py-0.5 bg-tk-blue/10 text-tk-blue text-xs font-bold rounded">
                          {typeLabel(file.type)}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-xs text-tk-grey/70 font-mono">{file.version}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-xs text-tk-grey/70">{file.size}</span>
                      </td>
                      <td className="py-3 px-3">
                        <StatusBadge label={file.status} variant="file" />
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1 text-xs text-tk-grey/60">
                          <Clock size={11} />
                          {formatDate(file.modified)}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-xs text-tk-grey/70">{file.modifiedBy}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="card flex flex-col items-center justify-center py-16 text-center">
            <Folder size={32} className="text-tk-grey/30 mb-3" />
            <p className="text-sm text-tk-grey/50">No files in this folder</p>
          </div>
        )}

        {/* File Detail Panel */}
        {selectedFile && (
          <FileDetailPanel file={selectedFile} onClose={() => setSelectedFile(null)} />
        )}
      </div>
    </div>
  )
}
