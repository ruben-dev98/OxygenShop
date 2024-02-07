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
        }
    }

    nextIndex() {
        if(this.index < this.lastIndex) {
            this.index += 1;
        }
    }

    prev() {
        this.prevButton.addEventListener('click', () => {
            let itemActive = this.getCountActive();
            this.countItems.forEach((e, i) => {
                if (e === itemActive) {
                    this.prevIndex();

                    this.setItem(this.items[i]);
                    this.setCount(e);
                    
                    this.setItemActive(this.items[this.index]);
                    this.setCountActive(this.countItems[this.index]);
                }
            });
        });
    }

    next() {
        this.nextButton.addEventListener('click', () => {
            let itemActive = this.getCountActive();
            this.countItems.forEach((e, i) => {
                if (e === itemActive) {
                    this.nextIndex();

                    this.setItem(this.items[i]);
                    this.setCount(e);

                    this.setItemActive(this.items[this.index]);
                    this.setCountActive(this.countItems[this.index]);
                }
            });
        });
    }

    target(target) {
        let itemActive = this.getItemActive();
        let itemCountActive = this.getCountActive();
        this.countItems.forEach((e, i) => {
        if(e === target) {
            this.setItem(itemActive);
            this.setCount(itemCountActive);

            this.setItemActive(this.items[i]);
            this.setCountActive(target);

            this.setIndex(i);
        }
    });
    }
}