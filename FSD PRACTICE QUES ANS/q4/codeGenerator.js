// codeGenerator.js
// Small helper file just for generating short, unique codes.
// Kept separate so routes.js stays focused on request handling.

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const CODE_LENGTH = 6;

// Builds one random 6-character code, e.g. "aZ3kP9"
function buildRandomCode() {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * CHARACTERS.length);
    code += CHARACTERS[randomIndex];
  }
  return code;
}

// Keeps generating codes until it finds one that isn't already used.
// "existingLinks" is the current links array so we can check for clashes.
function generateUniqueCode(existingLinks) {
  let code;
  let isTaken = true;

  while (isTaken) {
    code = buildRandomCode();
    isTaken = existingLinks.some((link) => link.code === code);
  }

  return code;
}

module.exports = { generateUniqueCode };
