import { useRef, type ReactNode } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  open: boolean;
  toggle: () => void;
}

export function Modal({ children, open, toggle }: ModalProps) {
  if (!open) return null;

  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as Node;
    if (target === contentRef.current || contentRef.current?.contains(target)) {
      return;
    }
    toggle();
  };
    

  return (
    <div className={styles.overlay} onClick={(e) => handleClickOutside(e)}>
      <div className={styles.modal} ref={contentRef}>
        <button onClick={toggle} className={styles.closeButton}>
          &times;
        </button>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
