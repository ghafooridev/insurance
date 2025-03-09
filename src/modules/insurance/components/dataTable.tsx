import { useState, useMemo, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'

interface TableData {
  id: string
  [key: string]: string | number
}

interface DataTableProps {
  columns: string[]
  data: TableData[]
  loading: boolean
}
const ROW_PER_PAGE = 5
export default function DataTable({ columns, data, loading }: DataTableProps) {
  const [search, setSearch] = useState('')
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedColumns, setSelectedColumns] = useState<string[]>(columns)

  // Search & Filter Data
  const filteredData = useMemo(() => {
    return data?.filter((row) =>
      selectedColumns?.some((col) =>
        row[col]?.toString().toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, data, selectedColumns])

  // Sort Data
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn]?.toString().toLowerCase() || ''
      const bValue = b[sortColumn]?.toString().toLowerCase() || ''
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    })
  }, [sortColumn, sortOrder, filteredData])

  // Paginate Data
  const totalRows = sortedData?.length
  const totalPages = Math.ceil(totalRows / ROW_PER_PAGE)
  const paginatedData = sortedData?.slice(
    (currentPage - 1) * ROW_PER_PAGE,
    currentPage * ROW_PER_PAGE
  )

  useEffect(() => {
    setSelectedColumns(columns)
  }, [columns])

  return (
    <div className="space-y-6 p-4 mt-10 shadow-lg w-full ">
      {/* Search & Column Selection */}
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Select Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {columns?.map((col) => (
              <DropdownMenuItem
                key={col}
                onClick={() => {
                  setSelectedColumns((prev) =>
                    prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
                  )
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedColumns?.includes(col)}
                  className="mr-2"
                  readOnly
                />
                {col}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {selectedColumns?.map((col) => (
                <TableHead
                  key={col}
                  className="cursor-pointer hover:text-blue-500"
                  onClick={() => {
                    setSortColumn(col)
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                  }}
                >
                  <div className="flex items-center gap-1">
                    {col}
                    {sortColumn === col &&
                      (sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              [...Array(ROW_PER_PAGE)].map((_, i) => (
                <TableRow key={i}>
                  {selectedColumns?.map((col) => (
                    <TableCell key={col}>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : paginatedData?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={selectedColumns?.length} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              paginatedData?.map((row) => {
                return (
                  <TableRow key={row.id}>
                    {selectedColumns?.map((col) => <TableCell key={col}>{row[col]}</TableCell>)}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination & Rows Per Page */}
      <div className="flex justify-between items-center">
        <div>{filteredData?.length} rows found</div>
        <div className="flex items-center space-x-2">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </Button>

          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
