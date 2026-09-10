import { PublicationDto } from "@teli/contracts/publications";
import { Publication } from "./Publication";
import { css } from "../../styled-system/css";
import { iconButtonClass } from "../utils/iconButtonClass";

interface Props {
  items?: PublicationDto[];
  label: string;
}

export function ReceptionsByType({ items, label }: Props) {
  if (!items?.length) return null;
  return (
    <div className={css({ padding: "s5" })}>
      <h4
        className={`${iconButtonClass} ${css({ fontSize: "s5", color: "grey4", marginBottom: "s4" })}`}
      >
        {label}
      </h4>
      {items.map((item) => (
        <Publication key={item.id} publication={item} displayAs="reception" />
      ))}
    </div>
  );
}
