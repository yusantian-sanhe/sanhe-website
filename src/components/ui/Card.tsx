import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100 ${className}`}>
      {children}
    </div>
  );
}