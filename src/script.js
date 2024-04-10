$(document).ready(function() {
    let carousel = document.querySelector('.slider-container');
    let list = document.querySelector('.event-item-list');
    let items = document.querySelectorAll('.carousel-item');

    let prevButton = document.getElementById('prev');
    let nextButton = document.getElementById('next');
    let isMoving = false;

    let itemWidth = items[0].getBoundingClientRect().width;
    let scrollPosition = -itemWidth;

    carousel.style.transition = '';
    carousel.style.transform = `translateX(${scrollPosition}px)`;

    adjustImageAndListItemSize();

    // Event listener for adjusting scroll position and event listeners, when the window is resized
    window.addEventListener('resize', adjustImageAndListItemSize);

    // Automatic rotation
    let carouselInterval = setInterval(autoMoveCarousel, 2000);
    let carouselDirection = "right";

    // Swipe functionality variables
    let startX;
    let touchEndX;
    let threshold = 100; // Minimum swipe distance, adjust as needed

    function autoMoveCarousel() {
        if (carouselDirection === "right")
            if (window.innerWidth < 641) {
                moveRightMobile();
            } else {
                moveRightDesktop();
            }
        else 
            if (window.innerWidth < 641) {
                moveLeftMobile();
            } else {
                moveLeftDesktop();
            }
    }

    function adjustImageAndListItemSize() {
        // Get the list items
        carouselItems = document.querySelectorAll('.carousel-item');
        let outerContainer = document.querySelector('.outer-slider-container');

        // Calculate the width of the window and the width of the carousel
        let outerContainerWidth = document.querySelector('.grid-container').clientWidth;
        let carouselWidth = Math.floor(outerContainerWidth / 12) * 12;

        // Set the width and margin of the carousel
        carousel.style.width = `${carouselWidth}px`;
        outerContainer.style.width = `${carouselWidth}px`;

        if (window.innerWidth < 641) 
            itemWidth = Math.round(carouselWidth / 2);
        else if (window.innerWidth < 1024) 
            itemWidth = Math.round(carouselWidth / 4);
        else 
            itemWidth = Math.round(carouselWidth / 6); // Change this to the number of items you want to display at a time
            
        // Set the width of the images and list items
        carouselItems.forEach(item => {
            item.style.width = `${itemWidth}px`;
        });

        windowResizeHandler();
    }

    //Function that handles resizing of the window
    function windowResizeHandler() {
        adjustScroll();
        updateEventListeners();
    }

    // Function to adjust scroll position
    function adjustScroll() {
        items = document.querySelectorAll('.carousel-item');
        // itemWidth = items[0].getBoundingClientRect().width;
        itemWidth = items[0].getBoundingClientRect().width;
        // Checks if itemWidth is different from scrollPosition (if it is, it means the window was resized)
        if (Math.abs(scrollPosition) !== Math.abs(itemWidth)) {
            scrollPosition += scrollPosition + itemWidth;
            // Update the scroll position
            carousel.style.transition = '';
            carousel.style.transform = `translateX(${scrollPosition}px)`;
        } 
    }

    // Function to update the event listeners for the arrows
    function updateEventListeners() {
        carousel.removeEventListener('touchstart', handleTouchEvent);
        carousel.removeEventListener('touchmove', handleTouchEvent);
        carousel.removeEventListener('touchend', handleTouchEvent);
        
        prevButton.removeEventListener('click', moveLeftMobile);
        nextButton.removeEventListener('click', moveRightMobile);
        prevButton.removeEventListener('click', moveLeftDesktop);
        nextButton.removeEventListener('click', moveRightDesktop);

        if (window.innerWidth < 641) {
            // Setup Mobile EventListeners
            carousel = document.querySelector('.slider-container');
            carousel.addEventListener('touchstart', handleTouchEvent)
            carousel.addEventListener('touchmove', handleTouchEvent);
            carousel.addEventListener('touchend', handleTouchEvent);
        } else { //Sets up table/desktop EventListeners
            prevButton.addEventListener('click', moveLeftDesktop);
            nextButton.addEventListener('click', moveRightDesktop);
        }
    }

    // Function to move the carousel to the right
    function moveRightDesktop() {
        if (isMoving) return

        isMoving = true;

        // Update the list of carousel items and the item width
        items = document.querySelectorAll('.carousel-item');
        itemWidth = items[0].getBoundingClientRect().width;

        let item1 = items[0];
        let item13 = items[12];
        //Puts the first item on the 12th position
        list.insertBefore(item1, items[11].nextSibling);
        //Puts 13th item on the 24th position
        list.insertBefore(item13, items[23].nextSibling);

        // Adjust the lists so they dont move when moving items
        // Temporarily disable the transition
        carousel.style.transition = 'none';
        scrollPosition += itemWidth;
        carousel.style.transform = `translateX(${scrollPosition}px)`

        scrollPosition -= itemWidth;

        // Force a reflow (this is needed to make the transition work correctly)
        void carousel.offsetWidth;

        // Re-enable the transition
        carousel.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.transform = `translateX(${scrollPosition}px)`;

        setTimeout(() => {
            isMoving = false;
        }, 500);
        
        // Resets carousel timer and change carousel direction
        carouselDirection = "right";
        clearInterval(carouselInterval);
        carouselInterval = setInterval(autoMoveCarousel, 2000);
    }

    // Function to move the carousel to the left    
    function moveLeftDesktop() {
        if (isMoving) return

        isMoving = true;

        // Update the list of carousel items and the item width
        items = document.querySelectorAll('.carousel-item');
        itemWidth = items[0].getBoundingClientRect().width;
        
        let item12 = items[11];
        let item24 = items[23];
        //Puts 12th item on the first position
        list.insertBefore(item12, items[0]);
        //Puts 24th item on the 13th position
        list.insertBefore(item24, items[12]);
        
        // Adjust the lists so they dont move when moving items
        // Temporarily disable the transition
        carousel.style.transition = 'none';
        scrollPosition -= itemWidth;
        carousel.style.transform = `translateX(${scrollPosition}px)`

        scrollPosition += itemWidth;

        // Force a reflow (this is needed to make the transition work correctly)
        void carousel.offsetWidth;

        // Re-enable the transition
        carousel.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.transform = `translateX(${scrollPosition}px)`;


        setTimeout(() => {
            isMoving = false;
        }, 500);

        // Resets carousel timer and change carousel direction
        carouselDirection = "left";
        clearInterval(carouselInterval);
        carouselInterval = setInterval(autoMoveCarousel, 2000);
    }

    // Function to move the carousel to the right for mobile
    function moveRightMobile() {
        if (isMoving) return

        isMoving = true;

        // Update the list of carousel items and the item width
        items = document.querySelectorAll('.carousel-item');
        itemWidth = items[0].getBoundingClientRect().width;

        let item1 = items[0];
        let item9 = items[8];
        let item17 = items[16];
        //Puts the first item on the 8th position
        list.insertBefore(item1, items[7].nextSibling);
        //Puts 9th item on the 16th position
        list.insertBefore(item9, items[15].nextSibling);
        //Puts 17th item on the 24th position
        list.insertBefore(item17, items[23].nextSibling);

        // Adjust the lists so they dont move when moving items
        // Temporarily disable the transition
        carousel.style.transition = 'none';
        scrollPosition += itemWidth;
        carousel.style.transform = `translateX(${scrollPosition}px)`

        // Calculate the new scroll position
        scrollPosition -= itemWidth;

        // Force a reflow (this is needed to make the transition work correctly)
        void carousel.offsetWidth;

        // Re-enable the transition
        carousel.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.transform = `translateX(${scrollPosition}px)`;

        setTimeout(() => {
            isMoving = false;
        }, 500);

        // Resets carousel timer and change carousel direction
        carouselDirection = "right";
        clearInterval(carouselInterval);
        carouselInterval = setInterval(autoMoveCarousel, 2000);
    }

    // Function to move the carousel to the left for mobile
    function moveLeftMobile() {
        if (isMoving) return

        isMoving = true;
        
        // Update the list of carousel items and the item width
        items = document.querySelectorAll('.carousel-item');
        itemWidth = items[0].getBoundingClientRect().width;
        
        let item8 = items[7];
        let item16 = items[15];
        let item24 = items[23];
        //Puts 8th item on the first position
        list.insertBefore(item8, items[0]);
        //Puts 16th item on the 9th position
        list.insertBefore(item16, items[8]);
        //Puts 24th item on the 17th position
        list.insertBefore(item24, items[16]);
        

        // Adjust the lists so they dont move when moving items
        // Temporarily disable the transition
        carousel.style.transition = 'none';
        scrollPosition -= itemWidth;
        carousel.style.transform = `translateX(${scrollPosition}px)`

        // Calculate the new scroll position
        scrollPosition += itemWidth;

        // Force a reflow (this is needed to make the transition work correctly)
        void carousel.offsetWidth;

        // Re-enable the transition
        carousel.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.transform = `translateX(${scrollPosition}px)`;

        setTimeout(() => {
            isMoving = false;
        }, 500);

        // Resets carousel timer and change carousel direction
        carouselDirection = "left";
        clearInterval(carouselInterval);
        carouselInterval = setInterval(autoMoveCarousel, 2000);
    }

    function handleTouchEvent(e) {
        switch (e.type) {
            case 'touchstart':
                startX = e.touches[0].pageX;
                break;
            case 'touchmove':
                touchEndX = e.touches[0].pageX;
                break;
            case 'touchend':
                if (Math.abs(startX - touchEndX) > threshold) {
                    if (startX > touchEndX) {
                        moveRightMobile();
                    } else {
                        moveLeftMobile();
                    }
                }
                break;
        }
    }

});