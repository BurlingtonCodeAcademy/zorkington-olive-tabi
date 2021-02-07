const { Console } = require("console");
const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}
// welcome message doesn't go back to this
const welcomeMessage = `The year is 2050.  Covid-19 has just been eradicated and you are now aloud to go out! \n You meet your friends at your favorite spot for ONE drink.  As you finish, your friends ask if the night should continue... `;  //  \n\nDo you want to continue your night out?`;
console.log(welcomeMessage);
start();


async function start() {
  let answer = await ask("\n\nDo you want to continue your night out?");
//ask if want to start game
  if (answer === "no" || answer === "n") {
    console.log("Enjoy your lame night in!");
    process.exit();
  } else if (answer === "yes" || answer === 'y') {
    console.log(
      "You exit the Radio Bean and find yourself at the intersection of Pearl and N.Winooski.  To the east is the hill to UVM and to the south a familiar sight....."
    ); 
    player.currentRoom = "radio bean"; //brings us to current/starting room
    return play();
  } else {
    console.log("Sorry, I didn't catch that!")
   return start();}
}

//--------------------------------- TABI + OLIVES CODE ------------------------------------------------

//  start of player object...
let player = {
  name: [],
  inventory: [],
  currentRoom: [],
  susPoints: 0,

  //moveRoom : function() {}
};

// Room class. including name, description inventory, directionals and will have actions available later
class RoomClass {
  constructor(name, description, inventory, north, east, south, west) {
    this.name = name;
    this.description = description;
    this.inventory = inventory;
    this.north = north || null;
    this.east = east || null;
    this.south = south || null;
    this.west = west || null;
  }
}

//  inventory class
class InvObjectsClass {
  constructor(name, takeDescription, useDescription, action, susPoints) { // i removed starting room, ending room and added a take description and a use description
    this.name = name;
    this.takeDescription = takeDescription;
    this.useDescription = useDescription;
    // this.startingRoom = startingRoom;
    // this.currentRoom = currentRoom || startingRoom; // may need an inventory room for objects to be in...
    this.action = action || []; // action array
    this.susPoints = susPoints;
  }
  // obUse(userInputAction) {
  //   if (this.action.includes(userInputAction)) {
  //     console.log(invObjects.description);
  //   }
  // }
}

//  user actions look table object

let userAction = {
  move: ["go", "walk"],
  use: ["use", "play", "get", "drink", "eat", "give"], //tip? ///also, switching order for now
  take: ["take", "grab", "order"], //added order here for food cart...but it might cause issue of "can't do that later... "
  // open: ["open", "unlock"],
  drop: ["drop"],
  examine: ["examine"],
  inventory: ["inventory", "i"],
};

//  objects... maybe cant include locations because of variable shadowing
//  need to define things in objects AFTER we define them... maybe dont need these pieces.. will need to decide
const water = new InvObjectsClass(
  "water",
  "Ahhh water. That will be refreshing later",
  "Ah, a nice refreshing water. Always important to remember on a night out on the town.\nYou've gained 15 sustenance points.",
  // undefined,
  // undefined,
  [],
  15
);


const shot = new InvObjectsClass(
  "shot",
  "shots! shots! shots! What's a night out drinking without shots?",
  "Down the hatch.\nAlthough they're good for the soul, they certainly won't help you make it through the night. 1 sustenance point. ",
  // undefined,
  // undefined,
  [],
  1
);

const map = new InvObjectsClass(
  "map",
  "I guess you never know when a map of Burlington could come in handy...?",
  "A map is a great way to find your way way around!",
  // undefined,
  // undefined,
  [],
  0
);

const sparkWater = new InvObjectsClass(
  "sparkling water",
  "The fanciest of the waters, you'll be so glad you have this later.....",
  "Wow! So fancy! This really hits the spot...\nYou have gained 30 sustenance points.",
  // undefined,
  // undefined,
  [],
  30
);

const food = new InvObjectsClass(
  "food",
  "MMMMMHHHHHHHH, that smells good.....",
  "I was absolutely famished! Nothing like a late night street treat to REALLY keep me goin'\nLooks like you really needed that. You gained 30 sustenance points. ",
  //ndefined,
  //undefined,
  [],
  30
);

const prize = new InvObjectsClass(
  "rise n shiner",
  "It's hot and good and will keep you alive....",
  "With the perfect combo of meat, egg, cheese, and a hashbrown our night is complete.  You gained 50 sustenance points. ",
// undefined,
  // undefined,
  [],
  50
);

// inventory look up table
let invObjects = {
  "map": map,
  "water": water,
  "still": water,
  "sparkling": sparkWater,
  'sparkling water': sparkWater,
  "shot": shot,
  "booze":shot,
  "drink":shot,
  "food": food,
  "pizza": food,
  "sandwich": prize,
  "rise": prize,
  "shiner": prize,
  "rise n shiner": prize
};
//roomClass for all rooms below
//starting room
const radioBean = new RoomClass(
  "The Radio Bean",
  "The Radio Bean",
  [],
  null,
  null,
  null,
  null
);

const churchStreetOne = new RoomClass(
  "Church Street One",
  "Church street stretches out ahead of you to the south, to the east you see the three needs.  There doesn't seem to be a line.",
  [],
  null,
  null,
  null,
  null
);

const threeNeeds = new RoomClass(
  "threeNeeds",
  "Oh boy... did you miss this place. You enter the Three Needs. You go up the stairs, show your ID, and your permitted into the main room.\n You could order a drink at the bar, eat a slizzing slice of 'za, or continue on east to the pool room.",
  [water, shot, food],
  null,
  null,
  null,
  null
);
//map is here for puzzle!!
const threeNeedsPoolRoom = new RoomClass(
  "threeNeeds pool room",
  "The pool room. Sometimes the only chance you have of getting a quick drink on a busy night.\n Here you can get a drink, but over by the additional pool tables you notice something interesting... is it, a map of Burlington?",
  [map, water, shot],
  null,
  null,
  null,
  null
);

const foodCart = new RoomClass(
  "Food Cart",
  "Hmmm... the smells of sweet snacks waft your way. The guy working the cart wants to know if you want to order anything.",
  [water, food],
  null,
  null,
  null,
  null
);

const finnegans = new RoomClass(
  "Finnegans",
  "Its a little dark, its a little smelly, but the beer is good and the companies even better.  Not much to do here but head to the bar.....",
  [shot],
  null,
  null,
  null,
  null
);

const deli126 = new RoomClass(
  "Deli 126",
  "This place seems a little fancier than most.  When you approach the bar the bar tender asks if you want some water... sparkling or still",
  [shot, water, sparkWater],
  null,
  null,
  null,
  null
);

const redSquare = new RoomClass( 
  "Red Square",
  "The bass is bumping and the night is getting late... is anyone in here even 21?? The bar lies ahead... ",
  [shot],
  null,
  null,
  null,
  null
);

//win conditional will be here
const kkd = new RoomClass(
  "Kountry Kart Deli",
  "As the night comes to end, the drunks stagger in... you're blinded by the sharp fluorescents of KKD. But its all well, well worth it for two reasons. The glory of your well-earned, greasy Rise N' Shiner. And more importantly, the presence of the all-powerful Bob",
  [prize, water],
  null,
  null,
  null,
  null
);

const churchStreetTwo = new RoomClass(
  "Church Street Two",
  "Church street stretches out ahead of you to the north and south, and to the east you see a food cart.  There are people everywhere.",
  [],
  null,
  null,
  null,
  null
);

const churchStreetThree = new RoomClass(
  "Church Street Three",
  "Church street stretches out ahead of you to the north and south.  To the east Finnegans and west is Deli 126.",
  [],
  null,
  null,
  null,
  null
);

const churchStreetFour = new RoomClass(
  "Church Street Four",
  "Church street stretches out ahead of you to the north and south.  To the east Red Square and west is kkd.",
  [],
  null,
  null,
  null,
  null
);

const churchStreetDrunk = new RoomClass(
  "church street drunk",
  "A mob of drunk tourists swarm you... they're mumbling something about being lost... you can't get by...\nThey won't let you through until you help them! They need directions!! ",
  [],
  null,
  null,
  null,
  null
);

const hillUp = new RoomClass(
  "hill up",
  "Oof. You are in no capacity to walk up the hill to UVM... you try, you quickly fail... your night is over.\n Better luck next time!",
  [],
  null,
  null,
  null,
  null
);

///DIRECTIONALS

//  manually modifying/adding room connections
radioBean.south = churchStreetOne;
radioBean.east = hillUp;
churchStreetOne.south = churchStreetTwo;
churchStreetOne.east = threeNeeds;
threeNeeds.east = threeNeedsPoolRoom;
threeNeeds.west = churchStreetOne;
threeNeedsPoolRoom.west = threeNeeds;
churchStreetTwo.south = churchStreetThree;
churchStreetTwo.north = churchStreetOne;
churchStreetTwo.east = foodCart;
foodCart.west = churchStreetTwo;
churchStreetThree.north = churchStreetTwo;
churchStreetThree.east = finnegans;
churchStreetThree.west = deli126;
churchStreetThree.south = churchStreetDrunk;
finnegans.west = churchStreetThree;
finnegans.east = hillUp;
deli126.east = churchStreetThree;
churchStreetDrunk.north = churchStreetThree;
churchStreetFour.north = churchStreetThree;
churchStreetFour.east = redSquare;
churchStreetFour.west = kkd;
redSquare.west = churchStreetFour;
redSquare.east = hillUp;
kkd.east = churchStreetFour;

// room lookup table object
const rooms = {
  "radio bean": radioBean,
  "hill up": hillUp,
  "church street one": churchStreetOne, // s = church 2, E = needs
  threeneeds: threeNeeds, // E = pool room, W = church street one
  //"Three Needs" : threeNeeds,// - can we get three needs to print better?
  "threeneeds pool room": threeNeedsPoolRoom,
  //"Three Needs pool room": threeNeedsPoolRoom,
  "church street two": churchStreetTwo, // s = church st 3, N = church street one, E = food cart
  "food cart": foodCart, // W = church street 2,
  "church street three": churchStreetThree, // N = church street 2, E = finns, W = deli 126, S = church street 4
  finnegans: finnegans, // W = church street 3
  deli: deli126, // E = church street 3
  "deli 126": deli126, // E = church street 3
  "church street drunk": churchStreetDrunk, // S = conditional (if use.map then S = churchstreet 4), N= church street three
  "church street four": churchStreetFour, // E = red square, W = kkd, N = church street 3
  "red square": redSquare, // W = church street 4
  kkd: kkd, // E = church street 4
  "kountry kart deli": kkd, // same as above
  // 'jps': jps, // if we get it all working and want to add it later we can
  //  'pearl st. hill': hillUp, // for later


};

// ------------------------------------- PLAN ------------------------------------------------------
//  need another async (?) play function... that
//  1)takes a user input
//  2) sanitizes it into multiple parts..
// one part will need action = userInputAction
// second part will need to be direction/object = userInputObject
//  3) jump into conditional ifs based on userInput.. where we do what the user said or... console.log(i dont know what your talking about)
//  4) at end want to jump to very top of play function...  will take you to top of function.. return function(); recursive loop

async function play() {
  //  sanitize
  let input = await ask(
    `Current Room: ${player.currentRoom} \nWhat would you like to do....\n\n>_`
  );
  let inputSanitize = input.trim().toLowerCase();
  let inputArray = inputSanitize.split(" ");
  let inputAction = inputArray[0];
  let inputObject = inputArray[1]; // Can also be direction if action is go , walk, etc.

  //  if user types end --> end
  if (inputSanitize === "end") {
    process.exit();

    // if user types inventory show inventory

    // if user wants to move lets move
  } else if (userAction.move.includes(inputAction)) {
    // conditional directions
    // NORTH
    if (inputObject.toLowerCase() === "north") {
      if (rooms[player.currentRoom.toLowerCase()].north) {
        // this is to find the rooms northern room connection
        roomToNorth = rooms[player.currentRoom.toLowerCase()].north;
        player.currentRoom = roomToNorth.name;
        console.log(roomToNorth.description);
        // console.log(`changing currentRoom to ${roomToNorth.name}`);
      } else {
        console.log("you can't go that way");
      }
      // EAST
    } else if (inputObject.toLowerCase() === "east") {
     
      if (rooms[player.currentRoom.toLowerCase()].east) { 
        if (player.currentRoom === hillUp) {
        console.log (rooms[player.currentRoom].description);
        process.exit()
      } else if { 
        // this is to find rooms northern room connection
        roomToEast = rooms[player.currentRoom.toLowerCase()].east;
        player.currentRoom = roomToEast.name;
        console.log(roomToEast.description);
        // console.log(`changing currentRoom to ${roomToEast.name}`);
      } else {
        console.log("you can't go that way");
      }
      // South
    } else if (inputObject.toLowerCase() === "south") {
      if (rooms[player.currentRoom.toLowerCase()].south) {
        // this is to find rooms northern room connection
        roomToSouth = rooms[player.currentRoom.toLowerCase()].south;
        player.currentRoom = roomToSouth.name;
        console.log(roomToSouth.description);
        // console.log(`changing currentRoom to ${roomToSouth.name}`);
      } else {
        console.log("you can't go that way");
      }
      // West
    } else if (inputObject.toLowerCase() === "west") {
      if (rooms[player.currentRoom.toLowerCase()].west) {
        // this is to find rooms northern room connection
        roomToWest = rooms[player.currentRoom.toLowerCase()].west;
        player.currentRoom = roomToWest.name;
        console.log(roomToWest.description);
        // console.log(`changing currentRoom to ${roomToWest.name}`);
      } else {
        console.log("you can't go that way");
      }
    } // could add a "i dont understand here" otherwise will keep looping..
    //  Actions! USE
  } else if (userAction.use.includes(inputAction)) {
    //  conditionally set the puzzle.. if the room is church street drunk then you need to use the map to continue.. 
    if (player.currentRoom === "church street drunk" && inputObject === "map") {
      // if you do use the map that unlocks the next block and makes this block obsolete...
      console.log("The drunk people thank you for your map...");
      churchStreetDrunk.south = churchStreetFour;
      churchStreetThree.south = churchStreetFour;

      let currentPlayersInventory = player.inventory;
      const result = currentPlayersInventory.filter(
        (object) => object.name === inputObject
      );

      if (result.length > 0) {
        console.log(result[0].useDescription);
        resultIndex = currentPlayersInventory.indexOf(invObjects[inputObject]);
        // if index is greater than -1 .. i.e. there is an index for this item... take it out of room using splice
        if (resultIndex > -1) {
          currentPlayersInventory.splice(resultIndex, 1);
        }
        player.susPoints += result[0].susPoints;
      }
    } else if (
      // otherwise you cant move forward till you give them the map
      //PUZZLE/PASS CONDITIONAL 
      player.currentRoom === "church street drunk" &&
      inputObject !== "map"
    ) {
      console.log(
        "They won't let you pass.. Can you help them with directions?"
      );
      return churchStreetDrunk.south === null;
    } else {
      // if the action is in the use lookup table
      // look at object
      let currentPlayersInventory = player.inventory;
      // console.log(inputObject); // pizza
      let item = invObjects[inputObject]

      const result = currentPlayersInventory.filter(
        (object) => invObjects[object.name] === item
      );

      if (result.length > 0) {
        console.log(result[0].useDescription);
        resultIndex = currentPlayersInventory.indexOf(item);
        // if index is greater than -1 .. i.e. there is an index for this item... take it out of room using splice
        if (resultIndex > -1) {
          currentPlayersInventory.splice(resultIndex, 1);
        }
        player.susPoints += result[0].susPoints;
      } else if (result.length === 0) { // do we want to be able to use something without taking it?
        let currentRoomsInventory =
          rooms[player.currentRoom.toLowerCase()].inventory;
          // console.log(currentRoomsInventory); // array of items REMOVE
        for (let index = 0; index < currentRoomsInventory.length; index++)
        // { console.log (invObjects[currentRoomsInventory[index].name].name); // water,shot, food REMOVE
          // console.log(item.name); // food object REMOVE
          if (invObjects[currentRoomsInventory[index].name].name === item.name) {
            console.log("you're in the loop") // remove
            console.log(currentRoomsInventory[index].useDescription);
            player.susPoints += currentRoomsInventory[index].susPoints;
            //  break;
          }
          //  break;
        } else {
          console.log("i don't know");
        // console.log("Try adding this to your inventory before using it...")
      // } 
      }
      // ACTION: TAKE
      // adding to player.inventory
    }
  } else if (userAction.take.includes(inputAction)) {
    // if the action is in the use lookup table
    // look at object
    let currentRoomsInventory =
      rooms[player.currentRoom.toLowerCase()].inventory;
    // returns empty array if not in room, and array with length one if in room
    let item = invObjects[inputObject]
    const result = currentRoomsInventory.filter(
      (object) => invObjects[object.name] === item
    );

    //  if length is 1 then print description, add to player inventory and take out of room inventory
    if (result.length > 0) {
      console.log(
        "You took the " + inputObject + ".\n\n" + result[0].takeDescription
      );
      player.inventory.push(item);
      // index where object is in room inventory
      // if (inputObject === "sparkling water") {
      //   inputObject = "sparkling";
      // } else if (inputObject === "rise n shiner"){
      //   inputObject = "rise"
      // }
      resultIndex = currentRoomsInventory.indexOf(item);
      // if index is greater than -1 .. i.e. there is an index for this item... take it out of room using splice
      if (resultIndex > -1) {
        currentRoomsInventory.splice(resultIndex, 1);
      }
    } else {
      console.log("you cant take that");
    }
  } else if (userAction.drop.includes(inputAction)) {
    // look at object
    let currentPlayersInventory = player.inventory;
    let currentRoomsInventory =
      rooms[player.currentRoom.toLowerCase()].inventory;
    // returns empty array if not in room, and array with length one if in room
    const result = currentPlayersInventory.filter(
      (object) => object.name === inputObject
    );
    //  if length is 1 then print description, add to player inventory and take out of room inventory
    if (result.length > 0) {
      console.log("You dropped the " + inputObject);
      currentRoomsInventory.push(invObjects[inputObject]);
      // index where object is in room inventory
      resultIndex = currentPlayersInventory.indexOf(invObjects[inputObject]);
      // if index is greater than -1 .. i.e. there is an index for this item... take it out of room using splice
      if (resultIndex > -1) {
        currentPlayersInventory.splice(resultIndex, 1);
      }
    } else {
      console.log("you can't drop that");
    }
  } else if (userAction.examine.includes(inputAction)) {
    // print room description
    console.log(rooms[player.currentRoom.toLowerCase()].description);
    //  maybe also current inventory later?
    console.log(rooms[player.currentRoom.toLowerCase()].inventory);
  } else if (userAction.inventory.includes(inputAction)) {
    let currentPlayersInventory = player.inventory;
    // returns empty array if not in room, and array with length one if in room
    if (currentPlayersInventory.length === 0) {
      console.log("You don't have anything in your inventory....");
    } else {
      const result = currentPlayersInventory.map((object) => object.name);
      console.log(result);
    }
    //inventory, suspoints
    console.log("Your current sustenance points are " + player.susPoints);
  } else {
    console.log("you can't do that");
  }
  return play();
}

//need to trouble shoot when ordering something... doesn't prompt "you can't"

// extra = setting what actions can be taken on what objects.

/*

get three needs to print better?
*/
//  objects need take description and use description
//  need win condition