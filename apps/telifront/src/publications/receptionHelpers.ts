import { ReceptionDto, type ReceptionType } from "@teli/contracts/receptions";

export function hasReceptions(receptions?: ReceptionDto) {
  if (!receptions) return false;
  return Object.values(receptions).some((receptionType) => receptionType.length > 0);
}

export function numberOfReceptions(receptions?: ReceptionDto) {
  if (!receptions) return false;
  return Object.values(receptions).reduce((agg, receptionType) => agg + receptionType.length, 0);
}

export function compileReceptionTypeQuery(receptionType?: Record<ReceptionType, boolean>) {
  // If no reception value or all are checked, skip the reception type query altogether
  if (!receptionType) return "";
  if (Object.values(receptionType).every(Boolean)) return "";
  const paramName = "&receptionType=";
  const queryString = Object.entries(receptionType)
    .filter(([_, value]) => value)
    .map(([key, _]) => key)
    .join(paramName);
  if (!queryString) return "";

  return `${paramName}${queryString}`;
}
