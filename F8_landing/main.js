'use strict';
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const html = $('.html');
// show my course header table
const myCourse = $('.js-header__user-title');
const myCourseTableHeader = $('.js-my-course-header');

function showMyCourseTable () {
    myCourseTableHeader.classList.add('open');
}

myCourse.addEventListener('click', showMyCourseTable);

// show icon header table
const iconHeader = $('.js-icon-header');
const notifyTableHeader = $('.js-header-notify-table');

function showNotifyTableHeader () {
    notifyTableHeader.classList.add('open');
}

iconHeader.addEventListener('click', showNotifyTableHeader);

// Show avt header table
const avtHeader = $('.js-header-avt');
const avtHeaderTable = $('.js-header-avt-table');

function showAvtHeaderTable () {
    avtHeaderTable.classList.add('open');
}

avtHeader.addEventListener('click', showAvtHeaderTable);



// exercute JS
(function eventHandler() {
    
    // Begin: JS side Bar
    const miniMenu = $('.sidebar__miniMenu');
    const circleButton = $('.sidebar_button-circle');
    let active = false;
    
    // rotate button
    circleButton.onclick = function() {
        // add animation class when clicked 
        if( active == false ) {
            this.classList.add('no-hover');
            this.classList.add('sidebar_button-active');
            miniMenu.innerHTML = `<div class="sidebar_menu-module animation_drop-in" >
                                <ul>
                                    <li>
                                        <a href="#">
                                            <i class="fa-solid fa-pen"></i>
                                            <span> Viết blog </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>`;
            active = true;
        } 
        // remove animation class when cliked again
        else { 
            const sidebarMenu = $('.sidebar_menu-module')
            this.classList.remove('no-hover');
            this.classList.remove('sidebar_button-active');
            sidebarMenu.classList.remove('animation_drop-in');
            sidebarMenu.classList.add('animation_fade-out');

            setTimeout(function() {
                sidebarMenu.remove();
            }, 290)

            active = false;
        } 

        
        // Ignor this line
        // For runtime error because i didn't provide a promise
        return Promise.resolve("Dummy response to keep the console quiet");
    }
})();

function debounce(func, wait = 600, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

// Slider section
(function carousel() {
    
    const containerBody = $('.container__body');
    const carouselSlideTrack = $('.slider__slideTrack');
    const carouselSlides = Array.from(carouselSlideTrack.children);
    const navDot = $('.slick__dot-menu');
    const dots = Array.from(navDot.children);
    const currentSlide = $('#current-slide');

    // Slider button
    const prevBtn = $('.prevBtn');
    const nextBtn = $('.nextBtn');

    // counter
    let index = 0;
    let slideWidth = carouselSlides[0].clientWidth;
    carouselSlideTrack.style.transform = 'translateX(' + (-slideWidth * index) + 'px)';

    // window.addEventListener('resize', () => {
    //     carouselSlides.forEach((slide) => {
    //         if(slide.id === 'current-slide') {
    //             slide.style.width = containerBody.clientWidth + 'px';
    //             // slideWidth = slide.clientWidth;
    //         } else {
    //             slide.style.width = '1380px';
    //         }
    //     });
    // })

    setInterval( () => {
        carouselSlides.forEach((slide) => {
        if(slide.id === 'current-slide') {
            slide.style.width = containerBody.clientWidth + 'px';
            // slideWidth = slide.clientWidth;
        } else {
            slide.style.width = '1380px';
        }
    })}
    ,500);

    // const setSlidePosition = (slide, index) => {
    //     track.style.transform = 'translateX(' + (-slideWidth * index) + 'px)';
    // }
    
    // carouselSlides.forEach(setSlidePosition);

    const moveToSlide = (track, slideWidth, targetIndex, currentSlide, targetSlide) => {
        currentSlide.removeAttribute('id', 'current-slide');
        targetSlide.setAttribute('id', 'current-slide');
        track.style.transition = 'transform 0.8s ease-out';
        track.style.transform = 'translateX(' + (-slideWidth * targetIndex) + 'px)';
    }

    const updateDot = (currentDot, targetDot) => {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    }

    const hideArrow = (slides, prevBtn, nextBtn, targetIndex) => {
        if(targetIndex <= 0) {
            prevBtn.classList.add('is-hidden');
            nextBtn.classList.remove('is-hidden');

        } else if (targetIndex >= slides.length -1 ){
            prevBtn.classList.remove('is-hidden');
            nextBtn.classList.add('is-hidden');

        } else {
            prevBtn.classList.remove('is-hidden');
            nextBtn.classList.remove('is-hidden');
        }
    }
    
    // only allow user to transition to the next or prev slide
    // after the animation ended
    function waitTillTransitionEnd(currentBtn, isClicked) {
        if(isClicked) {
            currentBtn.disabled = true;
        } 
        setTimeout(() => {
            currentBtn.disabled = false;
            isClicked = false;
        }, 1000)
    }
    //Button listener

    nextBtn.addEventListener('click', (e) => {
        const currentSlide = carouselSlideTrack.querySelector('#current-slide');
        let targetIndex = currentSlide.getAttribute('data-index');
        const currentDot = navDot.querySelector('.current-slide');
        let isClicked = true;

        if(targetIndex >= carouselSlides.length - 1) 
        {
            return;
        } else {
            const nextDot = currentDot.nextElementSibling;
            const nextSlide = currentSlide.nextElementSibling;
            targetIndex++;

            moveToSlide(carouselSlideTrack, slideWidth, targetIndex, currentSlide, nextSlide);
            updateDot(currentDot, nextDot);
            hideArrow(carouselSlides, prevBtn, nextBtn, targetIndex);
            waitTillTransitionEnd(nextBtn, isClicked);
        }
    });

    prevBtn.addEventListener('click', (e) => {
        const currentSlide = carouselSlideTrack.querySelector('#current-slide');
        let targetIndex = currentSlide.getAttribute('data-index');
        const currentDot = navDot.querySelector('.current-slide');
        let isClicked = true;

        if(targetIndex <= 0) 
        { 
            return;
        }
        else {
            const prevDot = currentDot.previousElementSibling;
            const prevSlide = currentSlide.previousElementSibling;
            targetIndex--;

            moveToSlide(carouselSlideTrack, slideWidth, targetIndex, currentSlide, prevSlide);
            updateDot(currentDot, prevDot);
            hideArrow(carouselSlides, prevBtn, nextBtn, targetIndex);
            waitTillTransitionEnd(prevBtn, isClicked);
        } 
    });

    // Dot navigation for slider
    navDot.addEventListener('click', e => {
        
        const targetDot = e.target.closest('button');

        if(!targetDot) return;

        const currentSlide = carouselSlideTrack.querySelector('#current-slide');
        const currentDot = navDot.querySelector('.current-slide');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = carouselSlides[targetIndex];

        moveToSlide(carouselSlideTrack, slideWidth, targetIndex, currentSlide, targetSlide);
        updateDot(currentDot, targetDot);
        hideArrow(carouselSlides, prevBtn, nextBtn, targetIndex);
    })

    // auto move
    // setInterval( () => {

    //     const currentSlide = carouselSlideTrack.querySelector('#current-slide');
    //     let targetIndex = currentSlide.getAttribute('data-index');
    //     console.log(targetIndex);
    //     const currentDot = navDot.querySelector('.current-slide');

    //     if(targetIndex >= 0) {
    //         const currentDot = navDot.querySelector('.current-slide');
    //         const nextDot = currentDot.nextElementSibling;
    //         const nextSlide = currentSlide.nextElementSibling;
    //         targetIndex--;
            
    //         moveToSlide(carouselSlideTrack, slideWidth, targetIndex, currentSlide, nextSlide);
    //         updateDot(currentDot, nextDot);
    //         hideArrow(carouselSlides, prevBtn, nextBtn, targetIndex);

    //     } 
    //     if(targetIndex === carouselSlideTrack.length - 1) {
    //         targetIndex = 0;
    //     }
    // }
    // ,1000);
    //Button listenen
    
    //Button listenen
    // console.log(carouselSlideTrack.firstElementChild);
    // console.log(carouselSlideTrack.lastElementChild);
    
    // carouselSlideTrack.addEventListener('transitionend', () => {
    //     const currentSlide = carouselSlideTrack.querySelector('#current-slide');
    //     let targetIndex = currentSlide.getAttribute('data-index');

    //     if(targetIndex == 0) {

    //         console.log(true);
    //         const lastClone = carouselSlideTrack.lastElementChild;
    //         const lastDot = navDot.lastElementChild;
    //         const prevSlide = lastClone.previousElementSibling;
    //         const prevDot = lastDot.previousElementSibling;

    //         carouselSlideTrack.style.transition = 'none';
    //         targetIndex = carouselSlides.length - 2;


    //         moveToSlide(track, slideWidth, targetIndex, currentSlide, prevSlide);
    //         updateDot(currentDot, prevDot);
    //     }
 
    //     if(targetIndex == carouselSlides.length - 1) {
    //         console.log(true);

    //         const firstClone = carouselSlideTrack.firstElementChild;
    //         const firstDot = navDot.firstElementChild;
    //         const nextSlide = firstClone.nextElementSibling;
    //         const nextDot = firstDot.nextElementSibling;

    //         carouselSlideTrack.style.transition = 'none';
    //         targetIndex = carouselSlides.length - targetIndex;

    //         moveToSlide(track, slideWidth, targetIndex, currentSlide, nextSlide);
    //         updateDot(currentDot, nextDot);
    //     }
    // })
}) ();


// JS Container Study Route btn (frontend - backend)
(function courseToggle() {
    const btnFrontEndOfContainer = $('.container__FE-process');
    const btnBackEndOfContainer = $('.container__BE-process');
    
    
    function activeBTN_FE () {
        btnFrontEndOfContainer.classList.add('btn-study-route-active');
        btnBackEndOfContainer.classList.remove('btn-study-route-active');
    }
    
    function ActiveBTN_BE () {
        btnBackEndOfContainer.classList.add('btn-study-route-active');
        btnFrontEndOfContainer.classList.remove('btn-study-route-active');
    }

    btnFrontEndOfContainer.addEventListener('click', activeBTN_FE);
    btnBackEndOfContainer.addEventListener('click', ActiveBTN_BE);

}) ();

