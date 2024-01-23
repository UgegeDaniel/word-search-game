var wordsToSearch = {
  "Chem Elements": [
    ["gold", "iron", "lead", "neon", "zinc", "nick", "cobalt", "argon", "tung", "alum", "lith", "ruth", "rhen", "holm", "pall", "beri", "cali", "cesi", "scot", "thor"],
    ["tita", "nept", "kryp", "stron", "plut", "magn", "curi", "bism", "techn", "polo", "vani", "prom", "rubi", "indi", "ferr", "niob", "moly", "thul", "berk", "mang"]
    // Add more words as needed
  ],

  "Prog Concepts": [
    ["loop", "func", "obje", "arra", "stri", "inte", "bool", "algo", "synt", "comp", "iter", "recu", "clas", "meth", "inh", "pol", "abs", "enc", "int", "data"],
    ["vari", "algo", "synt", "comp", "iter", "recu", "clas", "meth", "inh", "pol", "abs", "enc", "int", "data", "poin", "link", "stack", "quee", "heap", "tree"]
    // Add more words as needed
  ],

  "Famous Sci": [
    ["eins", "newt", "gali", "curi", "dawn", "tesl", "fara", "hawk", "mend", "past", "bohr", "plan", "hubb", "kepl", "cope", "saga", "pave", "hook", "luna", "cell"],
    ["ampe", "ferm", "heis", "pavl", "hooe", "oppa", "roen", "sch", "edie", "mari", "maxw", "edis", "maie", "pasc", "albe", "davy", "carr", "ruth", "wats", "crik"]
    // Add more words as needed
  ],

  "Colorful Hues": [
    ["red", "blue", "gold", "pink", "cyan", "lime", "teal", "gray", "plum", "rose", "navy", "ruby", "mint", "coal", "cyan", "aqua", "pear", "ruby", "iris", "gold"],
    ["coal", "pink", "wine", "jade", "onyx", "iris", "lava", "snow", "lime", "rose", "ruby", "sage", "salt", "sand", "pear", "opal", "lake", "leaf", "sky", "rust"]
    // Add more words as needed
  ],

  "Body Parts": [
    ["head", "arm", "leg", "foot", "hand", "neck", "knee", "toe", "nose", "lips", "chin", "back", "ear", "eye", "hair", "skin", "liver", "lung", "foot", "knee"],
    ["elbo", "palm", "thumb", "tooth", "nail", "iris", "vein", "cell", "tong", "heel", "neck", "face", "body", "army", "bone", "back", "hip", "knee", "lips", "brow"]
    // Add more words as needed
  ],

  "Tech Terms": [
    ["code", "html", "css", "java", "node", "data", "byte", "byte", "disk", "file", "loop", "wifi", "sync", "root", "page", "form", "link", "view", "path", "sync"],
    ["read", "send", "post", "get", "size", "line", "head", "code", "html", "css", "java", "node", "data", "byte", "byte", "disk", "file", "loop", "wifi", "sync"]
    // Add more words as needed
  ],

  "Space Stuff": [
    ["star", "moon", "sun", "mars", "venu", "jupi", "satu", "nept", "plut", "belt", "nova", "hole", "hole", "dust", "wave", "beam", "star", "moon", "void", "void"],
    ["sola", "orbit", "galax", "plane", "cosm", "dark", "nasa", "time", "math", "star", "moon", "sun", "mars", "venu", "jupi", "satu", "nept", "plut", "belt", "nova"]
    // Add more words as needed
  ],

  "Food Feels": [
    ["cake", "pie", "cook", "bake", "dish", "meal", "snack", "taco", "rice", "corn", "beef", "pork", "fish", "soup", "bowl", "wine", "beer", "cola", "juic", "milk"],
    ["wine", "cola", "cake", "pie", "cook", "bake", "dish", "meal", "snack", "taco", "rice", "corn", "beef", "pork", "fish", "soup", "bowl", "wine", "beer", "cola"]
    // Add more words as needed
  ],

  "Musical Notes": [
    ["note", "sing", "song", "loud", "soft", "high", "low", "beat", "bass", "treb", "cord", "lyri", "pian", "guit", "viol", "drum", "harp", "flut", "trum", "clar"],
    ["saxo", "trom", "voca", "chor", "band", "solo", "folk", "jazz", "rock", "pop", "hiph", "clas", "rapp", "regg", "blues", "metal", "punk", "funk", "soul", "rnb"]
    // Add more words as needed
  ],

  "Weather Woes": [
    ["rain", "snow", "hail", "sleet", "wind", "gust", "cold", "warm", "cool", "heat", "storm", "clou", "fog", "mist", "clear", "fair", "sunn", "show", "thun", "ligth"],
    ["dark", "gray", "breez", "blow", "mild", "wild", "mood", "chil", "siz", "cool", "size", "rain", "snow", "hail", "sleet", "wind", "gust", "cold", "warm", "cool"]
    // Add more words as needed
  ],

  "Animal Allies": [
    ["bear", "wolf", "deer", "lion", "tige", "leop", "puma", "hawk", "dove", "crow", "frog", "toad", "bear", "wolf", "deer", "lion", "tige", "leop", "puma", "hawk"],
    ["dove", "crow", "swan", "frog", "toad", "hare", "doe", "stag", "lamb", "calf", "colt", "fawn", "foal", "pony", "wolf", "hare", "bear", "lion", "tige", "leop"]
    // Add more words as needed
  ],

  "Vehicle Vibes": [
    ["car", "bus", "bike", "boat", "ship", "trai", "jeep", "tuck", "taxi", "van", "limo", "tank", "jeep", "plane", "jet", "rail", "mono", "subw", "tram", "cabl"],
    ["taxi", "van", "limo", "bike", "jeep", "tank", "jeep", "boat", "ship", "limo", "bus", "taxi", "van", "limo", "bike", "jeep", "tank", "jeep", "boat", "ship"]
    // Add more words as needed
  ],

  "Sports Stars": [
    ["golf", "surf", "skat", "bike", "foot", "ball", "bask", "tenn", "gymn", "swim", "divi", "shot", "putt", "rung", "ring", "pole", "volt", "disc", "socc", "rugb"],
    ["judo", "kara", "wres", "boxi", "hock", "luge", "lacr", "sail", "trap", "clim", "cano", "rowi", "skii", "wate", "wake", "snow", "base", "park", "pole", "volt"]
    // Add more words as needed
  ],

  "Oceanic Odyssey": [
    ["wave", "surf", "tide", "dune", "sand", "reef", "cora", "fish", "whal", "shar", "scal", "tail", "swim", "salt", "deep", "blue", "surf", "salt", "cove", "atol"],
    ["deep", "blue", "surf", "salt", "cove", "atol", "isle", "beac", "breez", "mari", "oce", "gulf", "cape", "ship", "boat", "tide", "cove", "rock", "isle", "swim"]
    // Add more words as needed
  ],

  "Emotion Echos": [
    ["joy", "love", "fear", "hate", "hope", "doubt", "rage", "calm", "cool", "warm", "kind", "mean", "tend", "harsh", "gent", "bold", "mild", "wild", "fair", "unfa"],
    ["dark", "light", "deep", "soft", "loud", "mood", "heat", "cold", "warm", "cool", "size", "rain", "snow", "hail", "sleet", "wind", "gust", "cold", "warm", "cool"]
    // Add more words as needed
  ],

  "Nature's Nook": [
    ["tree", "leaf", "bush", "fern", "oak", "pine", "maple", "moss", "weed", "rose", "lily", "iris", "dais", "dand", "thor", "bird", "frog", "snake", "deer", "wolf"],
    ["hawk", "dove", "swan", "frog", "toad", "bear", "hare", "doe", "stag", "lamb", "calf", "colt", "fawn", "foal", "pony", "wolf", "hare", "bear", "lion", "tige"]
    // Add more words as needed
  ],

  "Mythical Magic": [
    ["mage", "wand", "spell", "tale", "lore", "myth", "folk", "fair", "elf", "dwar", "gobl", "ogre", "trol", "witch", "wiza", "drac", "sorc", "phoe", "gorg", "mumi"],
    ["cerb", "harp", "lore", "myth", "folk", "fair", "elf", "dwar", "gobl", "ogre", "trol", "witch", "wiza", "drac", "sorc", "phoe", "gorg", "mumi", "medu", "neph"]
    // Add more words as needed
  ]
};
