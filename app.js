const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { getAllArticles, saveArticle, deleteArticle, getArticle, updateArticle } = require('./articles');
const app = express();

// Configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');

// Authentication Middleware
const authenticate = (req, res, next) => {
  if (req.session.isAdmin) next();
  else res.redirect('/admin/login');
};

// Guest Routes
app.get('/', async (req, res) => {
  const articles = await getAllArticles();
  res.render('guest/home', { articles });
});

app.get('/article/:id', async (req, res) => {
  const article = await getArticle(req.params.id);
  res.render('guest/article', { article });
});

// Admin Routes
app.get('/admin/login', (req, res) => res.render('admin/login'));
app.post('/admin/login', (req, res) => {
  if (req.body.username === 'admin' && req.body.password === 'password') {
    req.session.isAdmin = true;
    res.redirect('/admin');
  } else {
    res.redirect('/admin/login');
  }
});

app.get('/admin', authenticate, async (req, res) => {
  const articles = await getAllArticles();
  res.render('admin/dashboard', { articles });
});

app.get('/admin/add', authenticate, (req, res) => res.render('admin/add-article'));
app.post('/admin/add', authenticate, async (req, res) => {
  await saveArticle({
    title: req.body.title,
    date: req.body.date,
    content: req.body.content
  });
  res.redirect('/admin');
});

app.get('/admin/edit/:id', authenticate, async (req, res) => {
  const article = await getArticle(req.params.id);
  res.render('admin/edit-article', { article });
});

app.post('/admin/edit/:id', authenticate, async (req, res) => {
  await updateArticle(req.params.id, {
    id: req.params.id,
    title: req.body.title,
    date: req.body.date,
    content: req.body.content
  });
  res.redirect('/admin');
});

app.post('/admin/delete/:id', authenticate, async (req, res) => {
  await deleteArticle(req.params.id);
  res.redirect('/admin');
});

app.listen(3000, () => console.log('Server running on port 3000'));
