import { ReceptionDto } from "@teliapi/contracts/receptions";

export function hasReceptions(receptions?: ReceptionDto) {
  if (!receptions) return false;
  return Object.values(receptions).some(
    (receptionType) => receptionType.length > 0,
  );
}

export function numberOfReceptions(receptions?: ReceptionDto) {
  if (!receptions) return false;
  return Object.values(receptions).reduce(
    (agg, receptionType) => agg + receptionType.length,
    0,
  );
}
