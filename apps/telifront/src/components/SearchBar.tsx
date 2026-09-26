import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { css } from "../../styled-system/css";
import { iconBtnPill } from "../styles/button";

interface Props {
  searchVal: string;
  setSearchVal: (val: string) => void;
  searchFunction: (val: string) => Promise<void>;
}

export function SearchBar({ searchVal, setSearchVal, searchFunction }: Props) {
  return (
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
        value={searchVal}
        onChange={(ev) => setSearchVal(ev.target.value)}
      />

      <button
        className={css(iconBtnPill, {
          width: "s10",
          justifyContent: "center",
        })}
        onClick={(e) => {
          e.preventDefault();
          searchFunction(searchVal);
        }}
      >
        <MagnifyingGlassIcon
          className={css({
            width: "s4",
            height: "s4",
          })}
        />
        Etsi
      </button>
    </div>
  );
}
