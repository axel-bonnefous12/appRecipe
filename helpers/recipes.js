const express = require('express')

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

const axiosCli=axios.create({
    baseURL: 'https://tpnote-017c.restdb.io/rest/',
    headers:
    { 'cache-control': 'no-cache',
        'x-apikey': '071bbf24ada5ce19c7ba1bf445b7e0dcef75f' 
    }
});


function allRecipes(){

    const fetchR1 = await axiosCli.get('recette').then(result=>{return result.data});
    res.json(fetchR1);
}



module.exports = {

    allRecipes: allRecipes
}