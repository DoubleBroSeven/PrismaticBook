const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (e) {
    next(e);
  }
})

router.get("/:id",async (req, res, next) => {
  const { id } = req.params
  try {
    const book = await prisma.book.findUnique({ where: { id: +id } });
    if (book) {
      res.json(book)
    } else {
      next({ status: 404, message: `Book with this id:${id} not found` });
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body
  if (!title) {
    return next({ status: 400, message: `Title not Proper` })
  }
  try {
    const book = await prisma.book.findUnique({
      where: { id: +id }
    });
    if (!book) {
      return next({ status: 404, message: `Book does not exist` });
    }

    const updatedbook = await prisma.book.update({
      where: { id: +id },
      data: { title },
    });
    res.json(updatedbook)
  } catch (e) {
    next(e);
  }
});

router.post("/", async(req, res, next) => {
  const { title } = req.body;
  if (!title) {
    return next({status:400, message:`Title was not Properly Provided`})
  }
  try {
    const newbook = await prisma.book.create({
      data: { title }
    });
    res.status(201).json(newbook);
  } catch (e) {
    next(e);
  }
})

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({
      where: { id: +id }
    });
    if (!book) {
      return next({ status: 404, message: `Book is not Found` });
    }
    
    await prisma.book.delete({
      where: { id: +id }
    });
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
