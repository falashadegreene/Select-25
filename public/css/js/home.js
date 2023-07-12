'use strict';

// **** Global Variables ****

let voteCount = 25;
let allProduct = [];

// **** DOM References ****

let imgContainer = document.getElementById('image-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let seeResultsBtn = document.getElementById('see-results-btn');
let reslutsList = document.getElementById('results-list');

// **** Canvas Reference ****

let ctx = document.getElementById('my-chart').getContext('2d');

// **** Constructor ****

function Product(name, fileExtension = 'jpeg') {
  this.name = name;
  this.views = 0;
  this.votes = 0;
  this.photo = `img/${name}.${fileExtension}`;

  allProduct.push(this);
}

// **** Local Storage Part 2 *****

let retreivedProduct = localStorage.getItem('products');

let parsedProduct = JSON.parse(retreivedProduct);

if(retreivedProduct){
  allProduct = parsedProduct;
} else {
  new Product('bag');
  new Product('banana');
  new Product('bathroom');
  new Product('boots');
  new Product('breakfast');
  new Product('bubblegum');
  new Product('chair');
  new Product('cthulhu');
  new Product('dog-duck');
  new Product('dragon');
  new Product('pen');
  new Product('pet-sweep');
  new Product('scissors');
  new Product('shark');
  new Product('sweep', 'png');
  new Product('tauntaun');
  new Product('unicorn');
  new Product('water-can');
  new Product('wine-glass');

}



// **** Helper function/Code ****

function getRandomIndex() {
  return Math.floor(Math.random() * allProduct.length);
}

let randomProduct = [];

function renderImages() {

  while (randomProduct.length < 6) {
    let RandomNumber = getRandomIndex();
    while (!randomProduct.includes(RandomNumber)) {
      randomProduct.push(RandomNumber);
    }

  }
  let productOneIndex = randomProduct.shift();
  let productTwoIndex = randomProduct.shift();
  let productThreeIndex = randomProduct.shift();

  imgOne.src = allProduct[productOneIndex].photo;
  imgOne.alt = allProduct[productOneIndex].name;
  allProduct[productOneIndex].views++;

  imgTwo.src = allProduct[productTwoIndex].photo;
  imgTwo.alt = allProduct[productTwoIndex].name;
  allProduct[productTwoIndex].views++;

  imgThree.src = allProduct[productThreeIndex].photo;
  imgThree.alt = allProduct[productThreeIndex].name;
  allProduct[productThreeIndex].views++;

}

renderImages();

// **** function Rendering Chart ****

function renderChart() {
  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for(let i = 0; i < allProduct.length; i++) {
    productNames.push(allProduct[i].name);
    productVotes.push(allProduct[i].votes);
    productViews.push(allProduct[i].views);
  } 

  let myChartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        backgroundColor: [
          '#E98973',
          '#E98973',
        ],
        borderColor: [
          '#E98973',
          '#E98973',
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: productViews,
        backgroundColor: [
          '#658EA9',
          '#658EA9',
        ],
        borderColor: [
          '#658EA9',
          '#658EA9',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  new Chart(ctx, myChartObj);

}

// *** Event Handlers ****

function handleClick(event) {
  voteCount--;

  let imgClicked = event.target.alt;

  for(let i = 0; i < allProduct.length; i++){
    if(imgClicked === allProduct[i].name){
      allProduct[i].votes++;
    }
  }
  renderImages();

  if(voteCount === 0){
    imgContainer.removeEventListener('click', handleClick);


    // **** Starting Local Storage *****

    let stringifiedProduct = JSON.stringify(allProduct);

    console.log(stringifiedProduct);

    localStorage.setItem('products', stringifiedProduct);
  }

}

function handleShowResults(){
  if(voteCount === 0){
    renderChart();
    seeResultsBtn.removeEventListener('click', handleShowResults);
  }
}

// **** Event Listener ****

imgContainer.addEventListener('click', handleClick);
seeResultsBtn.addEventListener('click', handleShowResults);