
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
document.getElementById('search-input').addEventListener('keydown', (event) => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {//if the key pressed is of alphabet only as API can search only starting alphabet
        let keyPressed = event.key;
        var xhrRequest = new XMLHttpRequest();
        xhrRequest.onload = () => {
            let suggestion_container = document.getElementById('suggestion-container');
            try{
            let resposeJSON = JSON.parse(xhrRequest.response);
            let res_length = resposeJSON.meals.length;
            let suggetion_count=0;
            console.log("AS"+""+res_length);
            suggestion_container.innerHTML="";
            //setting the html for categries that we got
            for (let i = 0; i < res_length; i++) {
                suggetion_count+=1;
                let name = resposeJSON.meals[i].strMeal;
                console.log(name);
                suggestion_container.innerHTML += `
                <div id="suggetion-item`+suggetion_count+`">`+name+`</div>
                <hr>
            `;
            }
            console.log(resposeJSON);
        }
        catch(e){
            console.log("ERROR"+e);
            suggestion_container.innerHTML="No Results Found";
        }

        };
        xhrRequest.open('get', 'https://www.themealdb.com/api/json/v1/1/search.php?f=' + keyPressed);
        xhrRequest.send();
    }

})