//Create variables here
var dog,happyDog,databse,foodS,foodStock,feedTime,lastFed,Feed,addFood,foodObject;
var dogImage,dogImage1;

function preload()
{
	//load images here
  dogImage=loadImage("images/dog1.png");
  dogImage1=loadImage("images/dog2.png");
}

function setup() {
	createCanvas(1000, 400);
  database=firebase.database();
  foodObject=new Food()
  dog=createSprite(600,250,10,10);
  dog.addImage(dogImage);
  dog.scale=0.3;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  Feed=createButton("Feed The Dog")
  Feed.position(700,100);
  Feed.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(800,100);
  addFood.mousePressed(addfoodS);
}


function draw() {  
  background(46,139,87);

  foodObject.display();
  FeedTime=database.ref('FeedTime');
  FeedTime.on("value",function(data){
    lastFed=data.val();
  })

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed: "+lastFed%12 + "pm",350,30)
}
else if(lastFed===0){
  text("Last Feed:12am",350,30)
}
else{
  text("Last Feed: " + lastFed +"am",350,30);
}

  if(keyWentDown(UP_ARROW)){
writeStock(foodS);
dog.addImage(dogImage1);

  }


  drawSprites();
}

function addfoodS(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data){
  foodS=data.val();
  foodObject.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(dogImage1);
  foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObject.getFoodStock(),
    FeedTime:hour()
  })
}

