import { ReactNode } from "react";

type defaultTableType = {
    children: ReactNode;
    className?: string;
}

export const Table = ({ children, className = '' }: defaultTableType) => (
  <table className={`w-full ${className}`}>{children}</table>
);

export const TableHead = ({ children, className = '' }: defaultTableType) => (
  <thead className={`border-b border-[var(--colors-gray-100)] ${className}`}>{children}</thead>
);

export const TableBody = ({ children, className = '' }: defaultTableType) => (
  <tbody className={className}>{children}</tbody>
);

export const TableRow = ({ children, className = '' }: defaultTableType) => (
  <tr className={`border-b border-[var(--colors-gray-100)]/50 ${className}`}>{children}</tr>
);

export const TableHeader = ({ children, className = '' }: defaultTableType) => (
  <th className={`font-semibold text-left !py-3 !px-1 ${className}`}>{children}</th>
);

export const TableCell = ({ children, className = '' }: defaultTableType) => (
  <td className={`!py-3 !px-1 ${className}`}>{children}</td>
);