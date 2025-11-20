import { ReactNode } from "react";
import styles from "./Badge.module.css";

type BadgeVariant = "solid" | "subtle" | "outline";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const cx = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ");

export function Badge({ variant = "subtle", children, className }: BadgeProps) {
  return <span className={cx(styles.badge, styles[variant], className)}>{children}</span>;
}
