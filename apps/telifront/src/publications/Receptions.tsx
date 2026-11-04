import { PublicationDto } from "@teli/contracts/publications";
import { ReceptionsByType } from "./ReceptionsByType";

interface Props {
  parentId: string;
  parentTitle?: string;
  translations?: PublicationDto[];
  reviews?: PublicationDto[];
  adaptations?: PublicationDto[];
  articles?: PublicationDto[];
  other?: PublicationDto[];
  hidden: boolean;
}

export function Receptions({ translations, reviews, adaptations, articles, other, hidden, parentId, parentTitle }: Props) {
  if (hidden) return null;
  return (
    <article>
      <ReceptionsByType
        parentTitle={parentTitle}
        items={translations}
        label="Käännökset"
        parentId={parentId}
        receptionType="translation"
      />
      <ReceptionsByType parentTitle={parentTitle} items={reviews} label="Arvostelut" parentId={parentId} receptionType="review" />
      <ReceptionsByType
        parentTitle={parentTitle}
        items={adaptations}
        label="Adaptaatiot"
        parentId={parentId}
        receptionType="adaptation"
      />
      <ReceptionsByType parentTitle={parentTitle} items={articles} label="Artikkelit" parentId={parentId} receptionType="article" />
      <ReceptionsByType parentTitle={parentTitle} items={other} label="Muut" parentId={parentId} receptionType="other" />
    </article>
  );
}
