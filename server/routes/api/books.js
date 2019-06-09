const mongoose = require('mongoose');
const router = require('express').Router();
const Books = mongoose.model('Books');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body.title) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }

  if(!body.author) {
    return res.status(422).json({
      errors: {
        author: 'is required',
      },
    });
  }

  if(!body.body) {
    return res.status(422).json({
      errors: {
        body: 'is required',
      },
    });
  }
  if(!body.stock) {
    return res.status(422).json({
      errors: {
        stock: 'is required',
      },
    });
  }

  const finalBook = new Books(body);
  return finalBook.save()
    .then(() => res.json({ book: finalBook.toJSON() }))
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Books.find()
    .sort({ createdAt: 'descending' })
    .then((books) => res.json({ books: books.map(book => book.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Books.findById(id, (err, book) => {
    if(err) {
      return res.sendStatus(404);
    } else if(book) {
      req.book = book;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    book: req.book.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body.title !== 'undefined') {
    req.book.title = body.title;
  }

  if(typeof body.author !== 'undefined') {
    req.book.author = body.author;
  }

  if(typeof body.stock !== 'undefined') {
    req.book.stock = body.stock;
  }

  if(typeof body.body !== 'undefined') {
    req.book.body = body.body;
  }

  return req.book.save()
    .then(() => res.json({ book: req.book.toJSON() }))
    .catch(next);
});


module.exports = router;