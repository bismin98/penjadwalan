import { Icon } from "@iconify/react";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div 
      className={`backdrop-blur-md bg-white/80 rounded-2xl border border-white/40 shadow-xl p-6 ${className}`}
      style={{
        WebkitBackdropFilter: "blur(12px)",
        backdropFilter: "blur(12px)",
      }}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  icon?: string;
  action?: ReactNode;
}

export function CardHeader({ title, icon, action }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {icon && <Icon icon={icon} className="text-2xl text-[--sea]" />}
        <h2 className="text-xl font-bold text-[--ink]">{title}</h2>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
