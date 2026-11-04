import { PublicationDto } from "@teli/contracts/publications";
import { Publication } from "./Publication";
import { css } from "../../styled-system/css";
import { iconButtonClass } from "../utils/iconButtonClass";
import { ReceptionType } from "@teli/contracts/receptions";

interface Props {
  items?: PublicationDto[];
  label: string;
  parentId: string;
  parentTitle?: string;
  receptionType: ReceptionType;
}

export function ReceptionsByType({ items, label, parentId, parentTitle, receptionType }: Props) {
  if (!items?.length) return null;
  return (
    <div className={css({ padding: "s5" })}>
      <h4 className={`${iconButtonClass} ${css({ fontSize: "s5", color: "grey4", marginBottom: "s4" })}`}>{label}</h4>
      {items.map((item) => (
        <Publication
          key={item.id}
          publication={item}
          displayAs="reception"
          parentId={parentId}
          parentTitle={parentTitle}
          receptionType={receptionType}
        />
      ))}
    </div>
  );
}
