'use client';

import styles from "./Switch.module.css";

const cx = (...classes: (string | undefined | false)[]) => classes.filter(Boolean).join(" ");

export interface SwitchProps {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  id?: string;
  hideLabel?: boolean;
}

export function Switch({ checked, onCheckedChange, label, id, hideLabel = false }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      id={id}
      className={cx(styles.switch, hideLabel && styles.compact)}
      onClick={() => onCheckedChange?.(!checked)}
    >
      <span className={cx(styles.trigger, checked && styles.checked)} aria-hidden />
      {!hideLabel && label ? <span>{label}</span> : null}
    </button>
  );
}
