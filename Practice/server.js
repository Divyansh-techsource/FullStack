import express from "express";
const app = express();

app.get("/square/area", (req, res) => {
  let width = req.query.width;
  if (!width) {
    return res.status(200).json({
      message: "No width passed",
    });
  }
  width = parseInt(width);
  const area = width * width;
  return res.json({ area: area });
});

app.get("/square/perimeter", (req, res) => {
  let width = req.query.width;
  if (!width) {
    return res.status(200).json({
      message: "No per passed",
    });
  }
  width = parseInt(width);
  const peri = 4 * width;
  return res.json({ perimeter: peri });
});

app.get("/rectangle/area", (req, res) => {
  const l = parseInt(req.query.l);
  const b = parseInt(req.query.b);
  
  if (l==undefined || b==undefined) {
    return res.status(200).json({
      message: "No length or breath or both passed",
    });
  }
//   l = parseInt(l);
//   b = parseInt(b);
console.log(l+" "+b);
  const area = l * b;
  return res.json({ area: area });
});

app.get("/rectangle/perimeter", (req, res) => {
  let l = req.query.l;
  let b = req.query.b;
  if (!l || !b) {
    return res.status(200).json({
      message: "No length or breath or both passed",
    });
  }
  l = parseInt(l);
  b = parseInt(b);
  const peri = 2 * (l + b);
  return res.json({ perimeter: peri });
});

app.listen(8000, () => {
  console.log("Server started");
});
