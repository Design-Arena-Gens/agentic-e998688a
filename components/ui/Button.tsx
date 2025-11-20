import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
}

const cx = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ");

export function Button({
  variant = "primary",
  size = "md",
  leadingIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(styles.button, styles[variant], styles[size], className)}
      type={props.type ?? "button"}
      {...props}
    >
      {leadingIcon ? <span className={styles.leading}>{leadingIcon}</span> : null}
      {children}
    </button>
  );
}
