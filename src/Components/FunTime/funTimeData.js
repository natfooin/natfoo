export const ageCategories = [
  { id: "kids", label: "Kids", range: "Ages 5–8", icon: "🧒", tagline: "Bright, easy & super fun" },
  { id: "teens", label: "Teens", range: "Ages 13–17", icon: "🧑‍🎓", tagline: "Fast, sharp & competitive" },
  { id: "adults", label: "Adults", range: "Ages 18–44", icon: "👨‍💼", tagline: "Real brain-teasers to beat" },
  { id: "elders", label: "Elders", range: "Ages 45+", icon: "🧓", tagline: "Classic wit, calm & sharp" },
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
    teens: { title: "Lights Out", how: "Tap a light to flip it and its neighbours. Switch them all off." },
    adults: { title: "Slide Puzzle 4×4", how: "Slide the tiles into order from 1 to 15. Arrow keys work too!" },
    elders: { title: "Slide Puzzle", how: "Slide the tiles into order from 1 to 8. Arrow keys work too!" },
  },
};

export const RIDDLE_TIMER = { kids: 0, teens: 20, adults: 20, elders: 30 };

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
  elders: [
    { q: "What has keys but can't open any locks?", a: "A piano", w: ["A door", "A treasure chest", "A map"], hint: "Musicians press them." },
    { q: "What gets wetter the more it dries?", a: "A towel", w: ["A sponge", "The sun", "A sock"], hint: "You use it after a bath." },
    { q: "What has a neck but no head?", a: "A bottle", w: ["A shirt", "A giraffe statue", "A guitar string"], hint: "Water or tea comes in it." },
    { q: "The more of me you take, the more you leave behind. What am I?", a: "Footsteps", w: ["Photos", "Coins", "Memories"], hint: "Think about walking on a sandy beach." },
    { q: "What can travel around the world while staying in one corner?", a: "A stamp", w: ["A plane", "A shadow", "A compass"], hint: "It sticks to the corner of an envelope." },
    { q: "What has many teeth but can never bite?", a: "A comb", w: ["A shark", "A saw blade", "A zipper"], hint: "You use it on your hair." },
    { q: "What begins with T, ends with T, and has T inside it?", a: "A teapot", w: ["A tent", "A treat", "A ticket"], hint: "It's something you pour from." },
    { q: "I'm tall when I'm young and short when I'm old. What am I?", a: "A candle", w: ["A tree", "A pencil", "A cane"], hint: "I melt as I give light." },
  ],
};

export const rushConfig = {
  kids: { duration: 30, spawn: 950, visible: 1800, targets: ["🦄", "🐸", "🍕", "🍦"], decoys: ["🧦", "🥦", "🪨", "🐛"] },
  teens: { duration: 30, spawn: 700, visible: 1300, targets: ["🗿", "💀", "🔥", "🫠"], decoys: ["🧢", "📎", "🧦", "🪴"] },
  adults: { duration: 30, spawn: 600, visible: 1100, targets: ["☕", "🚀", "💡", "🎯"], decoys: ["📠", "💾", "📞", "🧾"] },
  elders: { duration: 30, spawn: 900, visible: 1700, targets: ["🍵", "🌻", "📚", "🎶"], decoys: ["🧦", "🪨", "📎", "🐛"] },
};

export const MEMORY_EMOJIS = {
  kids: ["🐶", "🐱", "🦊", "🐸", "🦁", "🐼"],
};
/* ---------- Presentation data (used by the arena-style UI) ---------- */
export const ageArt = {
  kids: { hero: ["🧒", "🦄", "🎈", "🍦"], accent: "#ffb020", a: "#ff8a3d", b: "#ff3d81" },
  teens: { hero: ["🧑‍🎓", "🗿", "🔥", "💀"], accent: "#b77bff", a: "#7b5cff", b: "#c026d3" },
  adults: { hero: ["👨‍💼", "🚀", "💡", "🎯"], accent: "#ff6fb1", a: "#ff4f9a", b: "#7c2bd9" },
  elders: { hero: ["🧓", "🍵", "📚", "🎶"], accent: "#2fd4c4", a: "#19c2f0", b: "#2f6bff" },
};

export const gameArt = {
  riddles: { emojis: ["🤔", "💡", "❓"], a: "#7b4dff", b: "#2f6bff", cover: "RIDDLE" },
  brainrot: { emojis: ["🗿", "💀", "🔥"], a: "#ff3d81", b: "#ff9a3d", cover: "MEME" },
  puzzle: { emojis: ["🧩", "🔢", "🎴"], a: "#19c2f0", b: "#2f6bff", cover: "PUZZLE" },
  reading: { emojis: ["📖", "✏️", "🔒"], a: "#56627f", b: "#2a3350", cover: "READ" },
};

/** Short facts shown on each game card / info panel, per age group. */
export const gameFacts = (sub, age) => {
  switch (sub) {
    case "riddles": {
      const t = RIDDLE_TIMER[age];
      return {
        pill: `${riddles[age].length} riddles`,
        level: t ? `${t}s per riddle` : "No timer",
        mode: "Quiz",
      };
    }
    case "brainrot":
      return { pill: `${rushConfig[age].duration}s rush`, level: "Tap the target", mode: "Arcade" };
    case "puzzle":
      return {
        kids: { pill: "6 pairs", level: "Memory", mode: "Cards" },
        teens: { pill: "5×5 grid", level: "Logic", mode: "Grid" },
        adults: { pill: "4×4 slide", level: "Hard", mode: "Sliding" },
        elders: { pill: "3×3 slide", level: "Relaxed", mode: "Sliding" },
      }[age];
    default:
      return { pill: "Soon", level: "Coming soon", mode: "Reading" };
  }
};

/** Step-by-step "how to play" lists shown beside every game. */
export const gameRules = {
  riddles: [
    "Read the riddle and pick one of four answers.",
    "Build a streak for bonus points.",
    "Use a hint if you are stuck (costs 50 points).",
  ],
  brainrot: [
    "Watch the target emoji at the top.",
    "Tap it as fast as it pops up. Combos add bonus points.",
    "Decoys cost 5 points. The target changes every 10 seconds.",
  ],
  puzzle: {
    kids: ["Flip two cards at a time.", "Match every pair with the fewest moves.", "Faster and fewer moves means more stars."],
    teens: ["Tap a light to flip it and its neighbours.", "Switch every light off.", "Fewer moves means more stars."],
    adults: ["Slide tiles into the empty space.", "Put the numbers in order, 1 to 15.", "Arrow keys work too."],
    elders: ["Slide tiles into the empty space.", "Put the numbers in order, 1 to 8.", "Arrow keys work too."],
  },
};
