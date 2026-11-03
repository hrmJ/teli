import { PublicationDto } from "@teli/contracts/publications";
import { ReceptionsByType } from "./ReceptionsByType";

interface Props {
  parentId: string;
  translations?: PublicationDto[];
  reviews?: PublicationDto[];
  adaptations?: PublicationDto[];
  articles?: PublicationDto[];
  other?: PublicationDto[];
  hidden: boolean;
}

export function Receptions({ translations, reviews, adaptations, articles, other, hidden, parentId }: Props) {
  if (hidden) return null;
  return (
    <article>
      <ReceptionsByType items={translations} label="Käännökset" parentId={parentId} />
      <ReceptionsByType items={reviews} label="Arvostelut" parentId={parentId} />
      <ReceptionsByType items={adaptations} label="Adaptaatiot" parentId={parentId} />
      <ReceptionsByType items={articles} label="Artikkelit" parentId={parentId} />
      <ReceptionsByType items={other} label="Muut" parentId={parentId} />
    </article>
  );
}
