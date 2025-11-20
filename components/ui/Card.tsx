import { ReactNode } from "react";
import styles from "./Card.module.css";

export interface CardProps {
  title: string;
  meta?: string;
  children: ReactNode;
  className?: string;
}

const cx = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ");

export function Card({ title, meta, children, className }: CardProps) {
  return (
    <article className={cx(styles.card, className)}>
      {meta ? <span className={styles.meta}>{meta}</span> : null}
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.body}>{children}</div>
    </article>
  );
}
