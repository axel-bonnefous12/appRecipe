const express = require('express')
const axios = require('axios')
const app = express()

require('dotenv').config() // Fichier .env

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

// middleware
passport.use(
    new JwtStrategy(jwtOptions, async function(payload, next) {
        
        // On récupère les comptes
        const fetchR1 = await axiosCli.get('comptes').then(result=>{return result.data});
        const user = fetchR1.find(user => user.email === payload.email)
  
        // 
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
        'x-apikey': '071bbf24ada5ce19c7ba1bf445b7e0dcef75f' 
    }
});

app.listen(process.env.PORT, function () {
    console.log('app listening on port ' + process.env.PORT)
})

app.get('/AllRecipes', async function(req, res) {

    const fetchR1 = await axiosCli.get('recette').then(result=>{return result.data});
    res.json(fetchR1);
})
 
/* Récupère une recette en fonction de l'id passé en paramètre */
app.get('/OneRecipe/:id', async function(req, res) {

    const fetchR1 = await axiosCli.get('recette/'+req.params.id).then(result=>{return result.data})
    res.json(fetchR1);
})

// split la chaine de caractere ex : "Bearer dezfqrsefeefs"
const exctractToken = (token) => {
    return token.split(' ')[1] || null;
}

// Prend le token et sort les données du jwt
const exctractTokenData = (token) => {
    return jwt.decode(exctractToken(token));
}

/* Insère une recette */
app.post('/AddRecipe', passport.authenticate('jwt', { session: false }), async function(req, res) {

    /* New recipe */
    // Spread operator
    // Concatenation du body de la recette avec la clé owner
    const recipe = {...req.body, ...{owner: exctractTokenData(req.headers.authorization).email}}

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
// route portégé par le token
app.put('/UpdateRecipe/:id', passport.authenticate('jwt', { session: false }), async function(req, res) {

    // On recup la recette en fonction d'un id
    const fetchR1 = await axiosCli.get('recette/'+req.params.id).then(result=>{return result.data})

    // données du token
    const tokenData = exctractTokenData(req.headers.authorization)

    // Si le proprietaire du token et le proprietaire de la recette
    if(fetchR1.owner !== tokenData.email){
        res.status(401).send('Unauthorized')
    }

    /* New recipe */
    const recipe = req.body

    try{
        const fetchR2 = await axiosCli.put('recette/' + req.params.id, recipe).then(result=>{return result.data})
        res.json({result:'ok'});
    }
    catch (e){
        res.json({error: e.message})
    }
})

// ------------------------- LOGIN ------------------------- //

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

    // On cherche l'objet fetchR1 qui correspond aux données du formulaire
    const user = fetchR1.find(user => user.email === email)

    if (!user || user.password !== password) {
        res.status(401).json({ error: 'Email / password do not match.' })
        return
    }

    const userJwt = jwt.sign({ email: user.email }, secret)

    res.json({ jwt: userJwt })
})


