// Observer Pattern
const Observer = {
    observers: [],
    subscribe: function(fn) {
      this.observers.push(fn);
    },
    unsubscribe: function(fn) {
      this.observers = this.observers.filter(obs => obs !== fn);
    },
    notify: function(data) {
      this.observers.forEach(obs => obs(data));
    }
  };
  
  // Module Pattern
  const Module = (function() {
    let privateVariable = "Hello World";
    function privateMethod() {
      console.log(privateVariable);
    }
    return {
      publicMethod: function() {
        privateMethod();
      }
    };
  })();

const submitAmountButton = document.getElementById('submitAmount');
const chfAmountInput = document.getElementById('chfAmount');

submitAmountButton.addEventListener('click', () => {
    const chfAmount = parseFloat(chfAmountInput.value);
    if (isNaN(chfAmount) || chfAmount < 0) {
        alert('Please enter a valid amount.');
    } else {
        const tokens = chfAmount * 0.8;
        localStorage.setItem('tokens', tokens);
        window.location.href = 'index.html';
    }
});
const tokensElement = document.getElementById('tokens');
const tokens = parseFloat(localStorage.getItem('tokens')) || 0;
tokensElement.textContent = `Tokens: ${tokens.toFixed(2)}`;

  // Use Observer Pattern to notify Module when the DOM is ready
  document.addEventListener("DOMContentLoaded", function(event) {
    Observer.notify(event);
  });
  
  // Use Module Pattern to initialize app
  Module.publicMethod();
  
