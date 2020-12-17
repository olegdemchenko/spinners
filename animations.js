  class MakeAnimation {
    constructor({ slides, getNextSlide }) {
      this.point = 0;
      this.slides = slides.slice();
      if (getNextSlide) {
        this.getNextSlide = getNextSlide;
      }
    }

    getNextSlide() {
      const slide = this.slides[this.point];
      this.point = (this.point + 1) % this.slides.length;
      return slide;
    }
  };

  const animationsStorage = {
    1: {
      slides: ['▖   ', '▖ ▖  ', '▖ ▖ ▖'],
    },
    2: {
      slides: ['●   ', ' ●  ', '  ● ', '   ●'],
      getNextSlide() {
        const str = `(${this.slides[this.point]})`;
        if (this.point === this.slides.length - 1) {
          this.slides = this.slides.reverse();
          this.point = 1;
        } else {
          this.point += 1;
        }
        return str;
      }
    },
    3: {
      slides: '─╲│╱',
    },
    4: {
      slides: '┛┻┗┣┳┓',
    },
    5: {
      slides: '☱☲☴',
    },
    6: {
      slides: ['▂', '▅', '▆', '▇', '█', '▇', '▆', '▅', '▂'],
    },
    7: {
      slides: '⠁⠂⠄⠂',
    },
    8: {
      slides: '◣◤◥',
    },
    9: {
      slides: '◰◳◱',
    },
    10: {
      slides: ['   =', '  ==', ' ===', '===='],
      getNextSlide() {
        const str = `[${this.slides[this.point]}]`;
        if (this.point === this.slides.length - 1) {
          this.slides = this.slides.map((slide) => slide.split('').reverse().join('')).reverse();
          this.point = 0;
        } else {
          this.point += 1;
        }
        return str;
      }
    }
  };
  export { MakeAnimation, animationsStorage };