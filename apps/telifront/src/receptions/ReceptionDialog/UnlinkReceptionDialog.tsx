import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "../../components/Spinner";
import { useState } from "react";
import { keycloak } from "../../auth/keycloak";
import { css } from "../../../styled-system/css";
import { iconBtn, iconBtnPill } from "../../styles/button";
import { LinkSlashIcon } from "@heroicons/react/24/solid";
import { Dialog } from "../../components/Dialog";
import { PublicationDto } from "@teli/contracts/publications";
import { unlinkReception } from "../api";
import { ReceptionType } from "./receptionFormReducer";

interface Props {
  reception: PublicationDto;
  receptionType: ReceptionType;
  parentId: string;
  parentTitle?: string;
  authorName?: string;
}

export function UnlinkReceptionDialog(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return unlinkReception(props.parentId, props.reception.id, props.receptionType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receptions", props.parentId] });
      queryClient.invalidateQueries({ queryKey: ["authorDetails", props.authorName] });
    },
  });

  if (mutation.isPending) {
    return <Spinner />;
  }

  return (
    <>
      {keycloak.authenticated ? (
        <button
          onClick={() => setIsOpen(true)}
          className={css(iconBtn, {
            color: "yellow.600",
            fontSize: "s2",
            padding: "s2",
            paddingLeft: "0",
          })}
        >
          <LinkSlashIcon className={css({ width: "s3", height: "s3" })} />
          <div>Poista teoksen {props.parentTitle} reseptioista</div>
        </button>
      ) : null}
      {isOpen ? (
        <Dialog
          close={() => setIsOpen(false)}
          styles={css.raw({
            width: "s18",
            maxHeight: "80vh",
            overflow: "auto",
          })}
          noFooter
        >
          {mutation.isError ? (
            <div className={css({ fontSize: "s3", padding: "s3", borderRadius: "sm", background: "rose.100", marginBottom: "s2" })}>
              Poisto epäonnistui.
            </div>
          ) : null}

          <h2 className={css({ fontSize: "s7", color: "grey3" })}>Poistetaanko?</h2>
          <p className={css({ fontSize: "s3", color: "grey4", marginTop: "s4" })}>
            Tämä toiminnon jälkeen teos {props.reception.title} ei enää ole teoksen {props.parentTitle} reseptio. Itse reseptioteosta ei
            poisteta, ainoastaan linkki näiden kahden teoksen välillä.
          </p>
          <div className={css({ display: "flex", justifyContent: "right", gap: "s3", alignItems: "center", marginTop: "s7" })}>
            <button
              className={css(iconBtnPill, {
                fontSize: "s4",
                color: "grey1",
                border: "1px solid red",
              })}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Peruuta
            </button>
            <button
              className={css(iconBtnPill, {
                fontSize: "s4",
                background: "grey2",
                color: "white",
              })}
              onClick={() => {
                mutation.mutate();
              }}
            >
              Poista
            </button>
          </div>
        </Dialog>
      ) : null}
    </>
  );
}
