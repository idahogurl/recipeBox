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
const React = require('react');
const ReactDOM = require('react-dom');
require('./sass/styles.scss');
const react_1 = require("react");
class IngredientList extends react_1.Component {
    render() {
        debugger;
        let i = 0;
        let ingredients = this.props.ingredients.split(",")
            .map(ingredient => {
            i++;
            return React.createElement("li", { className: "list-group-item", key: i }, ingredient);
        });
        return (React.createElement("div", { className: "ingredients collapse", id: this.props.recipeId },
            React.createElement("label", null, "Ingredients"),
            React.createElement("ul", { className: "list-group" }, ingredients),
            React.createElement("button", { className: "btn btn-danger" }, "Delete"),
            "\u00A0",
            React.createElement("button", { className: "btn btn-default" }, "Edit")));
    }
}
class RecipeList extends react_1.Component {
    render() {
        return (React.createElement("li", null,
            React.createElement("div", { className: "recipe" },
                React.createElement("a", { "data-toggle": "collapse", href: "#" + this.props.recipeId }, this.props.name)),
            React.createElement(IngredientList, { ingredients: this.props.ingredients, key: "ingredients_" + this.props.recipeId, recipeId: this.props.recipeId })));
    }
}
class Recipe {
    constructor(id, name, ingredients) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
    }
}
class RecipeBox extends react_1.Component {
    render() {
        let recipesToSave = new Array();
        recipesToSave.push(new Recipe(1, "Cookie Salad", "Striped Chocolate Shortbread Cookies,Buttermilk,Whipped Cream,Vanilla Pudding," +
            "Mandrian Oranges,Pineapple Tidbits"));
        recipesToSave.push(new Recipe(2, "Chicken Enchiladas", ""));
        recipesToSave.push(new Recipe(3, "Alfredo Sauce", ""));
        localStorage.setItem("recipes", JSON.stringify(recipesToSave));
        let recipes = JSON.parse(localStorage.getItem("recipes"));
        debugger;
        let recipeList = recipes.map(recipe => {
            return React.createElement(RecipeList, { name: recipe.name, ingredients: recipe.ingredients, key: recipe.id, recipeId: recipe.id });
        });
        return (React.createElement("div", null,
            React.createElement("ul", null,
                React.createElement("li", { className: "header" },
                    "Recipe Box",
                    React.createElement("button", { className: "btn btn-default btn-add pull-right" }, "Add Recipe")),
                recipeList)));
    }
}
ReactDOM.render(React.createElement(RecipeBox, null), document.getElementById("screen"));
