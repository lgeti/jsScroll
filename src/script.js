// JavaScript for a basic endless carousel

// Event handler for when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded');

    windowResizeHandler();

    // Event listener for adjusting scroll position and event listeners, when the window is resized
    window.addEventListener('resize', windowResizeHandler);

});

// Get the carousel and all the carousel items
const carousel = document.querySelector('.slider-container');
const list = document.querySelector('.event-item-list');
let carouselItems = document.querySelectorAll('.carousel-item');
let itemWidth = carouselItems[0].getBoundingClientRect().width;

//Get arrows
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

// Move the list one column to the left
let scrollPosition = itemWidth;
carousel.scrollLeft = scrollPosition;

//Function that handles resizing of the window
function windowResizeHandler() {
    console.log('Window resized');
    adjustScroll();
    updateEventListeners();
}

// Function to adjust scroll position
function adjustScroll() {
    itemWidth = carouselItems[0].getBoundingClientRect().width;

    // Checks if itemWidth is different from scrollPosition (if it is, it means the window was resized)
    if (itemWidth !== scrollPosition) {
        scrollPosition -= scrollPosition - itemWidth;
        // Update the scroll position
        carousel.scrollLeft = scrollPosition;
    }
}

// Function to update the event listeners for the arrows
function updateEventListeners() {
    console.log(prevButton, nextButton)
    prevButton.removeEventListener('click', moveLeftMobile);
    nextButton.removeEventListener('click', moveRightMobile);
    prevButton.removeEventListener('click', moveLeftDesktop);
    nextButton.removeEventListener('click', moveRightDesktop);

    if (window.innerWidth < 768) {
        console.log('mobile event listeners');
        prevButton.addEventListener('click', moveLeftMobile);
        nextButton.addEventListener('click', moveRightMobile);
    } else {
        prevButton.addEventListener('click', moveLeftDesktop);
        nextButton.addEventListener('click', moveRightDesktop);
    }
}

// Function to move the carousel to the right
function moveRightDesktop() {
    // Update the list of carousel items and the item width
    carouselItems = document.querySelectorAll('.carousel-item');
    itemWidth = carouselItems[0].getBoundingClientRect().width;

    // Make the carousel stay in place when manipulating the list
    scrollPosition -= itemWidth;
    carousel.scrollLeft = scrollPosition;
    
    let item1 = carouselItems[0];
    let item13 = carouselItems[12];
    //Puts the first item on the 12th position
    list.insertBefore(item1, carouselItems[11].nextSibling);
    //Puts 13th item on the 24th position
    list.insertBefore(item13, carouselItems[23].nextSibling);


    
    // Calculate the new scroll position
    scrollPosition += itemWidth;
    
    // Scroll to the new position with a smooth effect
    carousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

// Function to move the carousel to the left    
function moveLeftDesktop() {
    // Update the list of carousel items and the item width
    carouselItems = document.querySelectorAll('.carousel-item');
    itemWidth = carouselItems[0].getBoundingClientRect().width;
    
    // Make the carousel stay in place when manipulating the list
    scrollPosition += itemWidth;
    carousel.scrollLeft = scrollPosition;
    
    let item12 = carouselItems[11];
    let item24 = carouselItems[23];
    //Puts 12th item on the first position
    list.insertBefore(item12, carouselItems[0]);
    //Puts 24th item on the 13th position
    list.insertBefore(item24, carouselItems[12]);
    
    // Calculate the new scroll position
    scrollPosition -= itemWidth;
    
    // Scroll to the new position with a smooth effect
    carousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

// Function to move the carousel to the right for mobile
function moveRightMobile() {
    // Update the list of carousel items and the item width
    carouselItems = document.querySelectorAll('.carousel-item');
    itemWidth = carouselItems[0].getBoundingClientRect().width;

    // Make the carousel stay in place when manipulating the list
    scrollPosition -= itemWidth;
    carousel.scrollLeft = scrollPosition;
    
    let item1 = carouselItems[0];
    let item9 = carouselItems[8];
    let item17 = carouselItems[16];
    //Puts the first item on the 8th position
    list.insertBefore(item1, carouselItems[7].nextSibling);
    //Puts 9th item on the 16th position
    list.insertBefore(item9, carouselItems[15].nextSibling);
    //Puts 17th item on the 24th position
    list.insertBefore(item17, carouselItems[23].nextSibling);

    // Calculate the new scroll position
    scrollPosition += itemWidth;
    
    // Scroll to the new position with a smooth effect
    carousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

// Function to move the carousel to the left for mobile
function moveLeftMobile() {
    // Update the list of carousel items and the item width
    carouselItems = document.querySelectorAll('.carousel-item');
    itemWidth = carouselItems[0].getBoundingClientRect().width;
    
    // Make the carousel stay in place when manipulating the list
    scrollPosition += itemWidth;
    carousel.scrollLeft = scrollPosition;
    
    let item8 = carouselItems[7];
    let item16 = carouselItems[15];
    let item24 = carouselItems[23];
    //Puts 8th item on the first position
    list.insertBefore(item8, carouselItems[0]);
    //Puts 16th item on the 9th position
    list.insertBefore(item16, carouselItems[8]);
    //Puts 24th item on the 17th position
    list.insertBefore(item24, carouselItems[16]);
    
    // Calculate the new scroll position
    scrollPosition -= itemWidth;
    
    // Scroll to the new position with a smooth effect
    carousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

