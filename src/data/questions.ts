import type { Question } from "../types";

const pointsByAnswerCount: Record<number, number[]> = {
  4: [40, 30, 20, 10],
  5: [35, 25, 18, 13, 9],
  6: [30, 23, 17, 13, 10, 7],
  7: [28, 22, 16, 12, 9, 7, 6],
  8: [26, 20, 16, 12, 9, 7, 6, 4],
};

function makeQuestion(id: string, prompt: string, answers: string[]): Question {
  const points = pointsByAnswerCount[answers.length];
  if (!points) throw new Error(`Unsupported answer count for ${id}`);
  return {
    id,
    prompt,
    answers: answers.map((text, index) => ({ text, points: points[index]! })),
  };
}

export const QUESTIONS: Question[] = [
  makeQuestion("things-that-run", "Other than feet, name something that runs", [
    "Water", "Engine or car", "Refrigerator", "Nose", "Program or application", "Clock",
  ]),
  makeQuestion("things-with-teeth", "Name something with teeth", [
    "Animals", "People", "Comb", "Zipper", "Saw",
  ]),
  makeQuestion("keep-in-car", "Name something you keep in your car", [
    "Money or coins", "Food or water", "First aid kit", "Spare tire",
    "Map", "Jumper cables", "Gas can",
  ]),
  makeQuestion("basement-noise", "You hear a noise in the basement. What do you hope it isn't?", [
    "An intruder", "Ghost or monster", "Animals or rats", "A flood",
  ]),
  makeQuestion("gets-delivered", "Name something that gets delivered", [
    "Mail", "Newspapers", "Pizza", "Flowers", "Packages", "Furniture", "Babies",
  ]),
  makeQuestion("reason-to-party", "Name a reason to celebrate with a party", [
    "Graduation", "Wedding", "Holiday", "Birthday", "Bachelor or bachelorette party",
  ]),
  makeQuestion("animal-letter-e", "Name an animal that starts with the letter E", [
    "Elephant", "Eagle", "Eel", "Emu",
  ]),
  makeQuestion("lose-keys", "Name a place where people tend to lose their keys", [
    "Home", "Shopping mall", "Purse", "Car", "Bar", "Beach",
  ]),
  makeQuestion("clean-for-company", "Name something you clean before company comes over", [
    "Bathroom", "Kitchen", "Carpet or floor", "Living room", "Yourself",
  ]),
  makeQuestion("party-activity", "Name your favorite thing to do at parties", [
    "Dance", "Socialize or talk", "Drink", "Eat", "Sing karaoke",
  ]),
  makeQuestion("teenager-destination", "Name a place a teenager complains about having to go", [
    "School or college", "Church", "Family function", "Dentist or doctor",
    "Grocery store", "Work",
  ]),
  makeQuestion("regular-changes", "Name something people change regularly", [
    "Clothes", "TV channel or show", "Their minds", "Hair",
  ]),
  makeQuestion("long-neck", "Name something with a long neck", [
    "Giraffe", "Ostrich", "Bottle", "Crane", "Swan", "Glass",
  ]),
  makeQuestion("rich-us-city", "Name a U.S. city where lots of rich people live", [
    "Los Angeles", "New York", "Miami", "Las Vegas",
    "Palm Beach", "Philadelphia", "San Francisco",
  ]),
  makeQuestion("place-to-cry", "Name a good place to go when you want to cry", [
    "Bed or bedroom", "Shower or bathroom", "Movie theater", "My car", "A closet",
  ]),
  makeQuestion("vampires", "Name something associated with vampires", [
    "Fangs", "Cape", "Garlic", "Blood", "Cross", "Stake",
  ]),
  makeQuestion("dog-words", "Name a word a dog understands", [
    "Sit", "Outside", "Walk", "Food", "Their name", "Stay", "Fetch", "Treat",
  ]),
  makeQuestion("broke-destination", "Name a place you stop going when you're broke", [
    "Restaurants", "Store or mall", "Bar or club", "Casino",
    "Movies", "Bank", "Concerts", "Sporting event",
  ]),
  makeQuestion("wake-at-two", "Name a reason someone might wake up at 2:00 in the morning", [
    "Use the bathroom", "Thirsty", "Hungry", "Nightmare", "Restless",
  ]),
  makeQuestion("scared-to-ride", "Name something some people are scared to ride", [
    "Airplane", "Motorcycle", "Roller coaster", "Boat", "Horse", "Elevator",
  ]),
  makeQuestion("six-or-twelve-pack", "Name something that comes in a 6-pack or 12-pack", [
    "Soda", "Beer", "Eggs", "Hot dogs", "Donuts", "Abs",
  ]),
  makeQuestion("off-the", "Finish the phrase: Off the...", [
    "Wall", "Hook", "Record", "Charts", "Deep end",
  ]),
  makeQuestion("bad-habit", "Name a bad habit people try to quit", [
    "Smoking", "Biting nails", "Overeating", "Swearing", "Drinking", "Procrastinating",
  ]),
  makeQuestion("place-dont-want", "Name a place full of people who don't want to be there", [
    "Jail or prison", "Hell", "Work", "Church", "Cemetery",
  ]),
  makeQuestion("dont-hold-driving", "Name something you shouldn't hold while driving", [
    "Phone", "Food or drink", "Alcohol", "Baby", "Cigarette",
  ]),
  makeQuestion("brewing", "Name something that might be brewing", [
    "Coffee", "Beer", "Tea", "Trouble", "Storm", "Plot",
  ]),
  makeQuestion("night-phone", "Why might someone check their phone in the middle of the night?", [
    "Text message", "Social media", "Alarm", "Can't sleep", "Getting a call",
  ]),
  makeQuestion("stuff-until-full", "Name something you stuff until it's full", [
    "Turkey", "Trash can", "Christmas stocking", "Suitcase", "Pillow", "Teddy bear",
  ]),
  makeQuestion("once-a-week", "Name something people usually only do once a week", [
    "Laundry", "Grocery shopping", "Exercise", "Church", "Mow the lawn",
  ]),
];
