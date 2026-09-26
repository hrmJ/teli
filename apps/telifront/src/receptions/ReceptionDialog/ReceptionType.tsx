import { css } from "../../../styled-system/css";
import { labelContainer } from "../../styles/label";

interface Props {
  placeholder?: string;
}

export function ReceptionType(props: Props) {
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
        />
        <label htmlFor="translation">Käännös</label>
      </div>

      <div className={css(labelContainer)}>
        <input type="radio" id="review" name="receptionType" value="review" />
        <label htmlFor="review">Arvostelu</label>
      </div>

      <div className={css(labelContainer)}>
        <input
          type="radio"
          id="adaptation"
          name="receptionType"
          value="adaptation"
        />
        <label htmlFor="adaptation">Adaptaatio</label>
      </div>

      <div className={css(labelContainer)}>
        <input type="radio" id="article" name="receptionType" value="article" />
        <label htmlFor="article">Artikkeli</label>
      </div>

      <div className={css(labelContainer)}>
        <input type="radio" id="other" name="receptionType" value="other" />
        <label htmlFor="other">Muu</label>
      </div>
    </fieldset>
  );
}
