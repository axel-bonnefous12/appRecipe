
# appRecipe

> L'API est disponible à l'adresse suivante : [https://6ji1h.csb.app/#/](https://6ji1h.csb.app/#/)


> Le node js est déployé sur heroku à l'adresse suivante : [https://app-recipe-apidae.herokuapp.com](https://app-recipe-apidae.herokuapp.com)

## Installation du projet
### Node js
> Pour installer le projet, cloner le repository
> ``` git clone https://github.com/axel-bonnefous12/appRecipe.git ```

> Pour installer le projet, ou télécharger son contenu en *.zip*

> Il faut maintenant installer **node js** sur la machine, pour cela, se rendre à l'adresse suivante et télécharger la version qui convient : 
> [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

> Ouvrir ensuite un terminal à l'emplacement des fichiers et exécuter les commandes suivantes pour télécharger et installer les modules :
```
npm init
npm install express --save
npm install express-session --save
npm install jsonwebtoken --save
npm install passport --save
npm install passport-jwt --save
```
> Une fois fait, lancer le serveur 
> ``` node index.js ```

### Vue js

> Le vue js est disponible sur **code sandbox** à l'adresse suivante :
> [https://codesandbox.io/s/apprecipe-6ji1h](https://codesandbox.io/s/apprecipe-6ji1h)

> Cependant, aucune installation n'est nécessaire et l'application est déjà prête en se rendant à l'adresse de l'API : 
> [https://6ji1h.csb.app/#/](https://6ji1h.csb.app/#/)


### Parties manquantes 
#### Node js
> Le code n'a pas été séparé en module et se trouve alors dans un seul et même fichier **index.js**

#### Vue js

 1. Inscription. 

 2.  L'utilisateur peut delete/update une recette ssi c'est lui qui la crée.
 > Routes qui fonctionnait initialement. Mais avec l'ajout du jwt coté node, il nous ne sommes pas arrivé à l'intégrer sur le vue.
 
 4.  Une pagination des recettes.


##### Ce projet a été réalisé par Enzo Abjean et Axel Bonnefous.


