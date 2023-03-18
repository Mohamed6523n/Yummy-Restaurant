function openNav() {
    $('nav').css({ left: `320px`, Transition: 'all 0.5s' })
    $('.item').slideDown(500)
    $('.icon-x').removeClass('fa-bars')
    $('.icon-x').addClass('fa-xmark')
}

function close() {
    $('nav').css({ left: `0px`, Transition: 'all 0.5s' })
    $('.item').slideUp(500)
    $('.icon-x').removeClass('fa-xmark')
    $('.icon-x').addClass('fa-bars')
}


$('#search').click(function () {
    $('#containerSearch').removeClass('d-none')
    close()
    $('.contact').addClass('d-none')
    $('#mealCont').removeClass('d-none')

})

$('#categor').click(function () {
    getCat()
    close()
    $('.contact').addClass('d-none')
    $('#mealCont').removeClass('d-none')
    $('#containerSearch').addClass('d-none')
})

$('#area').click(function () {
    getArea()
    $('.contact').addClass('d-none')
    $('#mealCont').removeClass('d-none')
    close()
    $('#containerSearch').addClass('d-none')

})


$('#Ingredients').click(function () {
    getIngredient()
    close()
    $('.contact').addClass('d-none')
    $('#mealCont').removeClass('d-none')
    $('#containerSearch').addClass('d-none')

})




$('#contact').click(function () {
    $('.contact').removeClass('d-none')
    $('#mealCont').addClass('d-none')
    close()
})

let idMeal;
let allData;






async function getAll() {
    let r = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    let data = await r.json()
    allData = data.meals
    displayAll()

}
getAll()


function displayAll() {
    let cols = ``
    for (var i = 0; i < allData.length; i++) {
        cols += `
        <div class="col-md-3 my-4  rounded-3 " onclick="clickdeAll(${i})">
                        <img src="${allData[i].strMealThumb}" class="rounded-3 w-100" alt="">
                        <div class="caption rounded-3">
                            <h3  class="mt-5 w-100">${allData[i].strMeal}</h3>
                        </div>
                    </div>

        `
    }
    $('#rowData').html(cols)


}


//===================== by id =================
// ================================================================== click ====================

function clickdeAll(index) {
    idMeal = allData[index].idMeal
    getById(idMeal)
}

let idData;
let clickedData;
async function getById(id) {
    let r = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let data = await r.json()
    idData = data.meals
    clickedData = idData[0].strTags

    displayById()

}


function displayById() {

    let i = `
        <div class="text-white col-md-4">
                <img class="w-100 rounded-3" src="${idData[0].strMealThumb}" alt="">
                <h2>${idData[0].strMeal}</h2>
            </div>
            <div class="text-white col-md-8">
                <h2>Instructions</h2>
                <p> ${idData[0].strInstructions}</p>
                <h3> <span class="fw-bolder">Area</span> : ${idData[0].strArea}</h3>
                <h3>  <span class="fw-bolder">Category</span> : ${idData[0].strCategory}</h3>
                <h3 id="h3Inner"> <span class="fw-bolder">Recipes</span> : 
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${idData[0].strIngredient1}</span>
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${idData[0].strIngredient2}</span>
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${idData[0].strIngredient3}</span>
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${idData[0].strIngredient4}</span>
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${idData[0].strIngredient5}</span>
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${idData[0].strIngredient6}</span>
                
                </h3>
                <h3 id="tagText"> Tags :
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${idData[0].strTags}</span>

                 </h3>
               <br>
                <a href="${idData[0].strSource}" class="mt-2 btn btn-success">Source</a>
                <a href="${idData[0].strYoutube}" class="mt-2 btn btn-danger">You tube</a>
                </div>

    `
    $('#rowData').html(i)

}



// =================== cat ========================================================================================================================================


//https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772








//=============== by Category ==============
let catData
async function getCat() {
    let r = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let data = await r.json()
    catData = data.categories
    displayCat()




}


function displayCat() {
    let cols = ``
    for (let i = 0; i < catData.length; i++) {
        cols += `
        
              <div class="col-md-3 my-4 rounded-4 text-center"  onclick="clicedCategory(${i})" >
                <img src="${catData[i].strCategoryThumb}" class="rounded-4  w-100" alt="....">
                <div class="caption rounded-4  ">
                    <h1 class="my-4">${catData[i].strCategory}</h1>
                    <p>${catData[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
            </div>

        `
    }
    $('#rowData').html(cols)

}


function clicedCategory(index) {
    let names = catData[index].strCategory

    // console.log(names);
    CategoryCl(names)
}

let glopalData;
async function CategoryCl(name) {

    let r = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let data = await r.json()
    glopalData = data.meals
    displyClickCat()

}

function displyClickCat() {

    let col = ``
    for (let i = 0; i < glopalData.length; i++) {
        col += `
         <div class="col-md-3 my-4  rounded-3 " onclick="ClickMeal(${i})">
                        <img src="${glopalData[i].strMealThumb}" class="rounded-3 w-100" alt="">
                        <div class="caption rounded-3">
                            <h3  class="mt-5 w-100">${glopalData[i].strMeal}</h3>
                        </div>
                    </div>
        
        
        `
    }

    $('#rowData').html(col)

}

function ClickMeal(i) {
    let col = ``


    col = `
        <div class="text-white col-md-4">
                <img class="w-100 rounded-3" src="${glopalData[i].strMealThumb}" alt="">
                <h2>${glopalData[i].strMeal}</h2>
            </div>
            <div class="text-white col-md-8">
                <h2>Instructions</h2>
                <p> ${glopalData[i].strInstructions}</p>
                <h3> <span class="fw-bolder">Area</span> : ${glopalData[i].strArea}</h3>
                <h3>  <span class="fw-bolder">Category</span> : ${glopalData[i].strCategory}</h3>
                <h3 id="h3Inner"> <span class="fw-bolder">Recipes</span> : 
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${glopalData[i].strIngredient1}</span>
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${glopalData[i].strIngredient2}</span>
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${glopalData[i].strIngredient3}</span>
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${glopalData[i].strIngredient4}</span>
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${glopalData[i].strIngredient5}</span>
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${glopalData[i].strIngredient6}</span>
                
                </h3>
                <h3 id="tagText"> Tags :
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${glopalData[i].strTags}</span>

                 </h3>
               <br>
                <a href="${glopalData[0].strSource}" class="mt-2 btn btn-success">Source</a>
                <a href="${glopalData[0].strYoutube}" class="mt-2 btn btn-danger">You tube</a>
                </div>

    `

    $('#rowData').html(col)
}
// https://www.themealdb.com/api/json/v1/1/categories.php


let nameData
async function getIngredient() {
    let r = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    let data = await r.json()
    nameData = data.meals

    displayIngre();

}

function displayIngre() {
    let cols = ``
    for (let i = 0; i < 20; i++) {
        cols += `
        
              <div class="col-md-3  my-4 rounded-4 text-white text-center" onclick="clickIng(${i})">
              <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3 class=" my-4">${nameData[i].strIngredient}</h3>
                 <p>${nameData[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
               
            </div>

        `
    }
    $('#rowData').html(cols)
}
////https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast


let inData;
let idIngr;
async function disIng(name) {
    let r = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`)
    let data = await r.json()
    inData = data.meals
    displayIngs()

}






function displayIngs() {

    col = ``
    for (let i = 0; i < inData.length; i++) {

        col += `
    <div class="col-md-3 my-4  rounded-3 " onclick="clicedIngred(${i})">
                        <img src="${inData[i].strMealThumb}" class="rounded-3 w-100" alt="">
                        <div class="caption rounded-3">
                            <h3  class="mt-5 w-100">${inData[i].strMeal}</h3>
                        </div>
                    </div>

    `
    }
    $('#rowData').html(col)

}
function clicedIngred(i) {
    idIngr = inData[i].idMeal

    getByIngred(idIngr)
}
async function getByIngred(id) {
    let r = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let data = await r.json()
    idData = data.meals
    clickedData = idData[0].strTags

    displayById()

}

function ClickIngredints(i) {

    let col = `
        <div class="text-white col-md-4">
                <img class="w-100 rounded-3" src="${glopalData[i].strMealThumb}" alt="">
                <h2>${glopalData[i].strMeal}</h2>
            </div>
            <div class="text-white col-md-8">
                <h2>Instructions</h2>
                <p> ${glopalData[i].strInstructions}</p>
                <h3> <span class="fw-bolder">Area</span> : ${glopalData[i].strArea}</h3>
                <h3>  <span class="fw-bolder">Category</span> : ${glopalData[i].strCategory}</h3>
                <h3 id="h3Inner"> <span class="fw-bolder">Recipes</span> : 
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${glopalData[i].strIngredient1}</span>
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${glopalData[i].strIngredient2}</span>
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${glopalData[i].strIngredient3}</span>
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${glopalData[i].strIngredient4}</span>
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${glopalData[i].strIngredient5}</span>
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${glopalData[i].strIngredient6}</span>
                
                </h3>
                <h3 id="tagText"> Tags :
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${glopalData[i].strTags}</span>

                 </h3>
               <br>
                <a href="${glopalData[0].strSource}" class="mt-2 btn btn-success">Source</a>
                <a href="${glopalData[0].strYoutube}" class="mt-2 btn btn-danger">You tube</a>
                </div>

    `

    $('#rowData').html(col)
}

function clickIng(i) {
    let r = nameData[i].strIngredient
    disIng(r)

}




// =================== Area ============================

let areaData
async function getArea() {
    let r = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    let data = await r.json()
    areaData = data.meals
    displayArea()


}


// getArea()

function displayArea() {
    let cols = ``
    for (let i = 0; i < 20; i++) {
        cols += `
        
              <div class="col-md-3   rounded-4 text-white text-center"  onclick="getAreaMeal(${i})">
                 <i class="fa fa-solid fs-1 my-2 fa-regular fa-house"></i>   
                 <h3>${areaData[i].strArea}</h3>
               
            </div>

        `
    }
    $('#rowData').html(cols)
}




let areaMeals
async function getAreaMeal(i) {
    let r = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaData[i].strArea}`)
    let data = await r.json()
    areaMeals = data.meals
    displayAreaMeals()
}



function displayAreaMeals() {
    let cols = ``
    for (let i = 0; i < areaMeals.length; i++) {
        cols += `
                <div class="col-md-3 my-4  rounded-3 " onclick="onClickMeal(${i})"  >
                        <img src="${areaMeals[i].strMealThumb}" class="rounded-3 w-100" alt="">
                        <div class="caption rounded-3">
                            <h3  class="mt-5 w-100">${areaMeals[i].strMeal}</h3>
                        </div>
                    </div>
           

        `
    }
    $('#rowData').html(cols)
}




function onClickMeal(i) {
    let r = areaMeals[i].idMeal
    getByIdArea(r)

}



let idMealsArea;
let clickedMealsArea;
async function getByIdArea(id) {
    let r = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let data = await r.json()
    idMealsArea = data.meals

    displayByIdArea()

}

function displayByIdArea() {

    let i = `
        <div class="text-white col-md-4">
                <img class="w-100 rounded-3" src="${idMealsArea[0].strMealThumb}" alt="">
                <h2>${idMealsArea[0].strMeal}</h2>
            </div>
            <div class="text-white col-md-8">
                <h2>Instructions</h2>
                <p> ${idMealsArea[0].strInstructions}</p>
                <h3> <span class="fw-bolder">Area</span> : ${idMealsArea[0].strArea}</h3>
                <h3>  <span class="fw-bolder">Category</span> : ${idMealsArea[0].strCategory}</h3>
                <h3 id="h3Inner"> <span class="fw-bolder">Recipes</span> : 
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${idMealsArea[0].strIngredient1}</span>
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${idMealsArea[0].strIngredient2}</span>
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${idMealsArea[0].strIngredient3}</span>
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${idMealsArea[0].strIngredient4}</span>
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${idMealsArea[0].strIngredient5}</span>
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${idMealsArea[0].strIngredient6}</span>
                
                </h3>
                <h3 id="tagText"> Tags :
                 <span class="d-inline-block m-2 text-dark  bg-info-subtle py-2 rounded-3 px-3">${idMealsArea[0].strTags}</span>

                 </h3>
               <br>
                <a href="${idMealsArea[0].strSource}" class="mt-2 btn btn-success">Source</a>
                <a href="${idMealsArea[0].strYoutube}" class="mt-2 btn btn-danger">You tube</a>
                </div>

    `
    $('#rowData').html(i)

}

// showSearchInputs()


let search;
function displaySerchMeal() {
    let cols = ``
    for (let i = 0; i < search.length; i++) {
        cols += `
        <div class="col-md-3 my-4  rounded-3 ">
                        <img src="${search[i].strMealThumb}" class="rounded-3 w-100" alt="">
                        <div class="caption rounded-3">
                            <h3 class="mt-5 w-100">${search[i].strMeal}</h3>
                        </div>
                    </div>

        `
    }
    $('#rowData').html(cols)
}
async function searchByNames(tx) {

    $('rowData').innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${tx}`)
    response = await response.json()
    search = response.meals
    console.log(search);
    displaySerchMeal()


}

async function searchByFLetter(tx) {
    rowData.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${tx}`)
    response = await response.json()
    search = response.meals
    displaySerchMeal()

}


// https://www.themealdb.com/api/json/v1/1/list.php?a=list

// ==================== open and close the nav =============================


$('i').click(() => {
    let wi = $('.sild-nav').width()
    let open_close = $('.sild-nav').offset().left
    //  console.log('widthe',widthe);console.log(open_close);
    if (open_close == '-320') {
        openNav()

    } else {
        close()
    }
})



$(window).ready(()=>{
    $('.loading').slideUp(2000,function(){
        $('body').css('overflow-y','scroll')

    })
})



