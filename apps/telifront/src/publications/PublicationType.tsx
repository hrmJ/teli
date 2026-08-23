import {
  BookOpenIcon,
  NewspaperIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { css } from "../../styled-system/css";

interface Props {
  genre?: string;
  documentType?: string;
}

function pickIcon(documentType?: string) {
  if (documentType === "book") return BookOpenIcon;
  if (documentType?.includes("novel")) return BookOpenIcon;
  if (documentType?.includes("newspaper") || documentType?.includes("journal"))
    return NewspaperIcon;
  return PencilIcon;
}

function formatText(genre?: string, documentType?: string) {
  if (!documentType && genre) return genre;
  if (documentType && !genre) return documentType;
  return `${documentType} / ${genre}`;
}

export function PublicationType({ genre, documentType }: Props) {
  const Icon = pickIcon(documentType);
  if (!genre && !documentType) return;
  return (
    <div
      className={css({
        display: "flex",
        gap: "s1",
        alignItems: "center",
      })}
    >
      <Icon className={css({ width: "s3", height: "s3" })} />
      <p>{formatText(genre, documentType)}</p>
    </div>
  );
}
