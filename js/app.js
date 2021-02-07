// recipe search  button click handle
const recipeName = document.getElementById("search-box").value;
document.getElementById("search-btn").addEventListener("click", function () {
  const recipeName = document.getElementById("search-box").value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f&s=${recipeName}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayItem(data));
  document.getElementById("container").innerHTML = "";
});

// display recipe item
function displayItem(data) {
  data.meals.forEach((recipeName) => {
    const checkValue = document.getElementById("search-box").value;
    const mainDiv = document.getElementById("container");
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";
    const recipeNames = `
          <img id ="click-details" onclick="displayRecipeDetails('${recipeName.strMeal}')" src="${recipeName.strMealThumb}" alt="">
          <h1 id="item-name" > ${recipeName.strMeal} </h1>
          `;
    recipeCard.innerHTML = recipeNames;
    mainDiv.appendChild(recipeCard);
    document.getElementById("search-box").value = "";

 // input validation
    if (checkValue === " ") {
      displayBlock("container", "none");
      displayBlock("error-notify", "block");
    }
  });
}

//display recipe details on top
const displayRecipeDetails = (name) => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=${name}';
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayBlock("recipe-details", "block");
      document
        .getElementById("image")
        .setAttribute("src", data.meals[0].strMealThumb);
      sum("recipeName", data.meals[0].strMeal);
      sum("li-1", data.meals[0].strIngredient1);
      sum("li-2", data.meals[0].strIngredient2);
      sum("li-3", data.meals[0].strIngredient3);
      sum("li-4", data.meals[0].strIngredient4);
      sum("li-5", data.meals[0].strIngredient5);
      sum("li-6", data.meals[0].strIngredient6);
      sum("li-7", data.meals[0].strIngredient7);
      sum("li-8", data.meals[0].strIngredient8);
      sum("li-9", data.meals[0].strIngredient9);
    });
};

// function for innerTex
const sum = (id, item) => {
  document.getElementById(id).innerText = item;
};

//function for display
const displayBlock = (id, name) => {
  document.getElementById(id).style.display = name;
};
