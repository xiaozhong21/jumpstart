import jwt = require("express-jwt");
import { expressJwtSecret } from "jwks-rsa";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const domain = process.env.AUTH0_DOMAIN;
const audience = process.env.AUTH0_AUDIENCE;

const jwtCheck = jwt({
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`,
  }),
  audience,
  issuer: `https://${domain}/`,
  algorithms: ["RS256"],
});

export default jwtCheck;
