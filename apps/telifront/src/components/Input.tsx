import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import { css } from "../../styled-system/css";
import { baseInpt } from "../styles/input";

type DispatchFn = (fieldName: string, value: unknown) => void;

function updateField(dispatch: DispatchFn) {
  return (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    dispatch(e.target.name, e.target.value);
  };
}

type Props<T> = InputHTMLAttributes<HTMLInputElement> & {
  name: keyof T;
  label: string;
  data?: { [k in keyof T]: unknown };
  dispatch: DispatchFn;
  fieldType?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  validate?: (value: string | number | Date | undefined) => string | undefined;
};

function compileInputValue(value: unknown) {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string" || typeof value === "number") return value;
  return;
}

export function Input<T>({
  data,
  label,
  dispatch,
  validate,
  ...attributes
}: Props<T>) {
  const onChange = updateField(dispatch);
  const value = compileInputValue(data?.[attributes.name]);
  const [error, setError] = useState("");
  return (
    <div
      className={css({
        display: "flex",
        flexDir: "column",
        alignItems: "flex-start",
        width: "100%",
      })}
    >
      <label>{label}</label>
      <input
        type="text"
        className={css(baseInpt)}
        onChange={onChange}
        value={value ?? ""}
        onBlur={() => {
          if (!validate) return;
          const error = validate(value);
          if (error) {
            setError(error);
          } else {
            setError("");
          }
        }}
        {...attributes}
      />
      {error ? <div className={css({ color: "red.400" })}>{error}</div> : null}
    </div>
  );
}
