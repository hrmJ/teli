import { PublicationDto } from "@teli/contracts/publications";
import { ReceptionsByType } from "./ReceptionsByType";

interface Props {
  translations?: PublicationDto[];
  reviews?: PublicationDto[];
  adaptations?: PublicationDto[];
  articles?: PublicationDto[];
  other?: PublicationDto[];
  hidden: boolean;
}

export function Receptions({
  translations,
  reviews,
  adaptations,
  articles,
  other,
  hidden,
}: Props) {
  if (hidden) return null;
  return (
    <article>
      <ReceptionsByType items={translations} label="Käännökset" />
      <ReceptionsByType items={reviews} label="Arvostelut" />
      <ReceptionsByType items={adaptations} label="Adaptaatiot" />
      <ReceptionsByType items={articles} label="Artikkelit" />
      <ReceptionsByType items={other} label="Muut" />
    </article>
  );
}
