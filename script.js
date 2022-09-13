
//link to search anything with category:
// https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta
//ajax call to get the category only for category.html
(function () {
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = () => {
        let resposeJSON = JSON.parse(xhrRequest.response);
        let res_length = resposeJSON.categories.length;
        //setting the html for categries that we got
        for (let i = 0; i < res_length; i++) {
            //getting name of the category and image for the category
            let category_name = resposeJSON.categories[i].strCategory;
            let image = resposeJSON.categories[i].strCategoryThumb;
            let category_container = document.getElementById('category-container');
            category_container.innerHTML += `
            <div id="category">
                <a href="detailed_category.html?category_name=`+ category_name + `"><div id="category-img"><img src="` + image + `" alt="Category image"></div></a>
                <div id="catgeory-name">`+ category_name + `</div>
            </div>
            `;

        }
    };
    xhrRequest.open('get', 'https://www.themealdb.com/api/json/v1/1/categories.php');
    xhrRequest.send();

})();
// /www.themealdb.com/api/json/v1/1/search.php?f=a
//filling suggetions using AJAX
let current_input = "";
let receipe_name = [];//to store current names and use it in else after populating it to fine tune result
document.getElementById('search-input').addEventListener('keydown', (event) => {
    if (event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode == 8) {//if the key pressed is of alphabet only as API can search only starting alphabet
        const input_field = document.getElementById('search-input').value;
        current_input = input_field + event.key;//current entered string
        let suggestion_container = document.getElementById('suggestion-container');
        if (current_input.length == 1) {
            addJSONlist(event);//calling add function below which populate list
        }
        else {//searching substring to fine tune suggetions

            let suggetion_count = 0;
            suggestion_container.innerHTML = "";
            for (let i = 0; i < receipe_name.length; i++) {
                if (receipe_name[i].substr(0, current_input.length).toLowerCase() == current_input.toLowerCase()) {
                    //if the substring is there in recipe_name
                    suggetion_count += 1;
                    suggestion_container.innerHTML += `
                <div id="suggetion-item`+ suggetion_count + `">` + receipe_name[i] + `</div>
                <hr>
            `;
                }//if inside for loop end
                // else{
                //     suggestion_container.innerHTML = "No Results Found";
                // }
            }
        }//main else end
    }
})
//if single alphabet is there then poplulate the string and name array with this
function addJSONlist(event) {
    let keyPressed = event.key;
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = () => {
        let suggestion_container = document.getElementById('suggestion-container');
        try {
            let resposeJSON = JSON.parse(xhrRequest.response);
            let res_length = resposeJSON.meals.length;
            let suggetion_count = 0;
            receipe_name = [];//resetting the array values
            //clearing old values
            suggestion_container.innerHTML = "";
            //setting the html for categries that we got
            for (let i = 0; i < res_length; i++) {
                suggetion_count += 1;
                let name = resposeJSON.meals[i].strMeal;
                name.replace(/&amp;/g, '+');
                receipe_name.push(name);//so that we have the array for the particular letter recipes

                suggestion_container.innerHTML += `
        <div id="suggetion-item`+ suggetion_count + `">` + name + `</div>
        <hr>
    `;
            }
        }
        catch (e) {
            console.log("ERROR" + e);
            suggestion_container.innerHTML = "No Results Found";
        }

    };
    xhrRequest.open('get', 'https://www.themealdb.com/api/json/v1/1/search.php?f=' + keyPressed);
    xhrRequest.send();
}


//if single alphabet is there then poplulate the HTML with this
function fetchRecipe(recipeName) {
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = () => {
        let resposeJSON = JSON.parse(xhrRequest.response);
        // //setting the html for recipe that we got
        //     //getting name of the category and image for the category
        //appending to only required HTML (can use above way also) since we didn't need to loop them 
        document.getElementById('recipe-header').innerHTML += resposeJSON.meals[0].strMeal;
        document.getElementById('recipe-category').innerHTML += `<p><b>Category: </b>` + resposeJSON.meals[0].strCategory + `</p>`;
        document.getElementById('recipe-area').innerHTML += `<p><b>Area Of Origin: </b>` + resposeJSON.meals[0].strArea + `</p>`;
        document.getElementById('recipe-info').innerHTML += `<p>` + resposeJSON.meals[0].strInstructions + `</p>`;
        document.getElementById('recipe-img-container').innerHTML += `<img src="` + resposeJSON.meals[0].strMealThumb + `">`;

        //*Remaing to fetch ingridents
        for (let j = 1; j <= 20; j++) {

            let ingrident_container = document.getElementById('ingridents-container');
            {
                resposeJSON.meals[0]["strIngredient" + (j)] && (ingrident_container.innerHTML += `<div class="ingridient">
                    <input class="ingrident-check" type="checkbox" value="OK">
                    <div class="ingrident-name">${resposeJSON.meals[0]["strIngredient" + (j)]}</div>
                    <div class="ingrident-quantity">${resposeJSON.meals[0]["strMeasure" + (j)]}</div>
                    </div>`)
            }
        }
        setListener();
        if (AlreadyFavourite(resposeJSON.meals[0].idMeal)) {//if this recipe is already in favourite then change button style
            document.getElementById('recipe-favorite-button').style.display = "none";
            document.getElementById('remove-favorite-button').style.display = "inline";
        }


        //listener to add the favourite
        document.getElementById('recipe-favorite-button').addEventListener('click', () => {
            document.getElementById('recipe-favorite-button').style.display = "none";
            document.getElementById('remove-favorite-button').style.display = "inline";
            add_to_favourites(resposeJSON.meals[0].idMeal);
        })
        //listener to remove the favourite
        document.getElementById('remove-favorite-button').addEventListener('click', () => {
            document.getElementById('recipe-favorite-button').style.display = "inline";
            document.getElementById('remove-favorite-button').style.display = "none";
            remove_from_favourites(resposeJSON.meals[0].idMeal);
        })

    };
    xhrRequest.open('get', 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + recipeName);
    xhrRequest.send();




}
//check if this id is already in local storage or not
function AlreadyFavourite(id) {
    return localStorage.getItem(id) ? true : false;
}

//as the html is setting first so we will call this after setting the html
//function to strike down list on click of checkbox
function setListener() {
    const ingrident_checkbox = document.querySelectorAll('.ingridient input');
    ingrident_checkbox.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            //getting parent checkbox
            const paratostrike = checkbox.parentElement;
            //if checked strike it else none
            if (checkbox.checked)
                paratostrike.style.textDecoration = "line-through";
            else
                paratostrike.style.textDecoration = "none";

        })
    });
}




//getting the html page name so that we can run the function
var path = window.location.pathname;
var page = path.split("/").pop();

//basic if conditions which decides which function to call on which page
if (page == "recipe.html") {//run the fetch recipe function
    var url_string = window.location;
    var url = new URL(url_string);
    var item = url.searchParams.get("item");
    fetchRecipe(item)
}
else if (page == "detailed_category.html") {
    //run function to fetch and parse the data on detailed category page
    var url_string = window.location;
    var url = new URL(url_string);
    var category_name = url.searchParams.get("category_name");
    fetchRecipe_fromCat(category_name);
}
else if (page == "favourites.html") {
    getFavourites();
}

//function to fetch recipe from category and parse to html
function fetchRecipe_fromCat(category_name) {
    const container = document.getElementById('category-recipe-container');
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = () => {
        let resposeJSON = JSON.parse(xhrRequest.response);
        let res_length = resposeJSON.meals.length;
        //setting html
        for (let i = 0; i < res_length; i++) {
            let name = resposeJSON.meals[i].strMeal;

            container.innerHTML += `
            <div class="recipe-card">
                        <div class="recipecard-image"><img src="`+ resposeJSON.meals[i].strMealThumb + `"></div>
                        <div class="recipecard-info">`+ resposeJSON.meals[i].strMeal + `</div>
                        <div class="card-button">
                            <div class="recipecard-button"><a href="/recipe.html?item=`+ resposeJSON.meals[i].strMeal + `">Goto Recipe</a></div>
                            <div class="recipecard-fav-button" id=""><a href="#" onClick="add_to_favourites(`+ resposeJSON.meals[i].idMeal + `)"><i class="fa-regular fa-heart"></i></a>
                            </div>
                        </div>
                    </div>
            `
        }
    };
    xhrRequest.open('get', 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + category_name);
    xhrRequest.send();

}


//favorite button listener
function add_to_favourites(key) {
    alert("Added to your favourites");
    console.log(key, key)
    //storing data to local storage of browser
    //because we need only key to fetch and store data uniquely
    localStorage.setItem(key, key);//setting data with key as id and name as name of recipe
}
function remove_from_favourites(key) {
    alert("Removed from favourites");
    //deleting data from local storage
    localStorage.removeItem(key);
}

//getting data from id stored in localStorage
function getFavourites() {
    for (let i = 0; i < localStorage.length; i++) {//iterating overall the keys
        setFavourites(localStorage.key(i));//function to set the favourites as per the key given to it
    }
}


function setFavourites(key) {
    const container = document.getElementById('favourites-container');
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = () => {
        let resposeJSON = JSON.parse(xhrRequest.response);
        let res_length = resposeJSON.meals.length;
        console.log(resposeJSON.meals[0]);
        //setting html
                container.innerHTML += `
                <div class="favourite-card">
                    <div class="recipecard-image">
                        <img src="`+resposeJSON.meals[0].strMealThumb+`">
                    </div>
                    <div class="recipe-info-container">
                        <div class="favourite-recipe-name">`+resposeJSON.meals[0].strMeal+`</div>
                        <div class="favourite-recipe-button"><a href="/recipe.html?item=`+resposeJSON.meals[0].strMeal+`" class="fav-recipe-button">Goto Recipe</a>
                        </div>
                    </div>
                </div>
                `
    };
    xhrRequest.open('get', 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + key);
    xhrRequest.send();

}