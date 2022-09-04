//ajax call to get the category only for category.html
//link to search anything with category:
// https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta
(function () {
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = () => {
        let resposeJSON = JSON.parse(xhrRequest.response);
        let res_length=resposeJSON.categories.length;
        //setting the html for categries that we got
        for (let i = 0; i < res_length; i++) {
            //getting name of the category and image for the category
            let category_name = resposeJSON.categories[i].strCategory;
            let image = resposeJSON.categories[i].strCategoryThumb;
            console.log(category_name+""+image)
            let category_container = document.getElementById('category-container');
            category_container.innerHTML+=`
            <div id="category">
                <a href="https://www.themealdb.com/api/json/v1/1/filter.php?c=`+category_name+`"><div id="category-img"><img src="`+image+`" alt="Category image"></div></a>
                <div id="catgeory-name">`+category_name+`</div>
            </div>
            `;

        }
    };
    xhrRequest.open('get', 'https://www.themealdb.com/api/json/v1/1/categories.php');
    xhrRequest.send();

})();

