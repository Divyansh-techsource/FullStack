import express from "express";
const router = express.Router();
router.use(express.json());

const contact = [
  {
    id: 1,
    name: "D",
    email: "xyz@gmail.com",
  },
  {
    id: 2,
    name: "A",
    email: "abc@gmail.com",
  },
  {
    id: 3,
    name: "X",
    email: "gm@gmail.com",
  },
];
router.get("/", (req, res) => {
  const { id } = req.body;
  if (id === null || id === undefined) {
    res.status(400).json({ message: "ID not provided" });
  }
  const fi = contact.filter((f) => f.id === Number(id));
  res.status(200).json({
    message: "Get ids",
    fi,
  });
});

router.post("/", (req, res) => {
  const { id, name, email } = req.body;

  if (id === null || id === undefined) {
    res.status(400).json({ message: "Name not provided" });
  }

  if (name === null || name === undefined) {
    res.status(400).json({ message: "ID not provided" });
  }

  if (email === null || email === undefined) {
    res.status(400).json({ message: "Email not provided" });
  }

  const newContact = { id: contact.length + 1, name: name, email: email };

  contact.push(newContact);

  res.status(200).json({
    message: "Successful",
    contact: contact,
  });
});

export default router;
