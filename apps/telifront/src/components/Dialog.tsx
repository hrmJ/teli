import { ReactNode, useLayoutEffect, useRef } from "react";
import { css, Styles } from "../../styled-system/css";
import { iconBtn, linkBtn } from "../styles/button";

interface Props {
  close: () => void;
  children: ReactNode;
  styles?: Styles;
}

export function Dialog({ close, children, styles }: Props) {
  useLayoutEffect(() => {
    if (!dialogRef.current) return;
    dialogRef.current.showModal();
  }, []);

  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <dialog
      style={{
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "50%",
      }}
      className={css(
        {
          padding: "s4",
          background: "grey9",
          boxShadow: "sm",
          borderRadius: "sm",
        },
        styles,
      )}
      ref={dialogRef}
    >
      {children}
      <footer
        className={css({
          borderTop: "1px solid",
          borderTopColor: "grey7",
          marginTop: "s5",
          paddingTop: "s2",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        })}
      >
        <button
          className={css(iconBtn, { fontSize: "s3", color: "grey3" })}
          onClick={() => close()}
        >
          Sulje
        </button>
      </footer>
    </dialog>
  );
}
