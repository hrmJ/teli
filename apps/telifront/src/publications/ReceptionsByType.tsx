import { PublicationDto } from "@teliapi/contracts/publications";
import { Publication } from "./Publication";

interface Props {
  items?: PublicationDto[];
  label: string;
}

export function ReceptionsByType({ items, label }: Props) {
  if (!items?.length) return null;
  return (
    <div>
      <h4>{label}</h4>
      {items.map((item) => (
        <Publication key={item.id} publication={item} />
      ))}
    </div>
  );
}
