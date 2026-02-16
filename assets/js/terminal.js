// Optional: Typing-Effekt für Terminal-Prompt
(function() {
  const promptElement = document.querySelector('.hero .prompt');
  
  if (!promptElement) return;
  
  const fullText = 'kingsepp.dev';
  let currentIndex = 0;
  
  // Initiale Anzeige leeren
  promptElement.textContent = '';
  
  function typeCharacter() {
    if (currentIndex < fullText.length) {
      promptElement.textContent = '> ' + fullText.substring(0, currentIndex + 1);
      currentIndex++;
      setTimeout(typeCharacter, 80);
    }
  }
  
  // Start nach kurzer Verzögerung
  setTimeout(typeCharacter, 300);
})();