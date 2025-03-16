
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const articlesDir = path.join(__dirname, 'articles');

async function getAllArticles() {
  const files = await fs.readdir(articlesDir);
  return Promise.all(files.map(async file => {
    const content = await fs.readFile(path.join(articlesDir, file), 'utf8');
    return JSON.parse(content);
  }));
}

async function saveArticle(article) {
  const id = uuidv4();
  const filename = path.join(articlesDir, `${id}.json`);
  await fs.writeFile(filename, JSON.stringify({ id, ...article }));
  return id;
}

async function deleteArticle(id) {
  await fs.unlink(path.join(articlesDir, `${id}.json`));
}

async function getArticle(id) {
  const content = await fs.readFile(path.join(articlesDir, `${id}.json`), 'utf8');
  return JSON.parse(content);
}

async function updateArticle(id, article) {
  await fs.writeFile(path.join(articlesDir, `${id}.json`), JSON.stringify(article));
}

module.exports = { getAllArticles, saveArticle, deleteArticle, getArticle, updateArticle };
