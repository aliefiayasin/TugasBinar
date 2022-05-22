// POST /articles, buat artikel baru
app.post('/articles', (req, res) => {
    Article.create({
    title: req.body.title,
    body: req.body.body
    })
    .then(article => {
    res.send('Article berhasil dibuat')
    })
    })
    // GET /articles/create, menampilkan form create
    app.get('/articles/create', (req, res) => {
    res.render('articles/create')
    })