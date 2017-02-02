/*
User Story: I can create recipes that have names and ingredients.

User Story: I can see an index view where the names of all the recipes are visible.

User Story: I can click into any of those recipes to view it.

User Story: I can edit these recipes.

User Story: I can delete these recipes.

User Story: All new recipes I add are saved in my browser's local storage. If I refresh the page, these recipes will still be there.

Hint: You should prefix your local storage keys on CodePen, i.e. _username_recipes
*/
"use strict";
const serviceUrl = "https://fcctop100.herokuapp.com/api/fccusers/top/";
const React = require('react');
const ReactDOM = require('react-dom');
require('./sass/styles.scss');
//ReactDOM.render(<LeaderBoardContainer/>, document.getElementById("leaderBoard")); 
