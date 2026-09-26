import { css, Styles } from "../../styled-system/css";

export const linkBtn: Styles = css.raw({
  cursor: "pointer",
  _hover: {
    textDecoration: "underline",
  },
});

export const iconBtn: Styles = css.raw({
  ...linkBtn,
  display: "flex",
  alignItems: "center",
  gap: "s1",
});

export const iconBtnPill: Styles = css.raw({
  ...iconBtn,
  border: "1px solid",
  borderRadius: "sm",
  borderColor: "grey7",
  background: "grey8",
  padding: "s1",
  fontSize: "s3",
});
