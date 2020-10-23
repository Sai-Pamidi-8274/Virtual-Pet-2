var dog, happyDog;
var database;
var foodS, foodStock;
var load, load1;
var lastFed, fedTime
var foodObject;

function preload() {
  load = loadImage("images/dogImg.png");
  load1 = loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(1100, 600);
  dog = createSprite(250, 300);
  dog.scale = 0.1;
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  dog.addImage(load);
  foodObject = new hunger();
  feed = createButton("feed the dog!");
  feed.position(1100, 400);
  feed.mousePressed(feedDog);
  addFood = createButton("PRESS TO ADD MORE FOOD");
  addFood.position(1100, 200);
  addFood.mousePressed(addFoods)


}


function draw() {
  background(46, 139, 87);
  foodObject.display();
  fedTime = database.ref("FeedTime");
  fedTime.on("value", function (data) {
    lastFed = data.val();

  });

  fill("white");
  if (lastFed >= 12) {
    text("lastFeed : " + lastFed % 12 + "PM", 500, 200);
  } else if (lastFed == 0) {
    text("last Fed : 12AM", 500, 200);
  } else {
    text("last Fed : " + lastFed + "AM", 500, 200)
  }



  drawSprites();
}








function readStock(data) {

  foodS = data.val();
  foodObject.updateFoodStock(foodS);






}

function writeStock(x) {
  if (x <= 0) {
    x = 0;

  } else {
    x = x - 1;

  }
  database.ref("/").update({

    Food: x

  });
}


function feedDog() {
  dog.addImage(load);
  foodObject.updateFoodStock(foodObject.getFoodStock() - 1);
  database.ref("/").update({

    Food: foodObject.getFoodStock(),
    FeedTime: hour()
  });
}


function addFoods() {
  foodS = foodS + 1;
  database.ref("/").update({
    Food: foodS
  })
}