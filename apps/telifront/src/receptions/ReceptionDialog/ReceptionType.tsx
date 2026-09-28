import { ActionDispatch, ChangeEvent } from "react";
import { css } from "../../../styled-system/css";
import { labelContainer } from "../../styles/label";
import { ReceptionFormAction, ReceptionType } from "./receptionFormReducer";

interface Props {
  selectedType: ReceptionType;
  dispatch: ActionDispatch<[action: ReceptionFormAction]>;
}

function selectType(dispatch: (action: ReceptionFormAction) => void) {
  return (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const value = event.target.value;
    if (
      value !== "translation" &&
      value !== "adaptation" &&
      value !== "review" &&
      value !== "article" &&
      value !== "other"
    ) {
      throw new Error("Invalid reception type selected");
    }
    dispatch({ type: "editType", receptionType: value });
  };
}

export function ReceptionType({ selectedType, dispatch }: Props) {
  return (
    <fieldset>
      <legend className={css({ marginBottom: "s3", fontWeight: "s3" })}>
        Reseption tyyppi
      </legend>
      <div className={css(labelContainer)}>
        <input
          type="radio"
          id="translation"
          name="receptionType"
          value="translation"
          checked={selectedType === "translation"}
          onChange={selectType(dispatch)}
        />
        <label htmlFor="translation">Käännös</label>
      </div>

      <div className={css(labelContainer)}>
        <input
          type="radio"
          id="review"
          name="receptionType"
          value="review"
          checked={selectedType === "review"}
          onChange={selectType(dispatch)}
        />
        <label htmlFor="review">Arvostelu</label>
      </div>

      <div className={css(labelContainer)}>
        <input
          type="radio"
          id="adaptation"
          name="receptionType"
          value="adaptation"
          checked={selectedType === "adaptation"}
          onChange={selectType(dispatch)}
        />
        <label htmlFor="adaptation">Adaptaatio</label>
      </div>

      <div className={css(labelContainer)}>
        <input
          type="radio"
          id="article"
          name="receptionType"
          value="article"
          checked={selectedType === "article"}
          onChange={selectType(dispatch)}
        />
        <label htmlFor="article">Artikkeli</label>
      </div>

      <div className={css(labelContainer)}>
        <input
          type="radio"
          id="other"
          name="receptionType"
          value="other"
          checked={selectedType === "other"}
          onChange={selectType(dispatch)}
        />
        <label htmlFor="other">Muu</label>
      </div>
    </fieldset>
  );
}
