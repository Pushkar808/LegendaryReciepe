
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
            console.log(category_name + "" + image)
            let category_container = document.getElementById('category-container');
            category_container.innerHTML += `
            <div id="category">
                <a href="https://www.themealdb.com/api/json/v1/1/filter.php?c=`+ category_name + `"><div id="category-img"><img src="` + image + `" alt="Category image"></div></a>
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
            console.log(receipe_name);
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
                receipe_name.push(name);//so that we have the array for the particular letter recipes
                console.log(name);
                suggestion_container.innerHTML += `
        <div id="suggetion-item`+ suggetion_count + `">` + name + `</div>
        <hr>
    `;
            }
            console.log(resposeJSON);
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
        let res_length = resposeJSON.meals.length;
        // //setting the html for recipe that we got
        for (let i = 0; i < res_length; i++) {
            //     //getting name of the category and image for the category
            console.log("SAA" + resposeJSON.meals[i].strMealThumb);
            //appending to only required HTML (can use above way also) since we didn't need to loop them 
            document.getElementById('recipe-header').innerHTML += resposeJSON.meals[i].strMeal;
            document.getElementById('recipe-category').innerHTML += `<p><b>Category: </b>` + resposeJSON.meals[i].strCategory + `</p>`;
            document.getElementById('recipe-area').innerHTML += `<p><b>Area Of Origin: </b>` + resposeJSON.meals[i].strArea + `</p>`;
            document.getElementById('recipe-info').innerHTML += `<p>` + resposeJSON.meals[i].strInstructions + `</p>`;
            document.getElementById('recipe-img-container').innerHTML += `<img src="` + resposeJSON.meals[i].strMealThumb + `">`;

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
        }
    };
    xhrRequest.open('get', 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + recipeName);
    xhrRequest.send();

}
//as the html is setting first so we will call this after setting the html
//function to strike down list on click of checkbox
function setListener() {
    const ingrident_checkbox = document.querySelectorAll('.ingridient input');
    console.log(ingrident_checkbox)
    ingrident_checkbox.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            console.log("OKkk")
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

//redirecting to the recipe page on submit of a search item
var form_submit= () => {
    console.log("OK");
    var url_string = window.location;
    var url = new URL(url_string);
    var item = url.searchParams.get("item");
    console.log(item);
    
    // fetchRecipe(item);
}


// fetchRecipe("Arrabiata")