// --- Configuration ---
const words = [
    "Inspiring",
    "Empowering",
    "Advancing",
    "Uniting",
    "Building",
    "Leading",
    "Amanah", // From your poster (Trust)
    "Akhlaq", // From your poster (Character)
    "of"
];
const restTime = 2000;      // 2 seconds (2000ms) - how long to show the word
const animationTime = 400; // 0.4 seconds (400ms) - must match CSS transition time
// ---------------------

// Get the element to animate
const wordElement = document.getElementById('animated-word');
let currentIndex = 0;

/**
 * A helper function to pause execution for a set time
 * @param {number} ms - Milliseconds to wait
 */
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Slides the current word out
 */
async function slideOut() {
    wordElement.classList.add('word-slide-out');
    wordElement.classList.remove('word-visible');
    // Wait for the CSS transition to finish
    await wait(animationTime);
}

/**
 * Slides the next word in
 */
async function slideIn() {
    // Move to the next word
    currentIndex = (currentIndex + 1) % words.length;
    // Set the new text
    wordElement.textContent = words[currentIndex];

    // Position it "above" (instantly, no transition)
    wordElement.classList.add('word-slide-in');
    wordElement.classList.remove('word-slide-out');

    // Wait a tiny "tick" for the browser to apply the new class
    await wait(50);

    // Animate it to the "visible" position
    wordElement.classList.add('word-visible');
    wordElement.classList.remove('word-slide-in');

    // Wait for the CSS transition to finish
    await wait(animationTime);
}

/**
 * The main animation loop
 */
async function startAnimationLoop() {
    try {
        // Set the very first word instantly
        wordElement.textContent = words[currentIndex];
        wordElement.classList.add('word-visible');
        
        // Wait for the first rest period
        await wait(restTime);

        // Start the endless loop
        while (true) {
            await slideOut();
            await slideIn();
            await wait(restTime); // Wait 2 seconds before looping again
        }
    } catch (error) {
        console.error("Animation failed:", error);
        // Fallback: just show the first word if something breaks
        wordElement.textContent = "Inspiring";
    }
}

// Start the animation!
startAnimationLoop();