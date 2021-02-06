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

start();

async function start() {
  const welcomeMessage = `The year is 2050.  Covid-19 has just been eradicated and you are now aloud to go out! \n You meet your friends at your favorite spot for ONE drink.  As you finish, your friends ask if the night should continue... \n\nDo you want to continue your night out?`;
  let answer = await ask(welcomeMessage);

  if (answer === "no") {
    console.log("Enjoy your lame night in!");
    process.exit();
  } else {
    console.log(
      "You exit the Radio Bean and find yourself at the intersection of Pearl and N.Winooski.  To the east is the hill to UVM and to the north a familiar sight....."
    );
    let firstDirection = await ask("Where would you like to go?");
    console.log(firstDirection);
    player.currentRoom = "radio bean";
    return play();
  }
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
  //will need "if" drop item - add to inventory
}

//  inventory class
class InvObjectsClass {
  constructor(name, description, startingRoom, currentRoom, action) {
    this.name = name;
    this.description = description;
    this.startingRoom = startingRoom;
    this.currentRoom = currentRoom || startingRoom; // may need an inventory room for objects to be in...
    this.action = action || []; // action array
  }
  obUse(userInputAction) {
    if (this.action.includes(userInputAction)) {
      console.log(invObjects.description);
    }
  }
}

//  user actions look table object

let userAction = {
  move: ["go", "walk"],
  use: ["use", "play", "get", "drink", "eat", "order"], //tip?
  take: ["take", "grab"],
  // open: ["open", "unlock"],
  drop: ["drop"],
  examine: ["examine"],
};

//  objects... maybe cant include locations because of variable shadowing
//  need to define things in objects AFTER we define them... maybe dont need these pieces.. will need to decide
const water = new InvObjectsClass(
  "water",
  "Ah, a nice refreshing water. Always important to remember on a night out on the town.\nYou've gained 15 sustenance points.",
  undefined,
  undefined,
  []
);
const shot = new InvObjectsClass(
  "shot",
  "shots! shots! shots! What's a night out drinking without shots?\n Although they're good for the soul, they certainly won't help you make it through the night. 1 sustenance point. ",
  undefined,
  undefined,
  []
);

const map = new InvObjectsClass(
  "map",
  "Never know when a map of Burlington could come in handy...",
  undefined,
  undefined,
  []
);

const sparkWater = new InvObjectsClass(
  "sparking water",
  "Wow! So fancy! This really hits the spot...\nYou have gained 30 sustenance points.",
  undefined,
  undefined,
  []
);

const food = new InvObjectsClass(
  "food",
  "I was absolutely famished! Nothing like a late night street meat to REALLY keep me goin'\nLooks like you really needed that. You gained 30 sustenance points. ",
  undefined,
  undefined,
  []
);

const prize = new InvObjectsClass(
  "sandwich",
  "It's hot and good and will keep you alive....",
  undefined,
  undefined,
  []
);

// inventory look up table
let invObjects = {
  map: map,
  water: water,
  still: water,
  "sparkling water": sparkWater,
  shot: shot,
  food: food,
  sandwich: prize,
};

const radioBean = new RoomClass(
  "the radio bean",
  "The radio bean",
  [],
  null,
  null,
  null,
  null
);

const churchStreetOne = new RoomClass(
  "church street one",
  "Church street stretches out ahead of you to the north, to the east you see the three needs.  There doesn't seem to be a line.",
  [],
  null,
  null,
  null,
  null
);

const threeNeeds = new RoomClass(
  "threeNeeds",
  "The three needs blah blah blah",
  [water, shot],
  null,
  null,
  null,
  null
);

const threeNeedsPoolRoom = new RoomClass(
  "threeNeeds pool room",
  "The three needs pool room you see a bar, a pool table, and on one of tables a map.",
  [map, water, shot],
  null,
  null,
  null,
  null
);

const foodCart = new RoomClass(
  "food cart",
  "Hmmm... the smells of sweet snacks waft your way. The guy working the cart wants to know if you want to order anything.",
  [water, food],
  null,
  null,
  null,
  null
);

const finnegans = new RoomClass(
  "finnegans",
  "Its a little dark, its a little smelly, but the beer is good and the companies even better.  Not much to do here but head to the bar.....",
  [shot],
  null,
  null,
  null,
  null
);

const deli126 = new RoomClass(
  "deli",
  "This place seems a little fancier than most.  When you approach the bar the bar tender asks if you want some water... sparkling or still",
  [shot, water, sparkWater],
  null,
  null,
  null,
  null
);

const redSquare = new RoomClass( // maybe include a die scenario here?
  "red square",
  "The bass is bumping and the night is getting late... is anyone in here even 21?? The bar lies ahead... ",
  [shot],
  null,
  null,
  null,
  null
);

const kkd = new RoomClass(
  "kountry kart deli",
  "As the night comes to end, the drunks stagger in... you're blinded by the sharp fluorescents of KKD. But its all well, well worth it for two reasons. The glory of your well-earned, greasy Rise N' Shiner. And more importantly, the presence of the all-powerful Bob",
  [prize, water],
  null,
  null,
  null,
  null
);

const churchStreetTwo = new RoomClass(
  "church street two",
  "Church street stretches out ahead of you to the north and south, and to the east you see a food cart.  There are people everywhere.",
  [],
  null,
  null,
  null,
  null
);

const churchStreetThree = new RoomClass(
  "church street three",
  "Church street stretches out ahead of you to the north and south.  To the east Finnegans and West is deli 126.",
  [],
  null,
  null,
  null,
  null
);

const churchStreetFour = new RoomClass(
  "church street four",
  "Church street stretches out ahead of you to the north and south.  To the east red square and West is kkd.",
  [],
  null,
  null,
  null,
  null
);

//  manually modifying/adding room connections
radioBean.north = churchStreetOne;
churchStreetOne.north = churchStreetTwo;
churchStreetOne.east = threeNeeds;
//threeNeeds.south = churchStreetOne;
threeNeeds.east = threeNeedsPoolRoom;
threeNeeds.west = churchStreetOne;
threeNeedsPoolRoom.west = threeNeeds;
churchStreetTwo.north = churchStreetThree;
churchStreetTwo.south = churchStreetOne;
churchStreetTwo.east = foodCart;
foodCart.west = churchStreetTwo;
//  should we be able to go north from here?
churchStreetThree.south = churchStreetTwo;
churchStreetThree.east = finnegans;
churchStreetThree.west = deli126;
churchStreetThree.north = churchStreetFour;
finnegans.west = churchStreetThree;
deli126.east = churchStreetThree;
churchStreetFour.south = churchStreetThree;
churchStreetFour.east = redSquare;
churchStreetFour.west = kkd;
redSquare.west = churchStreetFour;
kkd.east = churchStreetFour;

// room lookup table object
const rooms = {
  "radio bean": radioBean,
  "church street one": churchStreetOne, // N = church 2, E = needs
  threeneeds: threeNeeds, // E = pool room, W = church street one
  "threeneeds pool room": threeNeedsPoolRoom,
  "church street two": churchStreetTwo, // N = church st 3, S = church street one, E = food cart
  "food cart": foodCart, // W = church street 2,
  "church street three": churchStreetThree, // S = church street 2, E = finns, W = deli 126, N = church street 4
  finnegans: finnegans, // W = church street 3
  deli: deli126, // E = church street 3
  "deli 126": deli126, // E = church street 3
  "church street four": churchStreetFour, // E = red square, W = kkd, S = church street 3
  "red square": redSquare, // W = church street 4
  kkd: kkd, // E = church street 4
  "kountry kart deli": kkd, // same as above
  // 'jps': jps, // if we get it all working and want to add it later we can
  //  'pearl st. hill': hillUp, // for later
  //  need to think about drunk people room...
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
        // this is to find rooms northern room connection
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
    // if the action is in the use lookup table
    // look at object
    let currentRoomsInventory =
      rooms[player.currentRoom.toLowerCase()].inventory;
    for (let index = 0; index < currentRoomsInventory.length; index++) {
      if (currentRoomsInventory[index].name === inputObject) {
        console.log(currentRoomsInventory[index].description);
        break;
      } else {
        console.log("i don't know");
      }
    }
    // ACTION: TAKE
    // adding to player.inventory
  } else if (userAction.take.includes(inputAction)) {
    // if the action is in the use lookup table
    // look at object
    let currentRoomsInventory =
      rooms[player.currentRoom.toLowerCase()].inventory;
    // returns empty array if not in room, and array with length one if in room
    const result = currentRoomsInventory.filter(object => object.name === inputObject);
    //  if length is 1 then print description, add to player inventory and take out of room inventory
    if(result.length > 0){
      console.log(result[0].description);
      player.inventory.push(invObjects[inputObject]);
      // index where object is in room inventory
      resultIndex = currentRoomsInventory.indexOf(invObjects[inputObject]);
      // if index is greater than -1 .. i.e. there is an index for this item... take it out of room using splice
      if(resultIndex > -1){
        currentRoomsInventory.splice(resultIndex, 1);
      };
      
    } else {console.log("you cant take that" )};
  } else {
    console.log("you can't do that");
  }
  return play();
}

// need to remove item from inventory once used..
// need to add sus points together.

/*

//  structure hypothetical

//  print inventory if user enters i
let userInput = await ask(What do you want to do...);

if (userInput === 'i'){
  console.log(player.inventory);
}

*/
