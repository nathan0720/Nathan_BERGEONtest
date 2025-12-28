// GESTION DU MENU MOBILE (FLUIDE & SANS TRAIT)
document.addEventListener('DOMContentLoaded', () => {
    const menuCheckbox = document.getElementById('menuCheckbox');
    const menu = document.getElementById('mobileMenu');
    const header = document.querySelector('header');

    // Fonction pour fermer proprement
    const closeMenu = () => {
        menu.classList.remove('open');
        header.classList.remove('nav-active');
        menuCheckbox.checked = false;
        document.body.style.overflow = ''; // Réactive le scroll
    };

    const openMenu = () => {
        menu.classList.add('open');
        header.classList.add('nav-active');
        document.body.style.overflow = 'hidden'; // Bloque le scroll
    };

    if (menuCheckbox && menu) {
        // Changement via le bouton
        menuCheckbox.addEventListener('change', () => {
            if (menuCheckbox.checked) openMenu();
            else closeMenu();
        });

        // Fermer si on clique sur le fond du menu (en dehors des liens)
        menu.addEventListener('click', (event) => {
            // Si l'élément cliqué n'est pas un lien <a>
            if (event.target.tagName !== 'A') {
                closeMenu();
            }
        });
        
        // Fermer quand on clique sur un lien (pour changer de page)
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => closeMenu());
        });
    }
});

// Logique du bouton copier (multiples boutons)
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.copy-btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const codeBlock = document.getElementById(targetId);

            if (codeBlock) {
                const codeText = codeBlock.textContent.trim();
                navigator.clipboard.writeText(codeText)
                    .then(() => {
                        const originalHTML = button.innerHTML;
                        button.classList.add('copied');
                        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Copié !';
                        
                        setTimeout(() => {
                            button.classList.remove('copied');
                            button.innerHTML = originalHTML;
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Erreur copie: ', err);
                    });
            }
        });
    });
});

//  Logique de la machine à écrire 
document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('typewriter-dynamic');
    const cursor = document.getElementById('cursor');
    
    if (!textElement || !cursor) {
        return; 
    }

    const phrases = ["une ligne à la fois."];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    let animationStarted = false;
    let animationTimeout;

    gsap.to(cursor, {
        opacity: 0,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        duration: 0.5
    });
    function type() {
        if (window.innerWidth <= 800) {
            animationStarted = false;
            return;
        }

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        animationTimeout = setTimeout(type, typingSpeed);
    }

    function checkScreenAndAnimate() {
        if (window.innerWidth <= 800) {
            clearTimeout(animationTimeout);
            textElement.textContent = phrases[0];
            cursor.style.display = 'none';
            animationStarted = false;
        } else {
            cursor.style.display = 'inline-block';
            if (!animationStarted) {
                charIndex = 0;
                phraseIndex = 0;
                isDeleting = false;
                animationStarted = true;
                type();
            }
        }
    }

    window.addEventListener('resize', checkScreenAndAnimate);

    checkScreenAndAnimate();
});