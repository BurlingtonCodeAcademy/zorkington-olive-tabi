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
    player.currentRoom = "Radio Bean";
    return play();
  }
}

//--------------------------------- TABI + OLIVES CODE ------------------------------------------------

//  start of player object...
let player = {
  name: [],
  inventory: [],
  currentRoom: [],
  susPoints: [],

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
}


//  user actions look table object

let userAction = {
  move: ["go", "walk"],
  use: ["use", "play", "get", "drink", "eat"], //tip?
  take: ["take", "grab", "order"],
  open: ["open", "unlock"],
  drop: ["drop"],
};



//  objects... maybe cant include locations because of variable shadowing
//  need to define things in objects AFTER we define them... maybe dont need these pieces.. will need to decide
const water = new InvObjectsClass(
    "water",
    "water description...",
    undefined,
    undefined,
    []
  );
  const shot = new InvObjectsClass(
    "shot",
    "shot description...",
    undefined,
    undefined,
    []
  );

  const map = new InvObjectsClass(
    "map",
    "map description...",
    undefined,
    undefined,
    []
  );

// inventory look up table
let invObjects = {
   'map': map,
    'water': water,
    //   'sparkling water': sparkWater,
    'shot': shot,
    //   'food': food,
    //   'sandwich': prize
  };


const threeNeedsPoolRoom = new RoomClass(
  "threeNeeds pool room",
  "The three needs pool room you see a bar, a pool table, and on one of tables a map.",
  [map, water, shot],
  null,
  null,
  null,
  null
);
const threeNeeds = new RoomClass(
  "threeNeeds",
  "The three needs blah blah blah",
  [],
  threeNeedsPoolRoom,
  null,
  null,
  null
);
const radioBean = new RoomClass(
  "the radio bean",
  "The radio bean",
  [invObjects.water, invObjects.shot],
  threeNeeds,
  null,
  null,
  null
);



// room lookup table object
const rooms = {
  "radio bean": radioBean,
  "threeneeds": threeNeeds,
  "threeneeds pool room": threeNeedsPoolRoom,
  //   'food cart': foodCart,
  //   'finnegans': finnegans,
  //   'deli': deli126,
  //   'deli 126': deli126,
  //   'red square': redSquare,
  //   'kkd': kkd,
  //   'kountry kart deli': kkd,
  //   'jps': jps
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
        console.log(`changing currentRoom to ${roomToNorth.name}`);
      } else  {console.log("you can't go that way");};
      // EAST
    } else if (inputObject.toLowerCase() === "east") {
      if (rooms[player.currentRoom.toLowerCase()].east) {
        // this is to find rooms northern room connection
        roomToEast = rooms[player.currentRoom.toLowerCase()].east;
        player.currentRoom = roomToEast.name;
        console.log(roomToEast.description);
        console.log(`changing currentRoom to ${roomToEast.name}`);
      } else  {console.log("you can't go that way");};
      // South
    } else if (inputObject.toLowerCase() === "south") {
      if (rooms[player.currentRoom.toLowerCase()].south) {
        // this is to find rooms northern room connection
        roomToSouth = rooms[player.currentRoom.toLowerCase()].south;
        player.currentRoom = roomToSouth.name;
        console.log(roomToSouth.description);
        console.log(`changing currentRoom to ${roomToSouth.name}`);
      } else  {console.log("you can't go that way");};
      // West
    } else if (inputObject.toLowerCase() === "west"){
      if (rooms[player.currentRoom.toLowerCase()].west) {
        // this is to find rooms northern room connection
        roomToWest = rooms[player.currentRoom.toLowerCase()].west;
        player.currentRoom = roomToWest.name;
        console.log(roomToWest.description);
        console.log(`changing currentRoom to ${roomToWest.name}`);
      } else  {console.log("you can't go that way");};
    } // could add a "i dont understand here" otherwise will keep looping..
  } else {console.log("you can't do that");}  
  return play();
}



/*




//  structure hypothetical

//  print inventory if user enters i
let userInput = await ask(What do you want to do...);

if (userInput === 'i'){
  console.log(player.inventory);
}

*/

