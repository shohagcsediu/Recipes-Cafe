// Variable declaration
const foodCardArea = document.querySelector(".food-card-area");
const itemSearch = document.getElementById("item-search");
const searchBtn = document.getElementById("search-btn");

const itemCallByName = () => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${itemSearch.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((food) => {
      console.log(food);
      foodShow(food);
    });
};

// item show and validator function
const foodShow = (foods) => {

  if (itemSearch.value.length <= 0 || foods.meals == null) {
    foodCardArea.innerHTML = `
       <div class="alert bg-warning" role="alert">
         <h4> No Meal found for "${itemSearch.value}" Try another name (example: Chicken)</h4>
        </div>
       `;
    foodCardArea.classList.remove("food-card-area");
    foodCardArea.classList.add("food-card-warning");
  } else {
    allItemShow(foods)
  }
};

// click event
searchBtn.addEventListener("click", () => {
  itemCallByName();
});

const allItemShow = (data) => {
  const allFood = data.meals;
  const allFindItem = document.createElement("div");
  foodCardArea.classList.add("food-card-area");

  // get meal card
  for (let i = 0; i < allFood.length; i++) {
    const food = allFood[i];
    const foodCard = document.createElement("div");
    foodCard.id = food.idMeal;
    foodCard.className = "food-card";
    foodCard.setAttribute("onclick", "getSelectCard(this.id)");

    foodCard.innerHTML = `
        <div class="card" >
            <img src="${food.strMealThumb}" class="card-img-top item-thumbnail" alt="...">
            <div class="card-body">
                <h5 class="text-center"> ${food.strMeal}</h5>
            </div>
        </div>
        `;
    allFindItem.appendChild(foodCard);
  }

  foodCardArea.innerHTML = allFindItem.innerHTML;
  foodCardArea.classList.add("food-card-area");
}

const callItemById = (id) => {
  const idUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(idUrl)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      itemDetailWindow(data);

    })
}

const foodDetailShower = document.getElementById("food-details-show")

const closeWindow = () => {
  foodDetailShower.classList.remove("food-details-move");
};

const getSelectCard = (id) => {
  console.log(id);
  foodDetailShower.classList.add("food-details-move");
  callItemById(id)
}

const itemDetailWindow = (item) => {
  console.log(item);
  const meal = item.meals[0]
  foodDetailShower.innerHTML = `
    <div class="card item" >
      <img src="${meal.strMealThumb}" class="card-img-top item" alt="...">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions}</p>
      </div>
        <button onclick="closeWindow()" class="close-icon "> &times; </button>
    </div>
   `;

}
