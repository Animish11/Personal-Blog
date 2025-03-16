# Personal-Blog

```markdown
# Personal Blog

A simple personal blog system with guest viewing and admin management capabilities.

![Guest Pages Mockup](blog-guest-pages.png) | ![Admin Pages Mockup](blog-admin-pages.png)

## Features

**Guest Section**
- View all published articles in reverse chronological order
- Read individual articles with publication dates

**Admin Section**
- Login protected dashboard
- Create new articles with title, content, and publication date
- Edit existing articles
- Delete articles
- Session-based authentication

## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: HTML, CSS, EJS templates
- **Storage**: JSON files in filesystem
- **Authentication**: Express session
- **Dependencies**:
  - `express`: Web framework
  - `ejs`: Templating engine
  - `express-session`: Session management
  - `uuid`: Unique ID generation

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/personal-blog.git
cd personal-blog
```

2. Install dependencies:
```bash
npm install
```

3. Create required directory:
```bash
mkdir articles
```

4. Start the server:
```bash
node app.js
```

## Usage

**Guest Access**
- Visit `http://localhost:3000` to view all articles
- Click on article titles to read full content

**Admin Access**
1. Go to `http://localhost:3000/admin/login`
2. Use default credentials:
   - Username: `admin`
   - Password: `password`
3. From dashboard you can:
   - Add new articles
   - Edit existing articles
   - Delete articles

## Project Structure

```
├── articles/          # Article storage (JSON files)
├── public/            # Static assets
│   └── style.css      # Global styles
├── views/             # EJS templates
│   ├── guest/         # Public-facing views
│   └── admin/         # Admin management views
├── app.js             # Main application file
├── articles.js        # Article data handling
└── package.json
```

## Configuration

To change security settings:
1. Edit session secret in `app.js`:
```javascript
app.use(session({
  secret: 'your-new-secret-key', // Change this
  // ...
}));
```

2. Change admin credentials in `app.js` login route:
```javascript
if (req.body.username === 'new-admin' && req.body.password === 'strong-password') {
  // ...
}
```

## License

MIT License

## Acknowledgments

- Express.js team for the web framework
- EJS maintainers for templating engine
- Mockup design inspiration from project specifications
"https://roadmap.sh/projects/personal-blog"
---

**Note**: This is a basic implementation for educational purposes. Not recommended for production use without additional security measures.
```
