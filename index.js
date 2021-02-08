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
const welcomeMessage = `Welcome to Olive n' Tabi's Totally Bogus Text Adventure Game.\nTo navigate through the the fabulous city of Burlington, VT - you'll want to tell us where to go with commands such as: 'go' or 'move' and in whatever direction you choose. \nBurlington is full of exciting things to play with... as well as fun food and beverages to consume. To interact with these, you'll find most common commands, such as 'eat', 'drink', or 'take' will work.\n. Just remember... with any boozy night out - it is REALLY important to stay hydrated and eat snacks along the way....\n
\n\nThe year is 2050.  Covid-19 has just been eradicated and you are now aloud to go out! \n\nYou meet your friends at your favorite spot for ONE drink.  As you finish, your friends ask if the night should continue... `; 
console.log(welcomeMessage);
start();

async function start() {
  let answer = await ask("\n\nDo you want to continue your night out?");
  //ask if want to start game
  if (answer === "no" || answer === "n") {
    console.log("Enjoy your lame night in!");
    process.exit();
  } else if (answer === "yes" || answer === "y") {
    console.log(
      "\nYou exit the Radio Bean and find yourself at the intersection of Pearl and N.Winooski.  To the east is the hill to UVM and to the south a familiar sight....."
    );
    player.currentRoom = "radio bean"; //brings us to current/starting room
    return play(); //start game play
  } else {
    console.log("\nSorry, I didn't catch that!");
    return start(); 
  }
}

//--------------------------------- TABI + OLIVES CODE ------------------------------------------------

//  start of player object...
let player = {
  name: [], // not using at this time
  inventory: [], // what they have to use
  currentRoom: [], // where the player currently is
  susPoints: 0 // points for win condition based on food and drink
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
  constructor(name, takeDescription, useDescription, action, susPoints) {
    // i removed starting room, ending room and added a take description and a use description
    this.name = name;
    this.takeDescription = takeDescription;
    this.useDescription = useDescription;
    // this.startingRoom = startingRoom;
    // this.currentRoom = currentRoom || startingRoom; // may need an inventory room for objects to be in...
    this.action = action || []; // action array
    this.susPoints = susPoints;
  }
}

//  user actions look table object
let userAction = {
  move: ["go", "walk"],
  use: ["use", "play", "get", "drink", "eat", "give"], //tip? ///also, switching order for now
  take: ["take", "grab", "order"], //added order here for food cart...but it might cause issue of "can't do that later... "
  drop: ["drop"],
  examine: ["examine"],
  inventory: ["inventory", "i"],
};

//  objects... maybe cant include locations because of variable shadowing
//  need to define things in objects AFTER we define them... maybe dont need these pieces.. will need to decide
const water = new InvObjectsClass(
  "water",
  "\nAhhh water. That will be refreshing later",
  "\nAh, a nice refreshing water. Always important to remember on a night out on the town.\nYou've gained 10 sustenance points.",
  [],
  10
);

const shot = new InvObjectsClass(
  "shot",
  "\nshots! shots! shots! What's a night out drinking without shots?",
  "\nDown the hatch.\nAlthough they're good for the soul, they certainly won't help you make it through the night. 1 sustenance point. ",
  [],
  1
);

const map = new InvObjectsClass(
  "map",
  "\nI guess you never know when a map of Burlington could come in handy...?",
  "\nA map is a great way to find your way way around!",
  [],
  0
);

const sparkWater = new InvObjectsClass(
  "sparkling water",
  "\nThe fanciest of the waters, you'll be so glad you have this later.....",
  "\nWow! So fancy! This really hits the spot...\nYou have gained 15 sustenance points.",
  [],
  15
);

const food = new InvObjectsClass(
  "food",
  "\nMMMMMHHHHHHHH, that smells good.....",
  "\nI was absolutely famished! Nothing like a late night street treat to REALLY keep me goin'\nLooks like you really needed that. You gained 20 sustenance points. ",
  [],
  20
);

const prize = new InvObjectsClass(
  "rise n shiner",
  "\nIt's hot and good and will keep you alive....",
  "\nWith the perfect combo of meat, egg, cheese, and a hashbrown our night is complete.  You gained 50 sustenance points. ",
  [],
  50
);

const phone = new InvObjectsClass (
  "phone",
  "Yo dude! You can't take that!\n I know it looks like your phone (it doesn't), but it's not yours...",
  "Trust me... even with a different number, your ex will still realize who this is.\n Better off just not using a phone right now.",
  [],
  0
);

// inventory look up table
let invObjects = {
  "map": map,
  "water": water,
  "still": water,
  "sparkling": sparkWater,
  "sparkling water": sparkWater,
  "shot": shot,
  "booze": shot,
  "drink": shot,
  "food": food,
  "pizza": food,
  "phone" : phone,
  "za": food,
  "sandwich": prize,
  "rise": prize,
  "shiner": prize,
  "rise n shiner": prize,
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
  "\nChurch street stretches out ahead of you to the south, to the east you see the three needs.  There doesn't seem to be a line.",
  [],
  null,
  null,
  null,
  null
);

const threeNeeds = new RoomClass(
  "threeNeeds",
  "\nOh boy... did you miss this place. You enter the Three Needs. You go up the stairs, show your ID, and your permitted into the main room.\n You could order a drink at the bar, eat a slizzing slice of 'za, or continue on east to the pool room.",
  [water, shot, food],
  null,
  null,
  null,
  null
);
//map is here for puzzle!!
const threeNeedsPoolRoom = new RoomClass(
  "threeNeeds pool room",
  "\nThe pool room. Sometimes the only chance you have of getting a quick drink on a busy night.\n Here you can get a drink, but over by the additional pool tables you notice something interesting... is it, a map of Burlington?",
  [map, shot],
  null,
  null,
  null,
  null
);

const foodCart = new RoomClass(
  "Food Cart",
  "\nHmmm... the smells of sweet snacks waft your way. The guy working the cart wants to know if you want to order anything.",
  [water, food],
  null,
  null,
  null,
  null
);

const finnegans = new RoomClass(
  "Finnegans",
  "\nIts a little dark, its a little smelly, but the beer is good and the companies even better.\n Looks like there's nothing to do, but get a dri--Wait... Is that your phone? You don't remember dropping it.",
  [shot, phone],
  null,
  null,
  null,
  null
);

const deli126 = new RoomClass(
  "Deli 126",
  "\nThis place seems a little fancier than most.  When you approach the bar the bar tender asks if you want some water... sparkling or still",
  [shot, water, sparkWater],
  null,
  null,
  null,
  null
);

const redSquare = new RoomClass(
  "Red Square",
  "\nThe bass is bumping and the night is getting late... is anyone in here even 21?? The bar lies ahead... ",
  [shot],
  null,
  null,
  null,
  null
);

//win conditional will be here
const kkd = new RoomClass(
  "Kountry Kart Deli",
  "\nAs the night comes to end, the drunks stagger in... you're blinded by the sharp fluorescents of KKD. But its all well, well worth it for two reasons. The glory of your well-earned, greasy Rise N' Shiner. And more importantly, the presence of the all-powerful Bob",
  [prize, water],
  null,
  null,
  null,
  null
);

const churchStreetTwo = new RoomClass(
  "Church Street Two",
  "\nChurch street stretches out ahead of you to the north and south, and to the east you see a food cart.  There are people everywhere.",
  [],
  null,
  null,
  null,
  null
);

const churchStreetThree = new RoomClass(
  "Church Street Three",
  "\nChurch street stretches out ahead of you to the north and south.  To the east Finnegans and west is Deli 126.",
  [],
  null,
  null,
  null,
  null
);

const churchStreetFour = new RoomClass(
  "Church Street Four",
  "\nChurch street stretches out ahead of you to the north and south.  To the east Red Square and west is kkd.",
  [],
  null,
  null,
  null,
  null
);

const churchStreetDrunk = new RoomClass(
  "church street drunk",
  "\nA mob of drunk tourists swarm you... they're mumbling something about being lost... you can't get by...\nThey won't let you through until you help them! They need directions!! ",
  [],
  null,
  null,
  null,
  null
);

const hillUp = new RoomClass(
  "hill up",
  "\nOof. You are in no capacity to walk up the hill to UVM... you try, you quickly fail... your night is over.\n Better luck next time!",
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
//  1)takes a user input
//  2) sanitizes it into multiple parts..
// one part will need action = userInputAction
// second part will need to be direction/object = userInputObject
//  3) jump into conditional ifs based on userInput.. where we do what the user said or... console.log(i dont know what your talking about)
//  4) at end want to jump to very top of play function...  will take you to top of function.. return function(); recursive loop

async function play() {
  while (player.susPoints < 100) {
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
        } else {
          console.log("you can't go that way");
        }
        // EAST
      } else if (inputObject.toLowerCase() === "east") {
        if (rooms[player.currentRoom.toLowerCase()].east) {
          // this is to find rooms northern room connection
          roomToEast = rooms[player.currentRoom.toLowerCase()].east;
          if (roomToEast.name === "hill up") {
            console.log(roomToEast.description);
            process.exit();
          } else {
            player.currentRoom = roomToEast.name;
            console.log(roomToEast.description);
          }
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
        } else {
          console.log("you can't go that way");
        }
      } 
      //  Actions! USE
    } else if (userAction.use.includes(inputAction)) {
      //PUZZLE/PASS CONDITIONAL
      //  conditionally set the puzzle.. if the room is church street drunk then you need to use the map to continue..
      if (
        player.currentRoom === "church street drunk" &&
        inputObject === "map"
      ) {
        // if you do use the map that unlocks the next block and makes this block obsolete...
        console.log("\nThe drunk people thank you for your map...");
        churchStreetDrunk.south = churchStreetFour;
        churchStreetThree.south = churchStreetFour;

        let currentPlayersInventory = player.inventory;
        const result = currentPlayersInventory.filter(
          (object) => object.name === inputObject
        );

        if (result.length > 0) {
          console.log(result[0].useDescription);
          resultIndex = currentPlayersInventory.indexOf(
            invObjects[inputObject]
          );
          // if index is greater than -1 .. i.e. there is an index for this item... take it out of room using splice
          if (resultIndex > -1) {
            currentPlayersInventory.splice(resultIndex, 1);
          }
          player.susPoints += result[0].susPoints;
        }
      } else if (
        // otherwise you cant move forward till you give them the map
        player.currentRoom === "church street drunk" &&
        inputObject !== "map"
      ) {
        console.log(
          "\nThey won't let you pass.. Can you help them with directions?"
        );
        return churchStreetDrunk.south === null;
      } else {
        // if the action is in the use lookup table
        // look at object
        let currentPlayersInventory = player.inventory;
        let item = invObjects[inputObject];
      if (item.name === "phone") {
        console.log(item.useDescription)
    } 

      else if (item) { // while the item is true... i.e. exists in our game...
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
        } else if (result.length === 0) {
          // do we want to be able to use something without taking it?
          let currentRoomsInventory =
            rooms[player.currentRoom.toLowerCase()].inventory;
          for (let index = 0; index < currentRoomsInventory.length; index++)
            if (
              invObjects[currentRoomsInventory[index].name].name === item.name
            ) {
              console.log(currentRoomsInventory[index].useDescription);
              player.susPoints += currentRoomsInventory[index].susPoints;
            }
        } 
      } else {
          console.log("\nI don't know what a " + inputObject + " is.");
        }
        return play();
      }
        // ACTION: TAKE
        // adding to player.inventory
    } else if (userAction.take.includes(inputAction)) {
      // if the action is in the use lookup table
      // look at object
      let currentRoomsInventory =
        rooms[player.currentRoom.toLowerCase()].inventory;
      // returns empty array if not in room, and array with length one if in room
      let item = invObjects[inputObject];

      if (item){
      const result = currentRoomsInventory.filter(
        (object) => invObjects[object.name] === item
      );

      //  if length is 1 then print description, add to player inventory and take out of room inventory
      if (result.length > 0) {
        if (item.name === "phone") {
          console.log(item.takeDescription)
        return play();
      }
        console.log(
          "You took the " + inputObject + ".\n\n" + result[0].takeDescription
        );
        player.inventory.push(item);
        // index where object is in room inventory
        resultIndex = currentRoomsInventory.indexOf(item);
        // if index is greater than -1 .. i.e. there is an index for this item... take it out of room using splice
        if (resultIndex > -1) {
          currentRoomsInventory.splice(resultIndex, 1);
        }
      } else {
        console.log("you cant take that");
      } return play ();
    } else {
      console.log("\nI don't know what a " + inputObject + " is.")
    }
    return play();
    // DROP
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
      // EXAMINE
    } else if (userAction.examine.includes(inputAction)) {
      // print room description
      console.log(rooms[player.currentRoom.toLowerCase()].description);
      //  maybe also current inventory
      console.log(rooms[player.currentRoom.toLowerCase()].inventory);
      // INVENTORY
    } else if (userAction.inventory.includes(inputAction)) {
      let currentPlayersInventory = player.inventory;
      // returns empty array if not in room, and array with length one if in room
      if (currentPlayersInventory.length === 0) {
        console.log("You don't have anything in your inventory....");
      } else {
        const result = currentPlayersInventory.map((object) => object.name);
        console.log(result);
      }
      console.log("Your current sustenance points are " + player.susPoints);
    } else {
       console.log("\nI don't know how to " + inputAction)
    }
    return play();
  }
  // Win condition based on sus points
  console.log(
    "\nCongratulations on the fun night out!! With Bob by your side and a shiner in hand, you have successfully not blacked out!"
  );

  //  play again?
  let playAgain = await ask("\nwould you like to play again?");

  while (playAgain) {
    if (playAgain.trim() === "yes" || playAgain.trim() === "yes") {
      player.susPoints = 0;
      console.log(welcomeMessage);
      return start();
    } else if (playAgain.trim() === "no" || playAgain.trim() === "n") {
      console.log("\nThanks for playing;");
      process.exit();
    } else {
      console.log("\nSorry, I didn't quite get that...");
      playAgain = await ask("\nWould you like to play again?");
    }
  }
}


