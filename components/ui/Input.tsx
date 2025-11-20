import { InputHTMLAttributes, ReactNode } from "react";
import styles from "./Input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  icon?: ReactNode;
}

const cx = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ");

export function Input({ label, hint, icon, className, ...props }: InputProps) {
  return (
    <label className={styles.field}>
      {label ? (
        <span className={styles.labelRow}>
          {label}
          {props.required ? <span>*</span> : null}
        </span>
      ) : null}
      <span className={styles.inputWrapper}>
        {icon ? <span className={styles.icon}>{icon}</span> : null}
        <input
          className={cx(styles.input, className)}
          {...props}
          type={props.type ?? "text"}
          placeholder={props.placeholder ?? "Enter a value"}
        />
      </span>
      {hint ? <span className={styles.hint}>{hint}</span> : null}
    </label>
  );
}
