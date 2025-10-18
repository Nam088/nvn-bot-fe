'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
  type RowSelectionState,
} from '@tanstack/react-table';
import { FontDto } from '@/types/font';
import { useState } from 'react';
import { Edit, Trash2, Eye, ChevronUp, ChevronDown, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight, Trash, Edit3 } from 'lucide-react';
import Image from 'next/image';

interface FontTableProps {
  data: FontDto[];
  onEdit: (font: FontDto) => void;
  onDelete: (font: FontDto) => void;
  onView: (font: FontDto) => void;
  onBulkDelete?: (fonts: FontDto[]) => void;
  onBulkUpdate?: (fonts: FontDto[]) => void;
  isLoading?: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
}

const columnHelper = createColumnHelper<FontDto>();

export default function FontTable({ data, onEdit, onDelete, onView, onBulkDelete, onBulkUpdate, isLoading, pagination, onPageChange }: FontTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const columns = [
    columnHelper.display({
      id: 'select',
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
          className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(!!e.target.checked)}
          className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500"
        />
      ),
    }),
    columnHelper.accessor('name', {
      header: 'Tên Font',
      cell: (info) => (
        <div className="font-medium text-blue-900">
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('thumbnail', {
      header: 'Thumbnail',
      cell: (info) => {
        const thumbnail = info.getValue();
        return thumbnail ? (
          <Image
            src={thumbnail}
            alt="Thumbnail"
            width={48}
            height={48}
            className="w-12 h-12 object-cover rounded-md border border-blue-200"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
            <span className="text-gray-400 text-xs">No img</span>
          </div>
        );
      },
    }),
    columnHelper.accessor('tags', {
      header: 'Tags',
      cell: (info) => {
        const tags = info.getValue();
        if (!tags || tags.length === 0) {
          return (
            <span className="text-gray-400 text-xs italic">Không có tag</span>
          );
        }
        return (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-3 py-1.5 rounded-full border border-blue-200 font-medium inline-flex items-center whitespace-nowrap min-h-[24px]"
              >
                {tag}
              </span>
            ))}
            {tags.length > 2 && (
              <span 
                className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full border border-gray-200 font-medium inline-flex items-center whitespace-nowrap min-h-[24px]"
                title={`${tags.slice(2).join(', ')}`}
              >
                +{tags.length - 2}
              </span>
            )}
          </div>
        );
      },
    }),
    columnHelper.accessor('isSupportVietnamese', {
      header: 'Tiếng Việt',
      cell: (info) => {
        const isSupported = info.getValue();
        return (
          <span className={`px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center whitespace-nowrap min-h-[24px] ${
            isSupported 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {isSupported ? 'Có' : 'Không'}
          </span>
        );
      },
    }),
    columnHelper.accessor('isVip', {
      header: 'VIP',
      cell: (info) => {
        const isVip = info.getValue();
        return (
          <span className={`px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center whitespace-nowrap min-h-[24px] ${
            isVip 
              ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
              : 'bg-gray-100 text-gray-800 border border-gray-200'
          }`}>
            {isVip ? 'Có' : 'Không'}
          </span>
        );
      },
    }),
    columnHelper.accessor('isActive', {
      header: 'Trạng thái',
      cell: (info) => {
        const isActive = info.getValue();
        return (
          <span className={`px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center whitespace-nowrap min-h-[24px] ${
            isActive 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {isActive ? 'Hoạt động' : 'Không hoạt động'}
          </span>
        );
      },
    }),
    columnHelper.accessor('createdAt', {
      header: 'Ngày tạo',
      cell: (info) => (
        <span className="text-sm text-gray-600">
          {new Date(info.getValue()).toLocaleDateString('vi-VN')}
        </span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Thao tác',
      cell: (info) => (
        <div className="flex gap-1">
          <button
            onClick={() => onView(info.row.original)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="Xem chi tiết"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onEdit(info.row.original)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="Chỉnh sửa"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(info.row.original)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Xóa"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true, // Enable manual pagination
    pageCount: pagination?.totalPages || 0,
    enableRowSelection: true,
    initialState: {
      pagination: {
        pageIndex: (pagination?.page || 1) - 1, // Convert to 0-based index
        pageSize: pagination?.limit || 10,
      },
    },
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedFonts = selectedRows.map(row => row.original);

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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-200">
      {/* Bulk Actions */}
      {selectedFonts.length > 0 && (
        <div className="bg-blue-50 border-b border-blue-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-800">
              Đã chọn {selectedFonts.length} font
            </span>
            <div className="flex gap-2">
              {onBulkUpdate && (
                <button
                  onClick={() => onBulkUpdate(selectedFonts)}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Edit3 size={14} />
                  Cập nhật đã chọn
                </button>
              )}
              {onBulkDelete && (
                <button
                  onClick={() => onBulkDelete(selectedFonts)}
                  className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                >
                  <Trash size={14} />
                  Xóa đã chọn
                </button>
              )}
              <button
                onClick={() => setRowSelection({})}
                className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300 transition-colors"
              >
                Bỏ chọn
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-50 border-b border-blue-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={`flex items-center gap-2 ${
                          header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <div className="flex flex-col">
                            {header.column.getIsSorted() === 'asc' ? (
                              <ChevronUp size={14} />
                            ) : header.column.getIsSorted() === 'desc' ? (
                              <ChevronDown size={14} />
                            ) : (
                              <div className="flex flex-col">
                                <ChevronUp size={12} className="text-gray-400" />
                                <ChevronDown size={12} className="text-gray-400 -mt-1" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-blue-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-blue-50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-blue-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => onPageChange?.(pagination?.page ? pagination.page - 1 : 1)}
            disabled={!pagination || pagination.page <= 1}
            className="relative inline-flex items-center px-4 py-2 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trước
          </button>
          <button
            onClick={() => onPageChange?.(pagination?.page ? pagination.page + 1 : 1)}
            disabled={!pagination || pagination.page >= pagination.totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sau
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Hiển thị{' '}
              <span className="font-medium">
                {pagination ? (pagination.page - 1) * pagination.limit + 1 : 1}
              </span>{' '}
              đến{' '}
              <span className="font-medium">
                {pagination ? Math.min(pagination.page * pagination.limit, pagination.total) : data.length}
              </span>{' '}
              trong tổng số{' '}
              <span className="font-medium">{pagination?.total || data.length}</span>{' '}
              kết quả
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => onPageChange?.(1)}
                disabled={!pagination || pagination.page <= 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-blue-300 bg-white text-sm font-medium text-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsLeft size={20} />
              </button>
              <button
                onClick={() => onPageChange?.(pagination?.page ? pagination.page - 1 : 1)}
                disabled={!pagination || pagination.page <= 1}
                className="relative inline-flex items-center px-2 py-2 border border-blue-300 bg-white text-sm font-medium text-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => onPageChange?.(pagination?.page ? pagination.page + 1 : 1)}
                disabled={!pagination || pagination.page >= pagination.totalPages}
                className="relative inline-flex items-center px-2 py-2 border border-blue-300 bg-white text-sm font-medium text-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
              <button
                onClick={() => onPageChange?.(pagination?.totalPages || 1)}
                disabled={!pagination || pagination.page >= pagination.totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-blue-300 bg-white text-sm font-medium text-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsRight size={20} />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
