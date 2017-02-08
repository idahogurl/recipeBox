/*
User Story: I can create recipes that have names and ingredients.

User Story: I can see an index view where the names of all the recipes are visible.

User Story: I can click into any of those recipes to view it.

User Story: I can edit these recipes.

User Story: I can delete these recipes.

User Story: All new recipes I add are saved in my browser's local storage. If I refresh the page, these recipes will still be there.

Hint: You should prefix your local storage keys on CodePen, i.e. _username_recipes
*/

const React = require('react');
const ReactDOM = require('react-dom');

require('./sass/styles.scss');

import {Component} from 'react';

class IngredientsEditor extends Component<any,any> {
    render() {
        return (<textarea>{this.props.ingredients}</textarea>);
    }
}
class IngredientList extends Component<any,any> {
    render() {
        debugger;
         let i: number = 0;
         let ingredients = this.props.ingredients.split(",")
            .map(ingredient => {
                i++;
                return (
                <li className="list-group-item" key={i}>
                    {ingredient}
                    <IngredientsEditor ingredients={this.props.ingredients} className="hidden" />
                </li>);
            }
            );

        return (
            <div className="ingredients collapse" id={this.props.recipeId}>
                    <label>Ingredients</label>
                    <ul className="list-group">
                    {ingredients}
                    </ul>
                    <button className="btn btn-danger" onClick={this.props.deleteOnClick} id={"delete_" + this.props.recipeId}>Delete</button>&nbsp;
                    <button className="btn btn-default" onClick={this.props.editOnClick} id={"edit_" + this.props.recipeId}>Edit</button>
           </div>
        );
    }
}

class RecipeList extends Component<any,any> {
    render() {
        return (
            <li>
                <div className="recipe">
                    {/*<label>Recipe:</label>*/}
                    {/*<input type="text" value="Cookie Salad" placeholder="Recipe Name" className="recipe-name"/>*/}
                    <a data-toggle="collapse" href={"#" + this.props.recipeId}>{this.props.name}</a>
                </div>
                <IngredientList ingredients={this.props.ingredients} recipeId={this.props.recipeId} 
                    deleteOnClick={this.props.deleteOnClick} editOnClick={this.props.editOnClick}
                    key={"ingredients_" + this.props.recipeId} />
                
            </li>
        );
    }
}

class Recipe {
    constructor(id:number, name:string, ingredients:string){
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
    }
    name: string;
    ingredients: string;
    id: number;
}

class RecipeBox extends Component<any,any> {
    constructor() {
        super();

        this.state = {recipes : []};

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    handleDelete(e) {
        debugger;
        //find in array and remove it
        let index:number = this.state.recipes.findIndex( recipe => {
            debugger;
            return e.target.id == ("delete_" + recipe.id);
        });
        let recipes = this.state.recipes;
        recipes.splice(index, 1);
        this.setState({recipes: recipes});
        this.saveToLocalStorage(recipes);
    }

    handleEdit(e) {

    }

    handleSave(e) {

    }

    handleCancel(e) {

    }

    handleAdd(e) {

    }

    saveToLocalStorage(recipes: Recipe[])
    {
     localStorage.setItem("recipes", JSON.stringify(recipes));   
    }

    componentWillMount(){
        this.initialize();
        this.setState({recipes: this.loadLocalStorage()});
    }

    initialize() {
        let recipesToSave = new Array<Recipe>();
        recipesToSave.push(new Recipe(1, "Cookie Salad","Striped Chocolate Shortbread Cookies,Buttermilk,Whipped Cream,Vanilla Pudding," +
            "Mandrian Oranges,Pineapple Tidbits"));
        recipesToSave.push(new Recipe(2, "Chicken Enchiladas", ""));
        recipesToSave.push(new Recipe(3, "Alfredo Sauce", ""));

        this.saveToLocalStorage(recipesToSave);
    }
    
    loadLocalStorage() {
        return JSON.parse(localStorage.getItem("recipes"));
    }

    render() {                
        debugger;
        let recipeList = this.state.recipes.map(recipe => {
            return <RecipeList name={recipe.name} ingredients={recipe.ingredients} key={recipe.id} recipeId={recipe.id} 
            deleteOnClick={this.handleDelete} editOnClick={this.handleEdit}
            />
        });

        return (
            <div>
        <ul>
            <li className="header">Recipe Box
                <button className="btn btn-default btn-add pull-right">Add Recipe</button>
            </li>
            {recipeList}
            {/*<li>
                <div className="recipe">
                    <label>Recipe:</label>
                    <input type="text" value="Cookie Salad" placeholder="Recipe Name" className="recipe-name"/>
                    <a data-toggle="collapse" href="#collapseExample">Cookie Salad</a>
                </div>
                <div className="ingredients collapse" id="collapseExample">
                    <ul className="list-group">
                    <li className="list-group-item">Striped Chocolate Shortbread Cookies</li>
                    <li className="list-group-item">Buttermilk</li>
                    <li className="list-group-item">Whipped Cream</li>
                    <li className="list-group-item">Vanilla Pudding</li>
                    <li className="list-group-item">Mandrian Oranges</li>
                    <li className="list-group-item">Pineapple Tidbits</li>
                    </ul>
                  <label>Ingredients</label>
                  <textarea placeholder="Enter Ingredients,Seperated,By Commas">Striped Chocolate Shortbread Cookies, Buttermilk, Whipped Cream, Vanilla Pudding, 
                    Mandrian Oranges, Pineapple Tidbits</textarea>
                    <button className="btn btn-info">Save</button>
                    <button className="btn btn-default">Cancel</button>
                   
              </div>
            </li>
            <li><div className="recipe"><a href="#">Chicken Enchiladas</a></div></li>
            <li><div className="recipe"><a href="#">Alfredo Sauce</a></div></li>
            <li><div className="recipe">&nbsp;</div></li>
            <li><div className="recipe">&nbsp;</div></li>
            <li><div className="recipe">&nbsp;</div></li>
            <li><div className="recipe">&nbsp;</div></li>
            <li><div className="recipe">&nbsp;</div></li>
            <li><div className="recipe">&nbsp;</div></li>
            <li><div className="recipe">&nbsp;</div></li>
            <li><div className="recipe">&nbsp;</div></li>
            <li><div className="recipe">&nbsp;</div></li>*/}
        </ul>
        </div>
        );
    }
}

ReactDOM.render(<RecipeBox/>, document.getElementById("screen"));