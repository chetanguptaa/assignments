const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
const z = require("zod");

const signJwtSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

function signJwt(username, password) {
  const validateInput = signJwtSchema.safeParse({ username, password });
  if (validateInput.success) {
    return jwt.sign({ username }, jwtPassword);
  } else return null;
}

function verifyJwt(token) {
  try {
    jwt.verify(token, jwtPassword);
    return true;
  } catch (error) {
    return false;
  }
}

function decodeJwt(token) {
  return jwt.decode(token) != null;
}

console.log(decodeJwt("sdf"));

module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
