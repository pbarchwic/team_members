export class CarouselComponent {

    
    private slider: HTMLElement;
    private isDown: boolean;
    private isDragged: boolean;
    private startX: number;
    private scrollLeft: number;
    private walk: number;

    constructor() {
        this.init(); 
    }

    private init() {
        this.slider = document.querySelector(".slider");
        if (!this.slider) return;
        this.mouseDown();
        this.mouseUp();
        this.mouseMove();
        this.addArrow();
        window.addEventListener('resize', () => {
            this.slideEqualized();
        });
    }

    private mouseDown() : void {
        this.slider.addEventListener("mousedown", (e : MouseEvent) => {
            this.isDown = true;
            this.startX = e.pageX - this.slider.offsetLeft;
            this.scrollLeft = this.slider.scrollLeft;
        });
        this.mouseLeave()
    }
      
    private mouseLeave() : void {
        this.slider.addEventListener("mouseleave", () => this.isDown = false);
    }
      
    private mouseUp() : void {
        this.slider.addEventListener("mouseup", (e : MouseEvent) => {
            this.isDown = false;
            this.isDragged =  false;
            this.slideEqualized();
        });
    }
      
    private mouseMove() : void {
        this.slider.addEventListener("mousemove", (e : MouseEvent) => {
            if (!this.isDown) return;
            const x = e.pageX - this.slider.offsetLeft;
            this.isDragged =  true;
            e.preventDefault();
            this.walk = (x - this.startX) * 2;
            this.slider.scrollLeft = this.scrollLeft - this.walk;
        });
    }
   
    private addArrow() : void {
        const arrows = `<button class='arrows prev'></button>
                        <button class='arrows next'></button>`;
        this.slider.insertAdjacentHTML('afterend', arrows);
        this.arrowMove();
    }

    private arrowMove() : void {
        const arrows = document.querySelectorAll(".arrows");
        let scrollLeftPosition: number;
        this.scrollLeft = 0;
        arrows.forEach((arrow: Element) => {
            arrow.addEventListener('click', (e: Event) => {
                const sliderWidth:number = this.sliderWidth();
                const isTargetNextArrow = (<HTMLElement>e.target).classList.contains('next')
                const itemWidth = (<HTMLElement>document.querySelector('.member')).offsetWidth;
                scrollLeftPosition = isTargetNextArrow ? this.scrollLeft + itemWidth : this.scrollLeft - itemWidth;
                scrollLeftPosition < 0  || scrollLeftPosition > sliderWidth ? scrollLeftPosition = 0 : null;
                this.smoothScrolling(scrollLeftPosition);
            })
        })
    }

    private smoothScrolling(scrollLeft: number) : void {
        this.slider.scroll({
            left: scrollLeft,
            behavior: "smooth",
        });
        this.scrollLeft = scrollLeft;
    }

    private sliderWidth() : number {
        const sliderLastChild = <HTMLElement>this.slider.lastElementChild;
        return sliderLastChild.offsetLeft + sliderLastChild.offsetWidth - this.slider.offsetWidth + 10;
    }

    private slideEqualized() : void {
        const slidesArray = Array.prototype.slice.call(document.querySelectorAll('.member'));
        for(let i = 0; i < slidesArray.length; i++){
            let prevElOffsetRight = slidesArray[i].offsetLeft 
            let nextElOffsetRight = i < slidesArray.length - 1 ? slidesArray[i+1].offsetLeft : null
            let sectionMove : boolean = prevElOffsetRight < this.slider.scrollLeft 
                                            && this.slider.scrollLeft < nextElOffsetRight;

            if (sectionMove) this.smoothScrolling( this.walk < 0 ? nextElOffsetRight : prevElOffsetRight );
        }
    }
}