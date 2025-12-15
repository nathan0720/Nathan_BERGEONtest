    // pour le menu deroulant page Nathan BERGEON

    function toggleMobileMenu() {
        const menu = document.getElementById('mobileMenu');
        menu.classList.toggle('open');
    }



    //logique du bouton copier
    document.addEventListener('DOMContentLoaded', () => {
        const copyButton = document.getElementById('copyCodeButton');
        const codeBlock = document.getElementById('pythonCode');
        
        if (copyButton && codeBlock) {
            copyButton.addEventListener('click', () => {
                // 1. Récupérer le texte du code
                const codeText = codeBlock.textContent.trim();

                // 2. Utiliser l'API Navigator Clipboard
                navigator.clipboard.writeText(codeText)
                    .then(() => {
                        // 3. Changement d'état du bouton
                        const originalText = copyButton.innerHTML;
                        copyButton.classList.add('copied');
                        copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Copié !';
                        
                        // 4. Réinitialisation après 2 secondes
                        setTimeout(() => {
                            copyButton.classList.remove('copied');
                            copyButton.innerHTML = originalText;
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Erreur lors de la copie: ', err);
                        alert("La copie a échoué. Votre navigateur ne supporte peut-être pas cette fonctionnalité.");
                    });
            });
        }
    });