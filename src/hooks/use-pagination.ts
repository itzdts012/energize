import { useState, useMemo } from "react"

interface UsePaginationProps<T> {
  data: T[]
  initialPageSize?: number
}

export function usePagination<T>({
  data,
  initialPageSize = 10,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return data.slice(startIndex, endIndex)
  }, [data, currentPage, pageSize])

  const totalPages = Math.ceil(data.length / pageSize)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize)
    setCurrentPage(1) // Reset to first page when changing page size
  }

  return {
    currentPage,
    pageSize,
    totalPages,
    paginatedData,
    totalItems: data.length,
    handlePageChange,
    handlePageSizeChange,
  }
}
