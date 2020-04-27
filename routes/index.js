var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  global.db.findAll((e, docs) => {
    if (e) {
      return console.log(e);
    }

    res.render('index', { 
      title: 'Lista de Clientes', 
      docs });
  })
  
})

/* POST new page. */

router.get('/new', function(req, res, next) {
  res.render('new', { 
    title: 'Novo Cadastro', 
    doc: {
    "nome":"",
    "idade":"", 
    "uf":"" 
  }, action: '/new' });
});

router.post('/new', function(req, res, next) {
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;

  global.db.insert({
      nome, 
      idade, 
      uf
    }, (err, result) => {
        if(err) { 
          return console.log(err); 
        }
        res.redirect('/');
  })
});

// GET edit page
router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOne(id, (e, docs) => {
      if(e) { 
        return console.log(e); 
      }
      res.render('new', { 
        title: 'Edição de Cliente', 
        doc: docs[0], 
        action: '/edit/' + docs[0]._id });
    });
})

//POST edit page
router.post('/edit/:id', function(req, res) {
  var id = req.params.id;
  var nome = req.body.nome;
  var idade = parseInt(req.body.idade);
  var uf = req.body.uf;
  global.db.update(id, {
    nome, 
    idade, 
    uf
  }, (e, result) => {
        if(e) { 
          return console.log(e); 
        }
        res.redirect('/');
    });
});


/* GET delete page. */
router.get('/delete/:id', function(req, res) {
  var id = req.params.id;

  global.db.deleteOne(id, (e, r) => {
    if(e) {
      return console.log(e); 
    }
    res.redirect('/');
  });
});

module.exports = router;
