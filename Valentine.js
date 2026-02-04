const giftBox = document.querySelector('.gift-box');
const giftLink = document.querySelector('.gift-link');
const heartContainer = document.querySelector('.heart-container');
const heart = document.querySelector('.heart');

giftLink.addEventListener('click', (e) => {
    e.preventDefault();
    heart.style.animation = 'none';
    heart.style.display = 'none';
    const name = 'bé yêu';
    const text = `Chúc ${name} một ngày vui vẻ và bình yên!`;
    const characters = text.split('');
    const spanElements = characters.map((char) => {
        const span = document.createElement('span');
        span.textContent = char;
        return span;
    });
    const fireworksContainer = document.createElement('div');
    fireworksContainer.classList.add('fireworks-container');
    fireworksContainer.append(...spanElements);
    heartContainer.appendChild(fireworksContainer);

    const modalOverlay = document.getElementById('modalOverlay');
    const modal = document.querySelector('.modal');
    const closeBtn = document.getElementById('modalClose');

    if (modalOverlay) {
        modalOverlay.classList.remove('hidden');
        modalOverlay.classList.remove('fade-in');
        modal.classList.remove('scale-in');
        void modalOverlay.offsetWidth;
        modalOverlay.classList.add('fade-in');
        modal.classList.add('scale-in');
        modalOverlay.setAttribute('aria-hidden', 'false');
        if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('fade-in');
            modal.classList.remove('scale-in');
            modalOverlay.classList.add('fade-out');
            modal.classList.add('scale-out');
            setTimeout(() => {
                modalOverlay.classList.add('hidden');
                modalOverlay.classList.remove('fade-out');
                modal.classList.remove('scale-out');
                modalOverlay.setAttribute('aria-hidden', 'true');
                giftLink.focus();
            }, 300);
        }
    }

    // Handlers and cleanup
    const clickClose = (ev) => {
        if (ev.target === modalOverlay || ev.target === closeBtn) {
            closeModal();
            cleanup();
        }
    };
    const keyHandler = (ev) => {
        if (ev.key === 'Escape') {
            closeModal();
            cleanup();
        }
    };
    const cleanup = () => {
        if (closeBtn) closeBtn.removeEventListener('click', clickClose);
        if (modalOverlay) modalOverlay.removeEventListener('click', clickClose);
        document.removeEventListener('keydown', keyHandler);
    };

    if (closeBtn) closeBtn.addEventListener('click', clickClose);
    if (modalOverlay) modalOverlay.addEventListener('click', clickClose);
    document.addEventListener('keydown', keyHandler);

    setTimeout(() => {
        fireworksContainer.remove();
        heart.style.animation = 'fallHeart 5s ease-in-out infinite alternate';
        heart.style.display = 'block';
    }, 2000);
});