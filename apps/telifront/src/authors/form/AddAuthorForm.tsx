import { use, useReducer, useState } from "react";
import { css } from "../../../styled-system/css";
import { Input as InputBase } from "../../components/Input";
import type { NewAuthorDto } from "@teli/contracts/authors";
import { AuthorContext } from "../AuthorContext";
import { validateNewAuthor, validateNewAuthorName } from "./validators";
import { authorFormReducer } from "./authorFormReducer";
import { iconBtnPill } from "../../styles/button";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveNewAuthor } from "../api";
import { Spinner } from "../../components/Spinner";
import { useNavigate } from "@tanstack/react-router";

const Input = InputBase<NewAuthorDto>;

export function AddAuthorForm({ onSuccess }: { onSuccess: () => void }) {
  const [data, dispatch] = useReducer(authorFormReducer, {
    firstName: "",
    lastName: "",
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newAuthor: NewAuthorDto) => {
      return saveNewAuthor(newAuthor);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authorIndex"] });
      onSuccess();
      navigate({
        to: `/author/$author`,
        params: { author: `${data.lastName.trim()} ${data.firstName.trim()}` },
      });
    },
  });

  const { firstName, lastName } = data;

  const { authorMap } = use(AuthorContext);

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const inputConsts = {
    data,
    dispatch: (field: string, value: unknown) => {
      setValidationErrors([]);
      dispatch({ type: "updateAuthorField", field, value });
    },
  };

  if (mutation.isPending) {
    return <Spinner />;
  }

  return (
    <div className={css({ fontSize: "s4", padding: "s2", gap: "s7", color: "grey4" })}>
      <form>
        {mutation.isError ? (
          <div className={css({ padding: "s3", borderRadius: "sm", background: "rose.100", marginBottom: "s2" })}>
            Tallennus epäonnistui.
          </div>
        ) : null}

        <h2 className={css({ fontSize: "s8", color: "grey3", textAlign: "left" })}>Uusi tekijä</h2>

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
            validate={() => validateNewAuthorName(authorMap, { firstName, lastName })}
          />
          <Input
            {...inputConsts}
            name="firstName"
            label={"Etunimi tai etunimet"}
            validate={() => validateNewAuthorName(authorMap, { firstName, lastName })}
          />
          <Input {...inputConsts} name="otherNames" label={"Muut nimet"} />
          <Input {...inputConsts} name="pseudonyms" label={"Pseudonyymit"} />
          <Input {...inputConsts} name="yearOfBirth" type="number" label={"Syntymävuosi"} />
          <Input {...inputConsts} name="yearOfDeath" type="number" label={"Kuolinvuosi"} />
          <Input {...inputConsts} name="language" label={"Kieli"} />
          <Input {...inputConsts} name="country" label={"Maa, jossa aktiivinen"} />
          <Input {...inputConsts} name="biographicalDetails" label={"Elämäkerrallisia tietoja"} />
        </div>

        {validationErrors.length ? (
          <ul className={css({ padding: "s3", borderRadius: "sm", background: "rose.100" })}>
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
          disabled={Boolean(validationErrors?.length)}
          onClick={(ev) => {
            ev.preventDefault();
            const nameError = validateNewAuthorName(authorMap, { firstName, lastName });
            const nameErrors = nameError ? [nameError] : [];
            const yearOfBirth = data.yearOfBirth ? Number(data.yearOfBirth) : undefined;
            const yearOfDeath = data.yearOfDeath ? Number(data.yearOfDeath) : undefined;
            const finalData = { ...data, yearOfBirth, yearOfDeath };
            const errors = [...nameErrors, ...validateNewAuthor(finalData)];
            if (!errors.length) {
              mutation.mutate(finalData);
              return;
            }
            setValidationErrors(errors);
          }}
        >
          <ArrowUpTrayIcon className={css({ width: "s4", height: "s4" })} />
          Tallenna
        </button>
      </form>
    </div>
  );
}
