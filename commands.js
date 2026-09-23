document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DO SLIDER ADICIONADA ---
    const slides = document.querySelectorAll('.hero-slider .slide');
    let currentSlide = 0;

    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000); // Executa a cada 4 segundos, garantindo tempo de leitura + 2s de transição
    }
    // -----------------------------------

    const words = ["SOBREMESA", "SALADAS", "PALCO ABERTO", "RIFA"];
    const textElement = document.getElementById('rotating-text');
    let currentIndex = words.indexOf(textElement.textContent.trim());
    if (currentIndex === -1) {
        currentIndex = 0;
        textElement.textContent = words[currentIndex];
    }
    const transitionDuration = 3000;
    const displayDuration = 5000;

    const rotateWord = () => {
        const nextIndex = (currentIndex + 1) % words.length;
        textElement.className = 'is-leaving';

        setTimeout(() => {
            textElement.textContent = words[nextIndex];
            textElement.className = 'is-entering is-preparing';

            requestAnimationFrame(() => {
                textElement.className = 'is-entering is-centered';
            });

            setTimeout(() => {
                currentIndex = nextIndex;
                textElement.className = '';
                setTimeout(rotateWord, displayDuration);
            }, transitionDuration);
        }, transitionDuration);
    };

    setTimeout(rotateWord, displayDuration);

    const modalRifa = document.getElementById('modal-rifa');
    const modalPalco = document.getElementById('modal-palco');
    
    const btnRifa = document.getElementById('btn-rifa');
    const btnPalco = document.getElementById('btn-palco');
    
    const closeBtns = document.querySelectorAll('.close-btn');

    btnRifa.addEventListener('click', () => {
        modalRifa.style.display = 'block';
    });

    btnPalco.addEventListener('click', () => {
        modalPalco.style.display = 'block';
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modalId = e.target.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'none';
        });
    });

    const timelineModal = document.getElementById('modal-linha-do-tempo');
    const timelineButton = document.getElementById('btn-linha-do-tempo');
    const timelineYears = document.querySelectorAll('.timeline-year');
    const timelineGallery = document.getElementById('timeline-gallery');
    const timelineImages = ['massas_topo.png', 'massas_topo2.png', 'massa_topo3.png'];

    const renderTimelineGallery = year => {
        timelineGallery.innerHTML = timelineImages.map((image, index) => `
            <figure class="timeline-photo">
                <img src="${image}" alt="Registro provisório do ano de ${year}, imagem ${index + 1}">
                <span>${year}</span>
            </figure>
        `).join('');
    };

    timelineButton.addEventListener('click', () => {
        timelineModal.style.display = 'block';
        renderTimelineGallery('2016');
    });

    timelineYears.forEach(yearButton => {
        yearButton.addEventListener('click', () => {
            timelineYears.forEach(button => {
                button.classList.remove('is-selected');
                button.setAttribute('aria-selected', 'false');
            });
            yearButton.classList.add('is-selected');
            yearButton.setAttribute('aria-selected', 'true');
            renderTimelineGallery(yearButton.dataset.year);
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === modalRifa) {
            modalRifa.style.display = 'none';
        }
        if (e.target === modalPalco) {
            modalPalco.style.display = 'none';
        }
        if (e.target === timelineModal) {
            timelineModal.style.display = 'none';
        }
    });
});