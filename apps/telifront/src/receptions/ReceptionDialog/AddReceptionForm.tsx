import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/solid";
import { css } from "../../../styled-system/css";
import { iconBtnPill } from "../../styles/button";
import { ReceptionType } from "./ReceptionType";
import { useReducer, useState } from "react";
import { numberCircle } from "../../styles/numbercircle";
import { SelectPublication } from "./SelectPublication";
import { receptionFormReducer } from "./receptionFormReducer";
import { Summary } from "./Summary";

interface Props {
  to: string;
}

export function AddReceptionForm({ to }: Props) {
  const [state, dispatch] = useReducer(receptionFormReducer, {
    receptionType: "translation",
    createNewPublication: false,
    newOrExistingPublication: "existing",
  });

  const steps = [
    {
      element: (
        <ReceptionType dispatch={dispatch} selectedType={state.receptionType} />
      ),
      label: "Määritä tyyppi",
    },
    {
      element: (
        <SelectPublication
          dispatch={dispatch}
          existingOrNew={state.newOrExistingPublication}
          newPublication={state.newPublication}
          existingPublication={state.existingPublication}
        />
      ),
      label: "Valitse teos",
    },
    { element: <Summary to={to} data={state} />, label: "Tarkista tiedot" },
  ] as const;
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div
      className={css({
        display: "flex",
        flexDir: "column",
        justifyContent: "space-between",
        color: "grey3",
        fontSize: "s4",
        padding: "s2",
        gap: "s7",
      })}
    >
      <form className={css({})}>
        <h2 className={css({ fontSize: "s8", color: "grey3" })}>
          Uusi reseptio
        </h2>
        <p
          className={css({
            fontSize: "s4",
            color: "grey4",
            marginBottom: "s5",
          })}
        >
          {to}
        </p>

        <div
          className={css({
            display: "flex",
            gap: "s3",
            alignItems: "center",
            marginTop: "s7",
            marginBottom: "s7",
            width: "80%",
          })}
        >
          {steps.map((thisStep, idx) => (
            <>
              <div
                className={css({
                  display: "flex",
                  flexDir: "column",
                  width: "s9",
                  color: idx === activeStep ? "grey3" : "grey5",
                })}
              >
                <button
                  className={css(numberCircle, {
                    borderColor: idx === activeStep ? "grey3" : "grey5",
                  })}
                >
                  {idx + 1}
                </button>
                <div className={css({ fontSize: "s3" })}>{thisStep.label}</div>
              </div>
              {idx < steps.length - 1 ? (
                <div
                  className={css({
                    flex: 1,
                    height: "1px",
                    backgroundColor: "grey7",
                  })}
                ></div>
              ) : null}
            </>
          ))}
        </div>
        {steps[activeStep].element}
      </form>

      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
        })}
      >
        {activeStep > 0 ? (
          <button
            className={css(iconBtnPill, { fontSize: "s3" })}
            onClick={(e) => {
              e.preventDefault();
              setActiveStep(activeStep + -1);
            }}
          >
            <ArrowLeftIcon className={css({ width: "s4", height: "s4" })} />
            Palaa
          </button>
        ) : null}

        {activeStep < steps.length - 1 ? (
          <button
            className={css(iconBtnPill, { fontSize: "s3" })}
            onClick={(e) => {
              e.preventDefault();
              setActiveStep(activeStep + 1);
            }}
          >
            Jatka
            <ArrowRightIcon className={css({ width: "s4", height: "s4" })} />
          </button>
        ) : null}

        {activeStep === steps.length - 1 ? (
          <button
            className={css(iconBtnPill, {
              fontSize: "s3",
              background: "green.600",
              color: "white",
            })}
            onClick={(e) => {
              e.preventDefault();
              setActiveStep(activeStep + 1);
            }}
          >
            <ArrowUpTrayIcon
              className={css({
                width: "s4",
                height: "s4",
              })}
            />
            Tallenna
          </button>
        ) : null}
      </div>
    </div>
  );
}
