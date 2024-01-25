const characteristics = require("../randomizer_files/fantasy_character_traits/characteristics.json");
const personalityTraits = require("../randomizer_files/fantasy_character_traits/personalityTraits.json");

function createCharacter() {
  return {
    "world": createWorld(),
    "town": createHometown(),
    "family": createFamily(),
    "backstory": createBackstory(),
    "character": createCharacterInfo(),
    "pronouns": setPronouns()
  };
} 

function createWorld() {
  var world = characteristics.world;
  return {
    "conflict": choose(world.conflict),
    "geography": {
      "borders": choose(world.geography.borders),
      "climate": choose(world.geography.climate)
    },
    "government": {
      "descriptor": choose(world.government.descriptor),
      "type": choose(world.government.type)
    },
    "technology": {
      "energySource": choose(world.technology.energySource),
      "level": choose(world.technology.level)
    }
  }
}

function createHometown() {
  var town = characteristics.hometown;
  return {
    "size": choose(town.size),
    "specialty": choose(town.specialty)
  }
}

function createFamily() {
  var family = characteristics.family;
  var wealthCoefficient = Math.floor(Math.random() * 100);
  return {
    "birthOrder": choose(family.birthOrder[Math.floor((Math.random() * 5) + 1)]),
    "prosperity": setProsperity(wealthCoefficient),
    "parentalOccupation": setParentalOccupation(wealthCoefficient),
    "history": chooseWithDisadvantage(family.history, 2)
  }
}

function setProsperity(wealth) {
  var prosperityLevels = characteristics.family.prosperity;
  if (wealth > 94) {
    return prosperityLevels[prosperityLevels.length - 1];
  } if (wealth > 75) {
    return prosperityLevels[prosperityLevels.length - 2];
  } if (wealth > 50) {
    return prosperityLevels[prosperityLevels.length - 3];
  } if (wealth > 30) {
    return prosperityLevels[prosperityLevels.length - 4];
  } if (wealth > 10) {
    return prosperityLevels[prosperityLevels.length - 5];
  }
  return prosperityLevels[prosperityLevels.length - 6];
}

function setParentalOccupation(wealth) {
  var occupationLength = characteristics.family.parentalOccupations.length;
  var baseGen = randomWithDisadvantage(occupationLength - 3);
  // a wealth of 100 is locked to the top 66% of jobs, etc
  var silverSpoonBonus = 0;
  if (wealth > 75) {
    silverSpoonBonus = Math.floor((wealth * 0.66 / (100 / occupationLength)));
  }
  var newGen = baseGen + silverSpoonBonus; 
  if (newGen >= occupationLength) {
    return "wealthy investor";
  }
  return characteristics.family.parentalOccupations[newGen];
}

function randomWithDisadvantage(max, nDice = 2) {
  var generations = [];
  for (let i = 0; i < nDice; i++) {
    generations.push(Math.floor(Math.random() * max));
  }
  return Math.floor(Math.min(...generations));
}

function chooseWithDisadvantage(options, nDice = 2) {
  return options[randomWithDisadvantage(options.length, nDice)];
}

function createBackstory() {
  var backstory = characteristics.backstory;
  return {
    "origin": {
      "birth": choose(backstory.origin.birth),
      "joinedFamily": chooseWithDisadvantage(backstory.origin.joinedFamily, 3)
    },
    "childhood": setChildhood(),
    "adventures": choose(backstory.adventures),
    "item": choose(backstory.item)
  };
}

function setChildhood() {
  if (Math.random() > 0.75) {
    return choose(characteristics.backstory.childhood.special);
  }
  return choose(characteristics.backstory.childhood.standard);
}

function createCharacterInfo() {
  var character = characteristics.character;
  return {
    "hobby": choose(character.hobby),
    "personality": createPersonality(),
    "looks": createLooks(),
    "favColor": choose(character.favColor), 
    "fatalFlaw": choose(character.fatalFlaw),
    "motivation": choose(character.motivation)
  };
}

function createPersonality() {
  return choose(personalityTraits.traits).toLowerCase() + 
  " and " + 
  choose(personalityTraits.traits).toLowerCase();
}

function createLooks() {
  var looks = characteristics.character.looks;
  // indicates the overall 'variance' in color available to the character:
  // high numbers of dice will tend to skew towards darker pigment
  var nDice = Math.floor(Math.random() * 3) + 1
  return {
    "regionTypical": chooseWithDisadvantage(looks.regionTypical),
    "hairColor": chooseWithDisadvantage(looks.hairColor, nDice),
    "hairType": choose(looks.hairType),
    "eyeColor": chooseWithDisadvantage(looks.eyeColor, nDice),
    "skinTone": choose(looks.skinTone),      
    "build": chooseWithDisadvantage(looks.build),
    "height": chooseWithDisadvantage(looks.height) 
    };
}

function setPronouns() {
  var pronouns = characteristics.pronouns;
  // the subtraction makes binary pronouns more common
  var roll = Math.floor(Math.abs((Math.random() * pronouns.they.length) - 0.5));
  return {
    "they": pronouns.they[roll],
    "them": pronouns.them[roll],
    "their": pronouns.their[roll],
    "were": pronouns.were[roll]
  };
}

function choose(options) {
  return options[Math.floor(Math.random() * options.length)];
}

module.exports = { createCharacter };