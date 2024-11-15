const express = require("express")
const app = express()
const PORT = 3000

app.use(express.json())
app.use("/books", require("./api/books"))

app.use((req, res, next) => {
  console.log(`${req.method}${req.originalUrl}`
  );
  next();
});

app.use((req, res, next) => {
  next({ status: 404, message: "Endpoint not Found" })
});


app.use((err,req, res, next) => {
  console.log(err)
  res.status(err.status ?? 500)
  res.json(err.message ?? "He's Gone Nuclear!")
})


app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`)
})