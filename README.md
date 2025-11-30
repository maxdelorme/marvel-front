# A propos

## technologies

React , html, CSS, JSON

## composants react utilisé

- axios : pour l'interaction avec le backend
- downshift : pour l'autocomplete
- js-cookie : pour sauver le token dans le cookie
- react : pour rendre le site bien dynamique
- react-icons : pour avoir de zolies icons
- react-router-dom : pour avoir du multipage

# Description & fonctionnalités

Cette maquette mets en avant les technologie apprise au [reacteur](http://lereacteur.io)

On y verra un site multipage, gérant des utilisteurs pour leur permettre de :

- se connecter
- se déconnecter
- se créer un compte
- mettre à jour leur profil
- d'utiliser un avatar avec une image fouri par Marvel

Chaque utilisateur peut se mettre des comics ou des personnages en favoris
il suffit de cliquer sur le coeur ou le titre ou nom du personnage

On peut cliquer sur un personnage pour savoir dans quel comics il apparait

## CSS :

- `grid`, `flexbox` bien sûr
- pseudo element `::after`
- fonction : `has`, `not`
- pseudoclass : `:hover`, `:focus`
- nesting CSS
- media query pour le responsive global
- container query pour le responsive et le look global
  (on pourra réduire la taille de l'écran sur les grilles pour voir l'effet, les cartes seront tantôt horizontale ou verticale suivant la place disponible par carte)
- pour la sélection des pages : utilsation d'un input de type range (natif sur les navigateur) et stylisé selon mes goûts sans recours à une lib voir ce [blog](https://www.swebdev.fr/blog/personnaliser-l-apparence-d-un-input-range-en-css) pour plus de détail

Pour le fun, j'ai mis un effet sabre laser lorsqu'on va sur le champ de recherche ou les formulaires

Utilisation de backdrop-filter pour avoir un joli flou derrière les menus déroulants et les modales

Les noms des champ de formulaire sont "flottants" au clic il passe au dessus et ne servent plus alors de placeholder

l'autocomplete affiche la photo correspondant aux suggestions

# React

hooks :

- `useState`
- `useEffect`
- `useContext`

# React-Router-Dom

Hooks :

- `useSearchParam`
- `useNavigate`
- `useParam`

Components :

- `Link`
- `NavLink`

Pour la gestion des formulaires, ils sont tous avec des inputs "controllés"
L'intégralité des données du formulaire n'est qu'un seul état de type objet.
Facilite la gestion du `onChange` sur les input qui peut alors être générique
(voir `/src/components/SignupForm.jsx` par exemple)
