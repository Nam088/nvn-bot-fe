'use client';

import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AutoReplyDto } from '@/types/autoReply';
import { GripVertical, Edit, Trash2, Eye, Hash, MessageSquare, Key } from 'lucide-react';

interface AutoReplyTableProps {
  data: AutoReplyDto[];
  onEdit: (autoReply: AutoReplyDto) => void;
  onDelete: (autoReply: AutoReplyDto) => void;
  onView: (autoReply: AutoReplyDto) => void;
  onReorder: (updates: { id: string; priority: number }[]) => void;
  isLoading?: boolean;
}

interface SortableRowProps {
  autoReply: AutoReplyDto;
  onEdit: (autoReply: AutoReplyDto) => void;
  onDelete: (autoReply: AutoReplyDto) => void;
  onView: (autoReply: AutoReplyDto) => void;
}

function SortableRow({ autoReply, onEdit, onDelete, onView }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: autoReply.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`hover:bg-blue-50 transition-colors cursor-pointer ${
        isDragging ? 'bg-blue-100 shadow-lg ring-2 ring-blue-400 z-50' : ''
      }`}
      onClick={() => onView(autoReply)}
    >
      {/* Drag Handle - Left */}
      <td 
        className="px-4 py-4 whitespace-nowrap"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-blue-600 p-1 rounded hover:bg-blue-100 transition-colors"
          {...attributes}
          {...listeners}
          title="Kéo để sắp xếp lại"
        >
          <GripVertical size={20} />
        </button>
      </td>

      {/* Priority */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <Hash size={14} className="text-gray-400" />
          <span className="font-mono text-sm font-medium text-blue-900">
            {autoReply.priority}
          </span>
        </div>
      </td>

      {/* Message */}
      <td className="px-6 py-4">
        <div className="flex items-start gap-2 max-w-md">
          <MessageSquare size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-900 line-clamp-2">
            {autoReply.message}
          </p>
        </div>
      </td>

      {/* Keywords */}
      <td className="px-6 py-4">
        <div className="flex items-start gap-2">
          <Key size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="flex flex-wrap gap-1.5 max-w-xs">
            {autoReply.keywords.slice(0, 3).map((keyword, index) => (
              <span
                key={index}
                className="bg-purple-100 text-purple-800 text-xs px-2.5 py-1 rounded-full border border-purple-200 font-medium"
              >
                {keyword}
              </span>
            ))}
            {autoReply.keywords.length > 3 && (
              <span
                className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full border border-gray-200 font-medium"
                title={autoReply.keywords.slice(3).join(', ')}
              >
                +{autoReply.keywords.length - 3}
              </span>
            )}
          </div>
        </div>
      </td>

      {/* Default */}
      <td className="px-6 py-4 whitespace-nowrap">
        {autoReply.isDefault && (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
            Default
          </span>
        )}
      </td>

      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
            autoReply.isActive
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          {autoReply.isActive ? 'Hoạt động' : 'Tắt'}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
        <div className="flex gap-1">
          <button
            onClick={() => onView(autoReply)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="Xem chi tiết"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onEdit(autoReply)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="Chỉnh sửa"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(autoReply)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Xóa"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>

      {/* Drag Handle - Right */}
      <td 
        className="px-4 py-4 whitespace-nowrap"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-blue-600 p-1 rounded hover:bg-blue-100 transition-colors"
          {...attributes}
          {...listeners}
          title="Kéo để sắp xếp lại"
        >
          <GripVertical size={20} />
        </button>
      </td>
    </tr>
  );
}

export default function AutoReplyTable({
  data,
  onEdit,
  onDelete,
  onView,
  onReorder,
  isLoading,
}: AutoReplyTableProps) {
  const [items, setItems] = useState(data);

  // Update items when data changes
  useEffect(() => {
    setItems(data);
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px of movement required to start drag
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);

      // Calculate new priorities (1-based)
      const updates = newItems.map((item, index) => ({
        id: item.id,
        priority: index + 1,
      }));

      // Call the onReorder callback with all updates
      onReorder(updates);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-blue-200">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-blue-200">
        <div className="p-8 text-center">
          <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Chưa có auto-reply nào</p>
          <p className="text-sm text-gray-400 mt-2">Tạo auto-reply đầu tiên để bắt đầu</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-200">
      {/* Header Info */}
      <div className="bg-blue-50 border-b border-blue-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-blue-900">
              Quản lý Auto-Reply
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Kéo thả để sắp xếp ưu tiên • Priority thấp hơn = ưu tiên cao hơn
            </p>
          </div>
          <div className="text-sm text-blue-700 font-medium">
            Tổng: {items.length} auto-reply
          </div>
        </div>
      </div>

      {/* Table */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
          <thead className="bg-blue-50 border-b border-blue-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider w-12" title="Kéo để sắp xếp">
                <GripVertical size={16} className="text-gray-400" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                Tin nhắn trả lời
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                Keywords
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                Default
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                Thao tác
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider w-12" title="Kéo để sắp xếp">
                <GripVertical size={16} className="text-gray-400" />
              </th>
            </tr>
          </thead>
            <tbody className="bg-white divide-y divide-blue-200">
              <SortableContext
                items={items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                {items.map((autoReply) => (
                  <SortableRow
                    key={autoReply.id}
                    autoReply={autoReply}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onView={onView}
                  />
                ))}
              </SortableContext>
            </tbody>
          </table>
        </div>
      </DndContext>

      {/* Footer Info */}
      <div className="bg-gray-50 border-t border-blue-200 px-6 py-3">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
              <span>Hoạt động</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
              <span>Tắt</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-amber-100 border border-amber-200 rounded"></div>
              <span>Default</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <span>💡 Tip:</span>
            <GripVertical size={12} className="inline text-gray-400" />
            <span>Kéo ở 2 bên để sắp xếp dễ dàng</span>
          </div>
        </div>
      </div>
    </div>
  );
}

