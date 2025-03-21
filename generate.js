const generate = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const combinations = [];
    for (let i = 0; i < letters.length; i++) {
        combinations.push(letters[i]);
    }
    for (let i = 0; i < letters.length; i++) {
        for (let j = 0; j < letters.length; j++) {
            combinations.push(letters[i] + letters[j]);
        }
    }
    for (let i = 0; i < letters.length; i++) {
        for (let j = 0; j < letters.length; j++) {
            for (let k = 0; k < letters.length; k++) {
                combinations.push(letters[i] + letters[j] + letters[k]);
            }
        }
    }

    return combinations;
};

module.exports = generate;
