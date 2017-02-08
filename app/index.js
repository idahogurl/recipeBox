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
const react_bootstrap_1 = require("react-bootstrap");
class IngredientList extends react_1.Component {
    render() {
        let i = 0;
        let ingredients = this.props.ingredients.split(",")
            .map(ingredient => {
            i++;
            return (React.createElement("li", { className: "list-group-item", key: i }, ingredient));
        });
        return (React.createElement("div", { className: "collapse ingredients", id: this.props.recipeId },
            React.createElement("label", null, "Ingredients"),
            React.createElement("ul", { className: "list-group" }, ingredients),
            React.createElement("button", { className: "btn btn-danger", onClick: this.props.deleteOnClick, id: "delete_" + this.props.recipeId }, "Delete"),
            "\u00A0",
            React.createElement("button", { className: "btn btn-default", onClick: this.props.editOnClick, id: "edit_" + this.props.recipeId, "data-toggle": "modal", "data-target": "#editorModal" }, "Edit")));
    }
}
class RecipeList extends react_1.Component {
    render() {
        return (React.createElement("li", null,
            React.createElement("div", { className: "recipe" },
                React.createElement("a", { "data-toggle": "collapse", href: "#" + this.props.recipeId }, this.props.name)),
            React.createElement(IngredientList, { ingredients: this.props.ingredients, recipeId: this.props.recipeId, deleteOnClick: this.props.deleteOnClick, editOnClick: this.props.editOnClick, key: "ingredients_" + this.props.recipeId })));
    }
}
class Recipe {
    constructor(id, name, ingredients) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
    }
}
class RecipeEditorModal extends react_1.Component {
    render() {
        debugger;
        return (React.createElement(react_bootstrap_1.Modal, { show: this.props.show, onHide: this.props.cancelOnClick, bsSize: "small" },
            React.createElement(react_bootstrap_1.Modal.Header, null,
                React.createElement(react_bootstrap_1.Modal.Title, null, "Recipe")),
            React.createElement(react_bootstrap_1.Modal.Body, null,
                React.createElement("label", null, "Name"),
                React.createElement("div", null,
                    React.createElement("input", { type: "text", id: "name", value: this.props.recipe.name, onChange: this.props.recipeOnChange })),
                React.createElement("label", { style: { marginTop: 20 } }, "Ingredients"),
                React.createElement("div", null,
                    React.createElement("textarea", { id: "ingredients", value: this.props.recipe.ingredients, onChange: this.props.recipeOnChange }))),
            React.createElement(react_bootstrap_1.Modal.Footer, null,
                React.createElement("button", { className: "btn btn-info", onClick: this.props.saveOnClick, id: "save_" + this.props.recipe.id }, "Save"),
                "\u00A0",
                React.createElement("button", { className: "btn btn-default", onClick: this.props.cancelOnClick }, "Cancel"))));
    }
}
class RecipeBox extends react_1.Component {
    constructor() {
        super();
        this.state = { recipes: [], recipe: { recipeId: -1, name: "", ingredients: "" },
            editRecipe: { recipeId: -1, name: "", ingredients: "" }, showEditorModal: false };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRecipeChange = this.handleRecipeChange.bind(this);
    }
    handleDelete(e) {
        //find in array and remove it
        let index = this.getRecipeIndex(e.target.id, "delete_");
        let recipes = this.state.recipes;
        recipes.splice(index, 1);
        this.setState({ recipes: recipes });
        this.saveToLocalStorage(recipes);
    }
    getRecipeIndex(id, preText) {
        let index = this.state.recipes.findIndex(recipe => {
            return id == (preText + recipe.id);
        });
        return index;
    }
    handleEdit(e) {
        let index = this.getRecipeIndex(e.target.id, "edit_");
        this.setState({ editRecipe: this.state.recipes[index], showEditorModal: true });
    }
    handleRecipeChange(e) {
        let recipe = this.state.editRecipe;
        if (e.target.id === "name") {
            recipe.name = e.target.value;
        }
        else if (e.target.id === "ingredients") {
            recipe.ingredients = e.target.value;
        }
        this.setState({ editRecipe: recipe });
    }
    handleSave(e) {
        let index = this.getRecipeIndex(e.target.id, "save_");
        let recipes = this.state.recipes;
        let recipe = this.state.editRecipe;
        recipes[index] = recipe;
        this.setState({ recipes: recipes, showEditorModal: false, editRecipe: { recipeId: -1, name: "", ingredients: "" } });
        this.saveToLocalStorage(recipes);
    }
    handleAdd(e) {
        this.setState({ recipe: { recipeId: -1, name: "", ingredients: "" }, showEditorModal: true });
    }
    handleCancel(e) {
        this.setState({ showEditorModal: false });
    }
    saveToLocalStorage(recipes) {
        localStorage.setItem("recipes", JSON.stringify(recipes));
    }
    componentWillMount() {
        this.initialize();
        this.setState({ recipes: this.loadLocalStorage() });
    }
    initialize() {
        let recipesToSave = new Array();
        recipesToSave.push(new Recipe(1, "Cookie Salad", "Striped Chocolate Shortbread Cookies,Buttermilk,Whipped Cream,Vanilla Pudding," +
            "Mandrian Oranges,Pineapple Tidbits"));
        recipesToSave.push(new Recipe(2, "Chicken Enchiladas", ""));
        recipesToSave.push(new Recipe(3, "Alfredo Sauce", ""));
        this.saveToLocalStorage(recipesToSave);
    }
    loadLocalStorage() {
        return JSON.parse(localStorage.getItem("recipes"));
    }
    render() {
        let recipeList = this.state.recipes.map(recipe => {
            return React.createElement(RecipeList, { name: recipe.name, ingredients: recipe.ingredients, key: recipe.id, recipeId: recipe.id, deleteOnClick: this.handleDelete, editOnClick: this.handleEdit });
        });
        return (React.createElement("div", null,
            React.createElement(RecipeEditorModal, { saveOnClick: this.handleSave, cancelOnClick: this.handleCancel, recipe: this.state.editRecipe, show: this.state.showEditorModal, recipeOnChange: this.handleRecipeChange }),
            React.createElement("ul", null,
                React.createElement("li", { className: "header" },
                    "Recipe Box",
                    React.createElement("button", { className: "btn btn-default btn-add pull-right", onClick: this.handleAdd }, "Add Recipe")),
                recipeList)));
    }
}
ReactDOM.render(React.createElement(RecipeBox, null), document.getElementById("screen"));
