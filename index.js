
// Récupération des modules
// const moduleRecette = require('./recipe.js')

const bcrypt = require('bcrypt')
const express = require('express')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 5000 // this is very important

// JWT
const jwt = require('jsonwebtoken')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const secret = 'thisismysecret'
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const cors = require('cors')

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
  }

//console.log(`The result is ${jwt.sum(1, 3)}`)

/* ---  middleware json ---
* méthodes/fonctions/opérations qui sont appelées entre le traitement de la requête 
* et l'envoi de la réponse dans la méthode d'application.
*/

app.use(function(req, res, next){

    res.header('Access-Control-Allow-Origin', 'https://6ji1h.csb.app')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next();

},
    express.json(),
    express.urlencoded({ extended: true }),
    passport.initialize(),
    cors()
)

passport.use(
    new JwtStrategy(jwtOptions, function(payload, next) {
      const user = users.find(user => user.email === payload.email)
  
      if (user) {
        next(null, user)
      } else {
        next(null, false)
      }
    })
  )


const axiosCli=axios.create({
    baseURL: 'https://tpnote-017c.restdb.io/rest/',
    headers:
    { 'cache-control': 'no-cache',
        'x-apikey': '071bbf24ada5ce19c7ba1bf445b7e0dcef75f' }});





/* Le port */
app.listen(PORT, function () {
    console.log('app listening on port ' + PORT)
})

app.get('/Connexion', function (req, res) {

    res.send('Page de connexion')
})

app.get('/CreateLogin', function (req, res) {

    res.send('Page pour créer un compte')
})

/* Récupère toutes les recettes */
// ce trouve mtn dans recipe.js
// moduleRecette.allRecipes()


app.get('/AllRecipes', async function(req, res) {

const fetchR1 = await axiosCli.get('recette').then(result=>{return result.data});
res.json(fetchR1);
})

  
/* Récupère une recette en fonction de l'id passé en paramètre */
app.get('/OneRecipe/:id', async function(req, res) {

    const fetchR1 = await axiosCli.get('recette/'+req.params.id).then(result=>{return result.data})
    res.json(fetchR1);
})

/* Insère une recette */
app.post('/AddRecipe', async function(req, res) {

    /* New recipe */
    const recipe = req.body

    console.log(req.body)

    try{
        const fetchR1 = await axiosCli.post('recette', recipe)
        res.json({result:'ok'});

    }
    catch (e){
        res.json({error: e.message})
    }
})

/* Supprime une recette en fonction de l'id passé en paramètre */
app.delete('/DeleteRecipe/:id', async function(req, res) {

    try{
        const fetchR2 = await axiosCli.delete('recette/'+req.params.id).then(result=>{return result.data})
        res.json({result:'ok'});

    }
    catch (e){
        res.json({error: e.message})
    }
})

/* Modifie une recette en fonction de l'id passé en paramètre */
app.put('/UpdateRecipe/:id', async function(req, res) {

    /* New recipe */
    const recipe = req.body

    try{
        const fetchR2 = await axiosCli.put('recette/' + req.params.id, recipe).then(result=>{return result.data})
        res.json({result:'ok'});
        console.log(recipe);

    }
    catch (e){
        res.json({error: e.message})
    }
})


// ------------------------- LOGIN ------------------------- //

app.get('/public', (req, res) => {

    res.send('public')
})

app.get('/private', passport.authenticate('jwt', { session: false }), (req, res) => {

    res.send('private. user:' + req.user.email)
})

/* Création d'un compte
*
*/  
app.post('/Register', async function(req, res) {

    /* New user */
    const user = req.body

    try{
        const fetchR1 = await axiosCli.post('comptes', user)
        res.json({result:'ok'});

    }
    catch (e){
        res.json({error: e.message})
    }
})

// middleware pour valider le token
// function jwtGuard(req, res, next){

//     const idToken = req.headers.authorization

//     jwt.verify(idToken, publicKey, (err, decoded) => {
//         if(err) {
//             res.status(401).send('Unauthorized')
//         } else {
//             req.userToken = decoded;
//             next();
//         }
//     })
// }

app.get('/', (req, res) => {
   
    res.send(req.userToken)
})

/* Authentification d'un utilisateur
*
*/  
app.post('/Login', async function(req, res) { 

    const email = req.body.email 
    const password = req.body.password

    if (!email || !password) {
        res.status(401).json({ error: 'Email or password was not provided.' })
        return
    }

    // Requete : tous les comptes de la bdd
    const fetchR1 = await axiosCli.get('comptes').then(result=>{return result.data});

    //console.log(fetchR1.email + " / " + fetchR1.password)
    console.log(fetchR1)

    // On cherche l'objet fetchR1 qui correspond aux données du formulaire
    const user = fetchR1.find(user => user.email === email)

    console.log(user)

    if (!user || user.password !== password) {
        res.status(401).json({ error: 'Email / password do not match.' })
        return
    }

    
    const userJwt = jwt.sign({ email: user.email }, private)
    res.send(userJwt)

    // res.json({ jwt: userJwt })
})


