var _ = require('lodash');

function displayWorld(character) {
  return (
      displayRegion(character) +
      displayHometown(character)
    );
}

function displayRegion(character) {
  var world = character.world;
  return [
    "**Setting**\n> This story takes place in a " + world.geography.borders +
    " region characterized by its " + world.geography.climate +
    " climate. It is a " + world.conflict + 
      " land overseen by a " + world.government.descriptor + 
      " " + world.government.type + ". People here use technology powered mainly by " + world.technology.energySource + 
    "; compared to their neighbors, they have a " + world.technology.level + " level of advancement.\n> \n"
  ];
}

function displayHometown(character) {
  var town = character.town;
  return [
    "> Our central character grew up in " + town.size +
    ". " + _.capitalize(character.pronouns.their) + 
    " part of the region is known for its " + town.specialty + ".\n\n"
  ]
}

function displayCharacter(character) {
  var looks = character.character.looks;
  return [
    "**Character**\n> Our central character might be described as " + character.character.personality +
    ". " + _.capitalize(character.pronouns.they) + " spent much of " + character.pronouns.their +
    " free time " + character.character.hobby + " prior to the story beginning. " +
    _.capitalize(character.pronouns.their) + " favorite color is " + character.character.favColor.name + ".\n> \n> " +
    _.capitalize(character.pronouns.they) + " " + character.pronouns.were + " born with " + looks.hairType +
     " " + looks.hairColor + " hair, " + looks.eyeColor + " eyes, and " + 
    looks.skinTone + " features; additionally, " + character.pronouns.they + " " + character.pronouns.were 
    + " predisposed to a " + looks.build + ", " + looks.height + " build. " + 
    _.capitalize(character.pronouns.their) + " neighbors would consider " + character.pronouns.their + 
    " appearance "+ looks.regionTypical + "."
  ]
}

function displayBackstory(character) {
  var pronouns = character.pronouns;
  return [
    "**Backstory**\n> The character was born " + character.backstory.origin.birth +
    ", and joined " + pronouns.their + " family " + character.backstory.origin.joinedFamily +
     ". " + _.capitalize(pronouns.they) +
    " " + pronouns.were + " " + pronouns.their + " parents' " + character.family.birthOrder + ". " +
    _.capitalize(pronouns.their) + " family was " + character.family.prosperity + ", with the more influential of " + pronouns.their + " parents working as " +
    character.family.parentalOccupation + ". The character grew up hearing stories of how " +
    pronouns.their + " family was " + character.family.history + ".\n> \n> In " + pronouns.their + " childhood, the character " +
    character.backstory.childhood + ". Later in life, after some growth, " + pronouns.they + 
    " " + character.backstory.adventures + ". " + _.capitalize(pronouns.their) + " most treasured belonging is " + 
    character.backstory.item + ".\n\n"
  ];
}

module.exports = { displayCharacter, displayBackstory, displayWorld };