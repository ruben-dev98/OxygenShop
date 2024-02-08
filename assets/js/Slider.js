class Slider {

    items;
    countItems;
    classItem;
    classCount;
    classItemActive;
    classCountActive;
    prevButton;
    nextButton;


    constructor(classItem, classCount, classItemActive, classCountActive, classPrev, classNext) {
        this.classItem = classItem;
        this.classCount = classCount;
        
        this.classItemActive = classItemActive;
        this.classCountActive = classCountActive;
        
        this.items = document.querySelectorAll("."+classItem);
        this.countItems = document.querySelectorAll("."+classCount);
        
        this.prevButton = document.querySelector(classPrev);
        this.nextButton = document.querySelector(classNext);

        this.index = 0;
        this.lastIndex = this.items.length - 1;
    }

    slide(target) {
        let itemActive = this.getItemActive();
        let itemCountActive = this.getCountActive();
        this.countItems.forEach((e, i) => {
            this.setItem(itemActive);
            this.setCount(itemCountActive);
            if(target !== undefined) {
                if(e === target) {
                    this.setItemActive(this.items[i]);
                    this.setCountActive(target);
                    this.setIndex(i);
                }
            } else {
                if (e === itemCountActive) {
                    this.setItemActive(this.items[this.index]);
                    this.setCountActive(this.countItems[this.index]);
                }
            }
        });
    }
    
    setItem(elem) {
        elem.setAttribute('class', this.classItem);
    }

    setItemActive(elem) {
        elem.setAttribute('class', `${this.classItem} ${this.classItemActive}`);
    }

    setCount(elem) {
        elem.setAttribute('class', this.classCount);
    }

    setCountActive(elem) {
        elem.setAttribute('class', `${this.classCount} ${this.classCountActive}`)
    }

    getItemActive() {
        return document.querySelector('.'+this.classItemActive);
    }

    getCountActive() {
        return document.querySelector('.'+this.classCountActive);
    }

    setIndex(index) {
        this.index = index;
    }

    prevIndex() {
        if(this.index > 0) {
            this.index -= 1;
        } else {
            this.setIndex(this.lastIndex);
        }
    }

    nextIndex() {
        if(this.index < this.lastIndex) {
            this.index += 1;
        } else {
            this.setIndex(0);
        }
    }

    prev() {
        this.prevButton.addEventListener('click', () => {
            this.prevIndex();
            this.slide(undefined);
        });
    }

    next() {
        this.nextButton.addEventListener('click', () => {
            this.nextIndex();
            this.slide(undefined);
        });
    }

    target() {
        this.countItems[0].parentElement.addEventListener('click', (event) => {
            if (event.target !== this.countItems[0].parentElement &&
                (event.target !== this.prevButton && event.target !== this.nextButton)) {
                let target = event.target;
                this.slide(target);
            }
        });
        
    }
}