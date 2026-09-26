import Keycloak from "keycloak-js";
import { config } from "../config";

export const keycloak = new Keycloak(config.auth);

let initialization: Promise<boolean> | undefined;

export function initializeKeycloak(): Promise<boolean> {
  if (initialization) return initialization;

  initialization = keycloak.init({
    onLoad: "check-sso",
    pkceMethod: "S256",
    checkLoginIframe: false,
  });

  return initialization;
}
