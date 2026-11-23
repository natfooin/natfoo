// All content for Fun Time lives here, so it is easy to edit.
// To switch Reading Comprehension on later: set `ready: true` for it below
// and build the game inside the `reading` case of GameRouter (FunTimeGames.jsx).

export const ageCategories = [
  { id: "kids", label: "Kids", range: "Ages 5–8", icon: "🧒", tagline: "Bright, easy & super fun" },
  { id: "tweens", label: "Tweens", range: "Ages 9–12", icon: "🧑", tagline: "Quick thinking, big laughs" },
  { id: "teens", label: "Teens", range: "Ages 13–17", icon: "🧑‍🎓", tagline: "Fast, sharp & competitive" },
  { id: "adults", label: "Adults", range: "Ages 18+", icon: "👨‍💼", tagline: "Real brain-teasers to beat" },
];

export const subCategories = [
  { id: "riddles", label: "Riddles", icon: "🤔", description: "Crack the clues before time runs out", ready: true },
  { id: "brainrot", label: "Brain Rot", icon: "🧠", description: "Chaotic meme-style tap frenzy", ready: true },
  { id: "puzzle", label: "Puzzle", icon: "🧩", description: "Flip, slide and solve", ready: true },
  { id: "reading", label: "Reading Comprehension", icon: "📖", description: "Stories and questions to sharpen your mind", ready: false },
];

export const gameInfo = {
  riddles: { title: "Riddle Rush", how: "Pick the right answer. Build a streak for bonus points!" },
  brainrot: { title: "Meme Rush", how: "Tap ONLY the glowing target emoji. Dodge the decoys!" },
  puzzle: {
    kids: { title: "Memory Match", how: "Flip two cards at a time and find all the matching pairs." },
    tweens: { title: "Slide Puzzle", how: "Slide the tiles into order from 1 to 8. Arrow keys work too!" },
    teens: { title: "Lights Out", how: "Tap a light to flip it and its neighbours. Switch them all off." },
    adults: { title: "Slide Puzzle 4×4", how: "Slide the tiles into order from 1 to 15. Arrow keys work too!" },
  },
};

// Seconds per riddle (0 = no timer)
export const RIDDLE_TIMER = { kids: 0, tweens: 25, teens: 20, adults: 20 };

// a = correct answer, w = wrong options
export const riddles = {
  kids: [
    { q: "I have a face and two hands, but no arms or legs. What am I?", a: "A clock", w: ["A cat", "A robot", "The moon"], hint: "I help you know what time it is." },
    { q: "I am yellow and long, and monkeys love to eat me. What am I?", a: "A banana", w: ["A lemon", "A corn cob", "A pencil"], hint: "Peel me before you eat me!" },
    { q: "What has four legs but cannot walk?", a: "A table", w: ["A dog", "A cow", "A cat"], hint: "You eat your dinner on me." },
    { q: "What goes up when the rain comes down?", a: "An umbrella", w: ["A kite", "A bird", "A rock"], hint: "It keeps you dry." },
    { q: "I have wings, I make honey, and I go buzz. Who am I?", a: "A bee", w: ["A bat", "A duck", "A bus"], hint: "I live in a hive." },
    { q: "I come in pairs, you wear me on your feet, and I may have laces. What am I?", a: "Shoes", w: ["Hats", "Gloves", "Scarves"], hint: "You put them on before going outside." },
    { q: "I am round, I glow in the night sky, and I change my shape. What am I?", a: "The moon", w: ["The sun", "A cloud", "A plane"], hint: "Sometimes I look like a banana!" },
    { q: "I have lots of pages and I tell you stories. What am I?", a: "A book", w: ["A spoon", "A ball", "A cup"], hint: "You read me at bedtime." },
  ],
  tweens: [
    { q: "What has keys but can't open any locks?", a: "A piano", w: ["A door", "A treasure chest", "A map"], hint: "Musicians press them." },
    { q: "What gets wetter the more it dries?", a: "A towel", w: ["A sponge", "The sun", "A sock"], hint: "You use it after a shower." },
    { q: "What has a neck but no head?", a: "A bottle", w: ["A shirt", "A giraffe statue", "A guitar string"], hint: "Water or juice comes in it." },
    { q: "The more of me you take, the more you leave behind. What am I?", a: "Footsteps", w: ["Photos", "Coins", "Candy"], hint: "Think about walking on a sandy beach." },
    { q: "What can travel around the world while staying in one corner?", a: "A stamp", w: ["A plane", "A shadow", "A compass"], hint: "It sticks to the corner of an envelope." },
    { q: "What has many teeth but can never bite?", a: "A comb", w: ["A shark", "A saw blade toy", "A zipper bag"], hint: "You use it on your hair." },
    { q: "What begins with T, ends with T, and has T inside it?", a: "A teapot", w: ["A tent", "A treat", "A tablet"], hint: "It's something you pour from." },
    { q: "I'm tall when I'm young and short when I'm old. What am I?", a: "A candle", w: ["A tree", "A pencil case", "A kid"], hint: "I melt as I give light." },
  ],
  teens: [
    { q: "What can you catch but never throw?", a: "A cold", w: ["A ball", "A frisbee", "A fish"], hint: "Achoo!" },
    { q: "The more of me there is, the less you can see. What am I?", a: "Darkness", w: ["Fog lights", "Sunlight", "Glass"], hint: "Switch off the lamp." },
    { q: "I speak without a mouth and hear without ears. What am I?", a: "An echo", w: ["A ghost", "A radio", "A shadow"], hint: "Shout in a canyon." },
    { q: "What is always in front of you but can't be seen?", a: "The future", w: ["The air", "A mirror", "Your nose"], hint: "It hasn't happened yet." },
    { q: "What word becomes shorter when you add two letters to it?", a: "Short", w: ["Small", "Brief", "Tiny"], hint: "Add 'er' and read it again." },
    { q: "I have cities but no houses, forests but no trees, and water but no fish. What am I?", a: "A map", w: ["A dream", "A video game", "A globe"], hint: "Folded in a glove box." },
    { q: "What has a heart that doesn't beat?", a: "An artichoke", w: ["A robot", "A statue", "A playing card"], hint: "It's a vegetable." },
    { q: "What belongs to you, but other people use it more than you do?", a: "Your name", w: ["Your phone", "Your bike", "Your room"], hint: "Everyone says it to get your attention." },
  ],
  adults: [
    { q: "A man pushes his car to a hotel and tells its owner he's bankrupt. Why?", a: "He's playing Monopoly", w: ["His car broke down", "He lost his wallet", "He was joking about taxes"], hint: "Think board games." },
    { q: "Forward I'm heavy, backward I'm not. What am I?", a: "Ton", w: ["Net", "Stone", "Weight"], hint: "Read it the other way around." },
    { q: "What comes once in a minute, twice in a moment, but never in a thousand years?", a: "The letter M", w: ["A second", "A heartbeat", "Midnight"], hint: "Count letters, not time." },
    { q: "A boat is full of people, yet there isn't a single person on board. How?", a: "They're all married", w: ["It's a ghost ship", "Everyone is below deck", "They're all crew"], hint: "Listen for the word 'single'." },
    { q: "I run but never walk, have a mouth but never talk, and a bed but never sleep. What am I?", a: "A river", w: ["A clock", "A train", "A road"], hint: "Water flows through me." },
    { q: "The one who makes it sells it. The buyer never uses it. The user never knows. What is it?", a: "A coffin", w: ["A lottery ticket", "An insurance policy", "A gift card"], hint: "A grim classic." },
    { q: "What is so fragile that saying its name breaks it?", a: "Silence", w: ["Glass", "A promise", "A secret"], hint: "Say it out loud." },
    { q: "I'm not alive, but I grow. I don't have lungs, but I need air. Water kills me. What am I?", a: "Fire", w: ["A plant", "Mold", "A balloon"], hint: "Handle with care." },
  ],
};

// Meme Rush settings per age group
export const rushConfig = {
  kids: { duration: 30, spawn: 950, visible: 1800, targets: ["🦄", "🐸", "🍕", "🍦"], decoys: ["🧦", "🥦", "🪨", "🐛"] },
  tweens: { duration: 30, spawn: 800, visible: 1500, targets: ["🐸", "🍕", "🎮", "⚡"], decoys: ["🧦", "🪨", "🥦", "🦆"] },
  teens: { duration: 30, spawn: 700, visible: 1300, targets: ["🗿", "💀", "🔥", "🫠"], decoys: ["🧢", "📎", "🧦", "🪴"] },
  adults: { duration: 30, spawn: 600, visible: 1100, targets: ["☕", "🚀", "💡", "🎯"], decoys: ["📠", "💾", "📞", "🧾"] },
};

// Memory Match (kids)
export const MEMORY_EMOJIS = {
  kids: ["🐶", "🐱", "🦊", "🐸", "🦁", "🐼"],
};
