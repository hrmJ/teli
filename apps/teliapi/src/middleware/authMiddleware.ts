import { createRemoteJWKSet, jwtVerify } from "jose";
import { type Request, type Response, type NextFunction } from "express";

const issuer = "http://localhost:8080/realms/teli";

const jwks = createRemoteJWKSet(
  new URL(`${issuer}/protocol/openid-connect/certs`),
);

/**
 * Simple authn check without authz check:
 * check that the request includes an auth header
 * with a valid jwt payload
 *
 */
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.header("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    res.status(401).json({ error: "unauthenticated" });
    return;
  }

  try {
    await jwtVerify(authorization.slice("Bearer ".length), jwks, { issuer });
    next();
  } catch {
    res.status(401).json({ error: "unauthenticated" });
  }

  next();
}
