// routes.js
// Defines the /api/events, /api/register, and /api/cancel endpoints.

const express = require("express");
const router = express.Router();
const { events } = require("./store");

// ---------------------------------------------------------
// 1. GET /api/events -> all events with enrollment count
// ---------------------------------------------------------
router.get("/events", (req, res) => {
  return res.status(200).json({
    message: "Events retrieved successfully",
    events: events
  });
});

// ---------------------------------------------------------
// 2. POST /api/register -> increase an event's registration count
// ---------------------------------------------------------
router.post("/register", (req, res) => {
  const { eventId } = req.body;

  // Step 1: eventId must be present.
  if (eventId === undefined || eventId === null) {
    return res.status(400).json({ message: "eventId is required" });
  }

  // Step 2: the event must exist.
  const event = events.find((e) => e.id === Number(eventId));
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  // Step 3: everything is valid - increase the count.
  event.registrationCount += 1;

  return res.status(200).json({
    message: "Registration successful",
    event: event
  });
});

// ---------------------------------------------------------
// 3. GET /api/events/:id -> one event and its registration count
// ---------------------------------------------------------
router.get("/events/:id", (req, res) => {
  const eventId = Number(req.params.id);
  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  return res.status(200).json(event);
});

// ---------------------------------------------------------
// 4. POST /api/cancel -> decrease an event's registration count
// ---------------------------------------------------------
router.post("/cancel", (req, res) => {
  const { eventId } = req.body;

  // Same validation pattern as /register, kept consistent on purpose.
  if (eventId === undefined || eventId === null) {
    return res.status(400).json({ message: "eventId is required" });
  }

  const event = events.find((e) => e.id === Number(eventId));
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  // Guard: never let the count go below zero. Only decrease when
  // there is actually at least one participant registered.
  if (event.registrationCount <= 0) {
    return res.status(400).json({ message: "No registrations to cancel" });
  }

  event.registrationCount -= 1;

  return res.status(200).json({
    message: "Cancellation successful",
    event: event
  });
});

module.exports = router;
