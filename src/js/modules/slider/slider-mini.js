import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }

        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }


    bindTrigger() {
        this.next.addEventListener('click', () => {
            for (let i = 0; i < this.slides.length; i++) {
                if (this.slides[i].tagName !== 'BUTTON') {
                    if (this.slides[i+1].tagName == 'BUTTON') {
                        this.container.append(this.slides[i+1]);
                    }
                    let active = this.slides[i];
                    this.container.append(active);
                    this.decorizeSlides();
                    break;
                } else {
                    this.container.append(this.slides[0]);
                    this.container.append(this.slides[1]);
                }
            }
        });

        this.prev.addEventListener('click', () => {

            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== "BUTTON") {
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            }
        });
    }

    init() {
        try {
            this.container.style.cssText = `
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                align-items: flex-start;
            `;

            this.bindTrigger();
            this.decorizeSlides();
        } catch(e) {}
    }
}
