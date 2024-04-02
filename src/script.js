$(document).ready(function() {
    let list = document.querySelector('.event-item-list');
    let items = document.querySelectorAll('.event-item');

    let prevButton = document.getElementById('prev');
    let nextButton = document.getElementById('next');

    let itemWidth = 60;
    let currentPosition = 0;

    if (768 <= window.innerWidth <= 1023) {

    } else if (1024 <= window.innerWidth) {

    } else {
        prevButton.addEventListener('click', () => {
            list.style.transform = `none`;
        
            // Move the last 3 items to the start of the list
            for (let i = -1; i <= -5; i-=2) {
                let item = items[i];
                list.removeChild(item);
                list.prepend(item);
            }

             // Adjust the lists so they dont move when moving items
            let currentLeft = list.style.left ? parseInt(list1.style.left) : -60;
            currentLeft -= 60;
            list1.style.left = `${currentLeft}px`;
        });
    }

    prevButton.addEventListener('click', () => {
        currentPosition += itemWidth;

        // Temporarily disable the transition
        list1.style.transition = 'none';
        list2.style.transition = 'none';

        // Move the last item to the start of the list
        let lastItem1 = list1.lastElementChild;
        list1.removeChild(lastItem1);
        list1.prepend(lastItem1);

        let lastItem2 = list2.lastElementChild;
        list2.removeChild(lastItem2);
        list2.prepend(lastItem2);

        // Adjust the lists so they dont move when moving items
        let currentLeft = list1.style.left ? parseInt(list1.style.left) : -60;
        currentLeft -= 60;
        list1.style.left = `${currentLeft}px`;
        list2.style.left = `${currentLeft}px`;

        // Force a reflow (this is needed to make the transition work correctly)
        void list1.offsetWidth;
        void list2.offsetWidth;

        // Re-enable the transition
        list1.style.transition = '';
        list2.style.transition = '';

        list1.style.transform = `translateX(${currentPosition}px)`;
        list2.style.transform = `translateX(${currentPosition}px)`;
    });
    
    nextButton.addEventListener('click', () => {
        currentPosition -= itemWidth;
        
        // Temporarily disable the transition
        list1.style.transition = 'none';
        list2.style.transition = 'none';

        // Move the first item to the end of the list
        let firstItem1 = list1.firstElementChild;
        list1.removeChild(firstItem1);
        list1.append(firstItem1);

        let firstItem2 = list2.firstElementChild;
        list2.removeChild(firstItem2);
        list2.append(firstItem2);

        // Adjust the lists so they dont move when moving items
        let currentLeft = list1.style.left ? parseInt(list1.style.left) : -60;
        currentLeft += 60;
        list1.style.left = `${currentLeft}px`;
        list2.style.left = `${currentLeft}px`;

        // Force a reflow (this is needed to make the transition work correctly)
        void list1.offsetWidth;
        void list2.offsetWidth;

        // Re-enable the transition
        list1.style.transition = '';
        list2.style.transition = '';
        
        list1.style.transform = `translateX(${currentPosition}px)`;
        list2.style.transform = `translateX(${currentPosition}px)`;
    });
});