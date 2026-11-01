import { css, Styles } from "../../styled-system/css";

interface Props {
  placeholder?: string;
}

export const className = css.raw({
  "& input[type=checkbox]": {
    height: 0,
    width: 0,
    visibility: "hidden",
  },
  "& label": {
    cursor: "pointer",
    textIndent: "-9999px",
    width: "30px",
    height: "18px",
    background: "grey",
    display: "block",
    borderRadius: "100px",
    position: "relative",
    _after: {
      content: '""',
      position: "absolute",
      top: "2px",
      left: "2px",
      width: "14px",
      height: "14px",
      background: "#fff",
      borderRadius: "50%",
      transition: "0.3s",
    },
    _active: {
      _after: {
        width: "20px", // Expands knob slightly when pressed
      },
    },
  },
  "& input:checked + label": {
    background: "#bada55",
    _after: {
      left: "calc(100% - 2px)",
      transform: "translateX(-100%)", // Moves knob smoothly to the right
    },
  },
  display: "flex",
  alignItems: "center",
});

export function Toggle(props: { checked: boolean; onChange: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement> }) {
  return (
    <div className={css(className)}>
      <input type="checkbox" id="switch" onChange={props.onChange} checked={props.checked} />
      <label htmlFor="switch">Toggle</label>
    </div>
  );
}
