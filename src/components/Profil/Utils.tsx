export const generateRandomUsername = () => {
    const adjectives: string[] = [
        "Wild", "Fast", "Cool", "Sly", "Dark",
        "Grim", "Bold", "Vast", "Old", "Calm",
        "High", "Free", "Pure", "Warm", "Wise",
        "Hard", "Deep", "Soft", "Thin", "Tall"
    ];
    const nouns: string[] = [
        "Gun", "Bow", "Hat", "Star", "Boot",
        "Fort", "Mask", "Sword", "Pike", "Cape",
        "Town", "Dust", "King", "Sage", "Cart",
        "Mace", "Wand", "Wolf", "Bear", "Crow"];
    
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 100);
    return `${randomAdjective}${randomNoun}${randomNumber}`;
};