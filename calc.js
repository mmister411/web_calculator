// Initialize values for calculator input and history
let calcInput = '';
let calcHistory = [];

// Get the display element from the DOM
const display = document.getElementById('display');
let historyDisplay;

// After the window loads, get the element that will display the calculation history
window.onload = function() {
    historyDisplay = document.getElementById('calc-history');
};

// Listen for click events on the calculator buttons
document.getElementById('calc-buttons').addEventListener('click', function (e) {

    // Get the value of the clicked button
    const value = e.target.dataset.value || e.target.value;
    
    // If the 'ac' button is clicked, reset calcInput and clear the display
    if (value === 'ac') {
        calcInput = '';
        display.value = '';

    // If the '=' button is clicked, evaluate the current calcInput 
    // If the input is valid, display the result and save it to the calcHistory 
    } else if (value === '=') {
        try {
            const result = math.evaluate(calcInput);
            calcInput = result.toString();
            calcHistory.push(result);
        } catch(err) {
            // In the case of an error (like invalid input), log it and alert the user
            console.error(err);
            return alert('Invalid Operation');
        }
    } else {
        // If any other button is clicked, add its value to calcInput
        calcInput += value;
    }

    // Update the display and historyDisplay with the new values
    display.value = calcInput;
    historyDisplay.innerHTML = '<h2>Calculation History:</h2>' 
                            + calcHistory.map(result => `<p>${result}</p>`).join('');
});

// Continue to listen for keydown events to enable usage of the calculator with a keyboard
window.addEventListener('keydown', function (e) {
    // Grab the value of the key that has been pressed
    const value = e.key;

    // List of keys that are valid to be used with the calculator
    const validKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', 'Enter', 'Backspace', '.', '^', '(' , ')', 's', 'q', 'r', 't', 'e', 'x', 'p', 'CLR'];

    // Map special keys to corresponding calculator functions
    const specialKeysMapping = {'Enter': '=', 'Backspace': 'ac', 'CLR': 'clr'};

    // If the key that's been pressed is in our validKeys list
    if (validKeys.includes(value)) {
        
        // If the key is an expected calculator function
        if (value === 'Enter' || value === 'Backspace' || value === 'CLR') {
            // Create a click event
            const event = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true,
                composed: true
            });

            // Find the calculator button that corresponds to the key pressed
            const button = Array.from(document.getElementsByClassName('calc-button'))
              .find(button => (button.dataset.value || button.value) === specialKeysMapping[value]);
              
            // If a corresponding button is found, programmatically click the button
            if (button) button.dispatchEvent(event);

            return;   
        } else {
            // If the key is not a function, add it to the current calculator input
            calcInput += value;
            display.value = calcInput;
        }
    }
});