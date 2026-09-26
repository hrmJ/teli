import { useState } from "react";
import { css } from "../../../styled-system/css";
import { labelContainer } from "../../styles/label";
import { iconBtnPill } from "../../styles/button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface Props {
  placeholder?: string;
}

export function SelectPublication(props: Props) {
  const [pubType, setPubType] = useState("old");

  return (
    <div>
      <fieldset
        className={css({
          display: "flex",
          gap: "s7",
          marginBottom: "s5",
        })}
      >
        <div className={css(labelContainer)}>
          <input
            type="radio"
            id="oldPub"
            name="selectedPub"
            value="old"
            onChange={() => setPubType("old")}
          />
          <label htmlFor="oldPub">Tietokannasta</label>
        </div>

        <div className={css(labelContainer)}>
          <input
            type="radio"
            id="newPub"
            name="selectedPub"
            value="new"
            onChange={() => setPubType("new")}
          />
          <label htmlFor="newPub">Uusi</label>
        </div>
      </fieldset>
      {pubType === "old" ? (
        <div className={css({ display: "flex", gap: "s2" })}>
          <input
            type="search"
            className={css({
              width: "100%",
              background: "white",
              padding: "s1",
              border: "1px solid",
              borderColor: "grey7",
            })}
          />

          <button className={css(iconBtnPill, {})}>
            <MagnifyingGlassIcon
              className={css({ width: "s4", height: "s4" })}
            />
            Etsi
          </button>
        </div>
      ) : (
        <div>Uusi julkaisu</div>
      )}
    </div>
  );
}
