// routes.js
// Defines the /api/shorten, /api/url/:code, /api/users/:username/urls,
// and DELETE /api/url/:code endpoints.

const express = require("express");
const router = express.Router();
const { links } = require("./store");
const { generateUniqueCode } = require("./codeGenerator");

// A simple check that the given string at least looks like a URL
// (starts with http:// or https://). This is intentionally basic -
// good enough to reject obviously malformed input without being
// overly strict about what counts as a valid address.
function isValidUrl(value) {
  if (typeof value !== "string") return false;
  return /^https?:\/\/.+/i.test(value.trim());
}

// ---------------------------------------------------------
// 1. POST /api/shorten -> create a new shortened link
// ---------------------------------------------------------
router.post("/shorten", (req, res) => {
  const { username, originalUrl } = req.body;

  // Step 1: both fields must be present and non-empty.
  const isUsernameValid = typeof username === "string" && username.trim().length > 0;
  const isUrlPresent = typeof originalUrl === "string" && originalUrl.trim().length > 0;

  if (!isUsernameValid || !isUrlPresent) {
    return res.status(400).json({ message: "username and originalUrl are required" });
  }

  // Step 2: reject input that doesn't look like a real URL.
  if (!isValidUrl(originalUrl)) {
    return res.status(400).json({ message: "Please provide a valid URL" });
  }

  // Step 3: generate a code that isn't already in use, then store the link.
  const code = generateUniqueCode(links);
  const newLink = {
    code: code,
    username: username.trim(),
    originalUrl: originalUrl.trim()
  };

  links.push(newLink);

  return res.status(201).json({
    message: "URL shortened successfully",
    code: code
  });
});

// ---------------------------------------------------------
// 2. GET /api/url/:code -> return the original address + creator
// ---------------------------------------------------------
router.get("/url/:code", (req, res) => {
  const { code } = req.params;
  const link = links.find((l) => l.code === code);

  if (!link) {
    return res.status(404).json({ message: "URL not found" });
  }

  return res.status(200).json({
    originalUrl: link.originalUrl,
    createdBy: link.username
  });
});

// ---------------------------------------------------------
// 3. GET /api/users/:username/urls -> all links made by a user
// ---------------------------------------------------------
router.get("/users/:username/urls", (req, res) => {
  const { username } = req.params;

  const userLinks = links.filter((l) => l.username === username);

  return res.status(200).json(userLinks);
});

// ---------------------------------------------------------
// 4. DELETE /api/url/:code -> remove a stored link
// ---------------------------------------------------------
router.delete("/url/:code", (req, res) => {
  const { code } = req.params;
  const index = links.findIndex((l) => l.code === code);

  if (index === -1) {
    return res.status(404).json({ message: "URL not found" });
  }

  links.splice(index, 1);

  return res.status(200).json({ message: "URL deleted successfully" });
});

module.exports = router;
