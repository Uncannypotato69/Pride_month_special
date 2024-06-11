const COLORS = {
    rainbow: [
      'hsl(0deg 0% 18%)',
      'hsl(30deg 60% 30%)',
      'hsl(0deg 90% 55%)',
      'hsl(30deg 95% 65%)',
      'hsl(55deg 90% 65%)',
      'hsl(100deg 65% 45%)',
      'hsl(220deg 80% 55%)',
      'hsl(265deg 80% 50%)',
    ],
    'rainbow-original': [
      'hsl(0deg 90% 55%)',
      'hsl(30deg 95% 65%)',
      'hsl(55deg 90% 65%)',
      'hsl(100deg 65% 45%)',
      'hsl(220deg 80% 55%)',
      'hsl(265deg 80% 50%)',
    ],
    trans: [
      'hsl(200deg 85% 70%)',
      'hsl(350deg 85% 85%)',
      'hsl(0deg 0% 100%)',
      'hsl(350deg 85% 85%)',
      'hsl(200deg 85% 70%)',
    ],
    pan: [
      'hsl(331deg 100% 55%)',
      'hsl(50deg 100% 50%)',
      'hsl(200deg 100% 55%)',
    ],
    lesbian: [
        'hsl(15deg 70% 50%)',    // Dark Orange
        'hsl(30deg 80% 60%)',    // Light Orange
        'hsl(0deg 0% 100%)',     // White
        'hsl(330deg 100% 85%)',  // Light Pink
        'hsl(340deg 100% 65%)'   // Dark Pink
    ],
    gender_fluid: [
        'hsl(330deg 100% 50%)',   // Pink
        'hsl(0deg 0% 100%)',      // White
        'hsl(240deg 100% 50%)',   // Purple
        'hsl(0deg 0% 0%)',        // Black
        'hsl(210deg 100% 50%)'    // Blue
    ],
    gender_queer: [
        'hsl(125deg 50% 60%)',    // Lavender
        'hsl(0deg 0% 100%)',      // White
        'hsl(270deg 40% 50%)'     // Green
    ],
    asexual: [
        'hsl(0deg 0% 0%)',        // Black
        'hsl(0deg 0% 33%)',       // Gray
        'hsl(0deg 0% 100%)',      // White
        'hsl(270deg 100% 50%)'    // Purple
    ],    
  };

  

// FUNCTION TO GET THE GRADIENTS
function generateGradient(colors) {
  const numOfColors = colors.length;  // gets no. of colors from the array of COLORS
  const segmentHeight = 100 / numOfColors;  // Makes the segments

  const gradientStops = colors.map((color, index) => {
      const from = index * segmentHeight;
      const to = (index + 1) * segmentHeight;

      return `${color} ${from}% ${to}%`; // This results in an output smth like this hsl(230, 40, 60) 0% 33.3%
  });

  return `linear-gradient(to bottom, ${gradientStops.join(", ")})`; // This results in an output smth like this linear-gradient(to bottom, hsl(230, 40, 60), 0%, 33.3% )
}

// FUNCTION TO DISPLAY VALUES
const segmentScroll = document.querySelector("#segmentScroll");
const segmentDisplay = document.querySelector(".segmentDisplay");
const staggerScroll = document.querySelector("#staggerScroll");
const staggerDisplay = document.querySelector(".staggerDisplay");
const flagSelector = document.querySelectorAll('input[name="flagSelector"]');

let selectedFlag = 'rainbow'; // Default flag variant

function displaySegmentValue() {
  const value = segmentScroll.value;
  segmentDisplay.innerHTML = `${value}`;
  displayStaggerValue();
}

function displayStaggerValue() {
  const staggerValue = staggerScroll.value;
  staggerDisplay.innerHTML = `${staggerValue}ms`;
  GeneratePrideFlags({ 
    variant: selectedFlag,
    noOfColumns: segmentScroll.value,
    staggerDelay: staggerValue
  });
}

segmentScroll.addEventListener("input", displaySegmentValue);
staggerScroll.addEventListener("input", displayStaggerValue);

flagSelector.forEach(radio => {
  radio.addEventListener('change', (event) => {
    selectedFlag = event.target.value;
    GeneratePrideFlags({
      variant: selectedFlag,
      noOfColumns: segmentScroll.value,
      staggerDelay: staggerScroll.value
    });
  });
});

// FUNCTION TO CREATE PRIDE FLAGS
function GeneratePrideFlags({
  variant = "rainbow",
  width = 200,
  noOfColumns = 10,
  staggerDelay = 100,
  billow = 2
} = {}) {
  const colors = COLORS[variant];
  const friendlyWidth = Math.round(width / noOfColumns) * noOfColumns;
  const firstColumnDelay = noOfColumns * staggerDelay * -1;

  const flag = document.querySelector(".flag");
  flag.style.width = `${friendlyWidth}px`;
  flag.innerHTML = ''; // Clear existing columns

  for (let columnIndex = 0; columnIndex < noOfColumns; columnIndex++) {
      const columnElement = document.createElement("div");
      columnElement.classList.add("column");
      columnElement.style.setProperty("--billow", `${columnIndex * billow}px`);
      columnElement.style.background = generateGradient(colors);
      columnElement.style.animationDelay = `${firstColumnDelay + staggerDelay * columnIndex}ms`;
      flag.appendChild(columnElement);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  displaySegmentValue(); // Initial setup
  displayStaggerValue(); // Initial setup for stagger delay

    const checkbox = document.getElementById('candy');
    const body = document.body;
  
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        body.classList.add('candy');
      } else {
        body.classList.remove('candy');
      }
    });

  });
  



