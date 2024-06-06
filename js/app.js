// Define arrays of words for each category
const wordCategories = {
    subject: ["The turkey", "Mom", "Dad", "The dog", "My teacher", "The elephant", "The cat"],
    verb: ["sat on", "ate", "danced with", "saw", "doesn't like", "kissed"],
    adjective: ["a funny", "a scary", "a goofy", "a slimy", "a barking", "a fat"],
    object: ["goat", "monkey", "fish", "cow", "frog", "bug", "worm"],
    place: ["on the moon", "on the chair", "in my spaghetti", "in my soup", "on the grass", "in my shoes"]
};

// Variables to hold the chosen words for each category
let chosenWords = {
    subject: "",
    verb: "",
    adjective: "",
    object: "",
    place: ""
};

// Create a new speechSynthesis object for speech output
var synth = window.speechSynthesis;

// Get the output element for displaying the generated story
var storyOutput = document.getElementById('storyOutput');

/* Functions
-------------------------------------------------- */

// Function to speak the given string using the SpeechSynthesis API
function speakNow(string) {
    var utterThis = new SpeechSynthesisUtterance(string);
    synth.speak(utterThis);
}

// Function to choose a random word from an array
function chooseRandomWord(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to generate a random story using random words from each category
function generateRandomStory() {
    for (let category in wordCategories) {
        chosenWords[category] = chooseRandomWord(wordCategories[category]);
    }
    displayStory();
}

// Function to display the generated story on the webpage
function displayStory() {
    let story = `${chosenWords.subject} ${chosenWords.verb} ${chosenWords.adjective} ${chosenWords.object} ${chosenWords.place}.`;
    storyOutput.innerText = story;
    return story;
}

// Function to reset the story by clearing chosen words and the displayed story
function resetStory() {
    for (let category in chosenWords) {
        chosenWords[category] = "";
    }
    storyOutput.innerText = "";
}

/* Event Listeners
-------------------------------------------------- */

// Event listener for each story-related button to choose a random word and display the story
document.querySelectorAll('.story-button').forEach(button => {
    button.addEventListener('click', () => {
        let category = button.getAttribute('data-type');
        chosenWords[category] = chooseRandomWord(wordCategories[category]);
        displayStory();
    });
});

// Event listener for the "Surprises" button to generate a random story and display it
document.getElementById('randomStoryBtn').addEventListener('click', generateRandomStory);

// Event listener for the "Playback" button to speak the displayed story
document.getElementById('speakBtn').addEventListener('click', () => {
    speakNow(displayStory());
});

// Event listener for the "Reset" button to reset the story
document.getElementById('resetBtn').addEventListener('click', resetStory);
