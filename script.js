const symbols = ['🍎', '🍇', '🍉'];
const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');

function fillSlot(slot) {
    const inner = slot.querySelector('.slot-inner');
    inner.innerHTML = symbols.join('') + symbols[0];
    inner.style.transform = `translateY(${-2.5 * (symbols.length - 1)}rem)`;
}

async function spinSlot(slot) {
    return new Promise((resolve) => {
        const inner = slot.querySelector('.slot-inner');
        const randomIndex = Math.floor(Math.random() * symbols.length);
        const targetPosition = -2.5 * randomIndex;

        let spinCount = 0;
        const spin = () => {
            setTimeout(() => {
                inner.style.transform = `translateY(${parseFloat(inner.style.transform.slice(11)) - 2.5}rem)`;
                if (parseFloat(inner.style.transform.slice(11)) <= -2.5 * (symbols.length)) {
                    inner.style.transform = `translateY(0rem)`;
                }

                spinCount++;
                if (spinCount < symbols.length * 3 + randomIndex) {
                    spin();
                } else {
                    inner.style.transform = `translateY(${targetPosition}rem)`;
                    resolve(symbols[randomIndex]);
                }
            }, 100);
        };

        spin();
    });
}



async function spin() {
    let tokens = parseFloat(localStorage.getItem('tokens')) || 0;

    if (tokens < 5) {
        alert('Du hast nicht genug Tokens.');
        return;
    }

    tokens -= 5;
    localStorage.setItem('tokens', tokens);

    const results = await Promise.all([
        spinSlot(slot1),
        spinSlot(slot2),
        spinSlot(slot3),
    ]);

    const [result1, result2, result3] = results;

    const messageElement = document.getElementById('message');
    const combination = `${result1}${result2}${result3}`;

    const winnings = calculateWinnings(combination);
    tokens += winnings;
    localStorage.setItem('tokens', tokens);
    tokensElement.textContent = `Tokens: ${tokens.toFixed(2)}`;

    if (winnings > 0) {
        messageElement.textContent = `Glückwunsch! Du hast ${winnings} Tokens gewonnen!`;
    } else {
        messageElement.textContent = '';
    }
}


const tokensElement = document.getElementById('tokens');
const tokens = parseFloat(localStorage.getItem('tokens')) || 0;
tokensElement.textContent = `Tokens: ${tokens.toFixed(2)}`;

fillSlot(slot1);
fillSlot(slot2);
fillSlot(slot3);

function calculateWinnings(combination) {
    switch (combination) {
        case '🍎🍎🍎':
            return 20;
        case '🍇🍇🍇':
            return 15;
        case '🍉🍉🍉':
            return 10;
        default:
            return 0;
    }
}
const addTokensButton = document.getElementById("addTokensButton");
addTokensButton.addEventListener("click", addTokens);

function addTokens() {
  let tokens = parseFloat(localStorage.getItem("tokens")) || 0;
  const addedTokens = 10; 
  tokens += addedTokens;
  localStorage.setItem("tokens", tokens);
  tokensElement.textContent = `Tokens: ${tokens.toFixed(2)}`;
}
const spinButton = document.getElementById('spinButton');
spinButton.addEventListener('click', spin);
// Observer Pattern
Observer.subscribe(function(data) {
    console.log("DOM is ready!");
  });
  
  // Module Pattern
  const AnotherModule = (function() {
    let privateVariable = "Hello from Another Module";
    function privateMethod() {
      console.log(privateVariable);
    }
    return {
      publicMethod: function() {
        privateMethod();
      }
    };
  })();
  
  // Use Module Pattern to initialize another module
  AnotherModule.publicMethod();
