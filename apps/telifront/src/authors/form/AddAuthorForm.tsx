import { use, useReducer, useState } from "react";
import { css } from "../../../styled-system/css";
import { Input as InputBase } from "../../components/Input";
import type { NewAuthorDto } from "@teli/contracts/authors";
import { AuthorContext } from "../AuthorContext";
import { validateNewAuthor } from "./validators";
import { authorFormReducer } from "./authorFormReducer";
import { iconBtnPill } from "../../styles/button";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

const Input = InputBase<NewAuthorDto>;

export function AddAuthorForm() {
  const [data, dispatch] = useReducer(authorFormReducer, {
    firstName: "",
    lastName: "",
  });

  const { firstName, lastName } = data;

  const { authorMap } = use(AuthorContext);

  const [validationErrors, setValidationErrors] = useState<
    string[] | undefined
  >(undefined);

  const inputConsts = {
    data,
    dispatch: (field: string, value: unknown) =>
      dispatch({ type: "updateAuthorField", field, value }),
  };

  function validateName() {
    const error = validateNewAuthor(authorMap, { firstName, lastName });
    if (error) {
      setValidationErrors([...(validationErrors ?? []), error]);
    }
    return error;
  }

  return (
    <div
      className={css({
        fontSize: "s4",
        padding: "s2",
        gap: "s7",
        color: "grey4",
      })}
    >
      <form>
        <h2
          className={css({ fontSize: "s8", color: "grey3", textAlign: "left" })}
        >
          Uusi tekijä
        </h2>

        <div
          className={css({
            display: "flex",
            gap: "s3",
            alignItems: "flex-start",
            flexFlow: "column",
            marginTop: "s7",
            marginBottom: "s7",
            width: "80%",
          })}
        >
          <Input
            {...inputConsts}
            data={data}
            name="lastName"
            label={"Sukunimi"}
            validate={validateName}
          />
          <Input
            {...inputConsts}
            name="firstName"
            label={"Etunimi tai etunimet"}
            validate={validateName}
          />
          <Input {...inputConsts} name="otherNames" label={"Muut nimet"} />
          <Input {...inputConsts} name="pseudonyms" label={"Pseudonyymit"} />
          <Input
            {...inputConsts}
            name="yearOfBirth"
            type="number"
            label={"Syntymävuosi"}
          />
          <Input
            {...inputConsts}
            name="yearOfDeath"
            type="number"
            label={"Kuolinvuosi"}
          />
          <Input {...inputConsts} name="language" label={"Kieli"} />
          <Input
            {...inputConsts}
            name="country"
            label={"Maa, jossa aktiivinen"}
          />
          <Input
            {...inputConsts}
            name="biographicalDetails"
            label={"Elämäkerrallisia tietoja"}
          />
        </div>
      </form>

      {validationErrors?.length ? (
        <ul
          className={css({
            padding: "s3",
            borderRadius: "sm",
            background: "rose.100",
          })}
        >
          {validationErrors?.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      ) : null}

      <button
        className={css(iconBtnPill, {
          fontSize: "s3",
          background: "green.600",
          color: "white",
          marginTop: "s4",
        })}
        onClick={(e) => {
          e.preventDefault();
          //SAVE
        }}
        disabled={Boolean(validationErrors?.length)}
      >
        <ArrowUpTrayIcon className={css({ width: "s4", height: "s4" })} />
        Tallenna
      </button>
    </div>
  );
}
