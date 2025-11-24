import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface MuiStylePaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number; // how many pages to show around current
}

export function MuiStylePagination({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
}: MuiStylePaginationProps) {
  if (totalPages <= 1) return null;

  const createRange = (start: number, end: number) => {
    const range: (number | string)[] = [];
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  };

  const paginationRange = (): (number | string)[] => {
    const totalNumbers = siblingCount * 2 + 5;
    if (totalPages <= totalNumbers) {
      return createRange(1, totalPages);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 2;

    const firstPage = 1;
    const lastPage = totalPages;

    if (!showLeftDots && showRightDots) {
      const leftRange = createRange(1, 3 + 2 * siblingCount);
      return [...leftRange, "...", lastPage];
    }

    if (showLeftDots && !showRightDots) {
      const rightRange = createRange(totalPages - (3 + 2 * siblingCount) + 1, totalPages);
      return [firstPage, "...", ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = createRange(leftSibling, rightSibling);
      return [firstPage, "...", ...middleRange, "...", lastPage];
    }

    return [];
  };

  const pages = paginationRange();

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          />
        </PaginationItem>

        {pages.map((page, i) =>
          page === "..." ? (
            <PaginationItem key={i}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
