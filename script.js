const NONE = 0;
const HOME = 1;
const VINEYARDS = 2;
const GRAPES = 3;
const WINE = 4;
const CONTACT = 5;

let previousPage = NONE;
let currentPage = HOME;
let bool = true;

const sections = Array.from(document.querySelectorAll('section'));
const progress = document.querySelector('.progress div');
const circles = document.querySelectorAll('.circle');
const menu = document.querySelector('.menu');

const sectionOneWrapper = document.querySelector('.section-1-wrapper');
const sectionFiveWrapper = document.querySelector('.section-5-wrapper');
sectionOneWrapper.style.transform = 'scale(1)';
document.querySelector(`.section-${HOME}`).classList.add('previous-page');

const progressCounter = () => {
    progress.textContent = `${currentPage}/${sections.length}`;
    Array.from(circles).forEach(el => {
        el.style.backgroundColor = 'transparent';
    });
    document.querySelector(`.circle-${currentPage}`).style.backgroundColor = '#ddd';
};
progressCounter();

const pageController = () => {
    bool = true;

    if (previousPage === sections.length) {
        sections.forEach(el => {
            el.style.left = '0';
        });
        previousPage = NONE;
        currentPage = HOME;
        sectionOneWrapper.style.transform = 'scale(1)';
        sectionFiveWrapper.style.transform = 'scale(1.5)';
        progressCounter();
        bool = false;
        return;
    }

    if (previousPage === -1) {
        sections.forEach(el => {
            if (Array.from(el.classList).includes(`section-${sections.length}`)) {
                return;
            }
            el.style.left = '-100vw';
        });
        previousPage = sections.length - 1;
        currentPage = sections.length;
        sectionOneWrapper.style.transform = 'scale(1.5)';
        sectionFiveWrapper.style.transform = 'scale(1)';
        progressCounter();
        bool = false;
        return;
    };
}

document.addEventListener('wheel', (e) => {
    const deltaY = e.deltaY > 0;

    if (deltaY) {
        previousPage++;
        currentPage++;
    } else {
        previousPage--;
        currentPage--;
    }

    pageController();
    progressCounter();

    if (bool) {
        document.querySelector(`.section-${deltaY ? previousPage : currentPage}`).style.left = `${deltaY ? '-100vw' : '0'}`;
        document.querySelector(`.section-${deltaY ? previousPage : currentPage}-wrapper`).style.transform = `scale(${deltaY ? '1.5' : '1'})`;
        document.querySelector(`.section-${deltaY ? previousPage + 1 : currentPage + 1}-wrapper`).style.transform = `scale(${deltaY ? '1' : '1.5'})`;
    }
});

document.querySelector('.left-btn').addEventListener('click', () => {
    previousPage--;
    currentPage--;
    pageController();
    progressCounter();

    if (bool) {
        document.querySelector(`.section-${currentPage}`).style.left = '0'
        document.querySelector(`.section-${currentPage}-wrapper`).style.transform = 'scale(1)';
        document.querySelector(`.section-${currentPage + 1}-wrapper`).style.transform = 'scale(1.5)';
    }
});

document.querySelector('.right-btn').addEventListener('click', () => {
    previousPage++;
    currentPage++;
    pageController();
    progressCounter();

    if (bool) {
        document.querySelector(`.section-${previousPage}`).style.left = '-100vw'
        document.querySelector(`.section-${currentPage}-wrapper`).style.transform = 'scale(1)';
        document.querySelector(`.section-${previousPage}-wrapper`).style.transform = 'scale(1.5)';
    }
});

document.querySelector('.grapes-img').addEventListener('mouseover', () => {
    document.querySelector('.section-3-wrapper').style.opacity = '0.5';
});

document.querySelector('.grapes-img').addEventListener('mouseout', () => {
    document.querySelector('.section-3-wrapper').style.opacity = '1';
});

menu.addEventListener('click', () => {
    document.querySelector('.navbar').classList.toggle('change');
});

function navLink() {
    for (let i = 1; i < sections.length + 1; i++) {
        if (i < currentPage) {
            document.querySelector(`.section-${i}`).style.left = '-100vw';
        }
        if (i !== currentPage) {
            document.querySelector(`.section-${i}-wrapper`).style.transform = 'scale(1.5)';
        }
        // if (Array.from(document.querySelector(`.section-${i}`).classList).includes('previous-page')) {
        //     console.log('here!');
        //     document.querySelector(`.previous-page`).style.left = '0';
        // }
    }

    document.querySelector(`.section-${currentPage}`).style.left = '0';
    document.querySelector(`.section-${currentPage}-wrapper`).style.transform = 'scale(1)';
    pageController();
    progressCounter();

    for (let i = 1; i < sections.length + 1; i++) {
        document.querySelector(`.section-${i}`).classList.remove('previous-page');
    }
};

document.querySelector('.nav-link.home').addEventListener('click', () => {
    previousPage = NONE
    currentPage = HOME;
    navLink();
    document.querySelector(`.section-${HOME}`).classList.add('previous-page');
});

document.querySelector('.nav-link.vineyards').addEventListener('click', () => {
    previousPage = HOME;
    currentPage = VINEYARDS;
    navLink();
    document.querySelector(`.section-${VINEYARDS}`).classList.add('previous-page');
});

document.querySelector('.nav-link.grapes').addEventListener('click', () => {
    previousPage = VINEYARDS;
    currentPage = GRAPES;
    navLink();
    document.querySelector(`.section-${GRAPES}`).classList.add('previous-page');
});

document.querySelector('.nav-link.wine').addEventListener('click', () => {
    previousPage = GRAPES;
    currentPage = WINE;
    navLink();
    document.querySelector(`.section-${WINE}`).classList.add('previous-page');
});

document.querySelector('.nav-link.contact').addEventListener('click', () => {
    previousPage = WINE;
    currentPage = CONTACT;
    navLink();
    document.querySelector(`.section-${CONTACT}`).classList.add('previous-page');
});