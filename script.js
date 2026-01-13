const neonText = document.querySelector('.neon-text');
const cards = document.querySelectorAll('.card');


function setNeonColor(colorVar) {
    neonText.style.color = `var(${colorVar})`;
    neonText.style.textShadow = `0 0 5px var(${colorVar}), 0 0 20px var(${colorVar})`;
}

cards.forEach(card => {
card.addEventListener('mouseenter', () => {
        if (card.classList.contains('card-code')) {
            setNeonColor('--neon-green'); // Vert pour GitHub
        } else if (card.classList.contains('card-van')) {
            setNeonColor('--neon-blue');  // Bleu pour le Van
        } else {
            setNeonColor('--neon-pink');  // Rose par défaut (Data)
        }
    });
card.addEventListener('mouseleave', () => {
        setNeonColor('--neon-blue'); // Retour au bleu initial
    });
});
/* Idée du néon survolé sur le texte par Myriam Akrout (réalisation personnelle) */