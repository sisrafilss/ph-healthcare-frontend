'use client';

import { Skeleton } from '../ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface TableSkeletonProps {
  columns: number;
  rows?: number;
  showActions?: boolean;
}

const TableSkeleton = ({ columns = 6, rows = 10, showActions = true }: TableSkeletonProps) => {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {[...Array(columns)].map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-4 w-full" />
              </TableHead>
            ))}
            {showActions && (
              <TableHead className="w-[70px]">
                <Skeleton className="h-4 w-full" />
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(rows)].map((_, rowIdx) => (
            <TableRow key={rowIdx}>
              {[...Array(columns)].map((_, colIdx) => (
                <TableCell key={colIdx}>
                  <div className="flex items-center gap-2">
                    {colIdx === 0 && <Skeleton className="h-10 w-10 rounded-full" />}
                    <Skeleton className="h-4 w-full" />
                  </div>
                </TableCell>
              ))}
              {showActions && (
                <TableCell>
                  <Skeleton className="h-8 w-8 rounded-md" />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSkeleton;
