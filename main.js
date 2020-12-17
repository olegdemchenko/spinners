  import { MakeAnimation, animationsStorage } from './animations';

  const getCookie = (name) => {
    const cookies = document.cookie.split(/;\s?/).map((cookie) => cookie.trim().split(/\s?=\s?/));
    const [, value] = cookies.find(([cookieName]) => cookieName === name) || [];
    return value || '';
  };

  const setCookie = (name, value) => {
    document.cookie = `${name}=${value}; max-age=${3600 * 24 * 365 * 10}`;
  }


  const createMessage = (prevTime, currTime) => {
    const diffTime = new Date(currTime - prevTime);
    let phrase = 'Your last visit was';
    const yearsLast = diffTime.getUTCFullYear() - 1970;
    switch (true) {
      case yearsLast > 0: {
        phrase = `${phrase} ${yearsLast} years ago`;
        break;
      }
      case diffTime.getUTCMonth() > 0: {
        phrase = `${phrase} ${diffTime.getUTCMonth()} months ago`;
        break;
      }
      case diffTime.getUTCDate() - 1 > 0: {
        phrase = `${phrase} ${diffTime.getUTCDate() - 1} days ago`;
        break;
      }
      case diffTime.getUTCHours() > 0: {
        phrase = `${phrase} ${diffTime.getUTCHours()} hours ago`;
        break;
      }
      case diffTime.getMinutes() > 0: {
        phrase = `${phrase} ${diffTime.getMinutes()} minutes ago`;
        break;
      }
      case diffTime.getSeconds() > 0: {
        phrase = `${phrase} ${diffTime.getUTCMonth()} seconds ago`;
        break;
      }
      default:
        phrase = '';
        break;
    }
    return phrase;
  };

  const intervalsId = {
    preview: null,
    title: null,
  };

  const messageField = document.querySelector('.message');
  const spinnersBar = document.getElementById('spinnersBar');
  const screen = document.querySelector('.screen');
  const titleSpinner = document.querySelector('.title-spinner');

  const mountAnimation = (animationData, container) => {
    const animation = new MakeAnimation(animationData);
    const id = setInterval(() => {
      const slide = animation.getNextSlide();
      console.clear();
      console.log(slide);
      if (container === 'title') {
        document.title = slide;
      } else {
        container.textContent = slide;
      }
    }, 1000);
    return id;
  }

  const stopTimers = (store) => Object.values(store).forEach((id) => clearInterval(id));

  document.addEventListener('DOMContentLoaded', () => {
    const lastVisited = getCookie('lastVisited');
    if (lastVisited === '') {
      messageField.textContent = 'It is your first time';
    } else {
      const message = createMessage(lastVisited, Date.now());
      messageField.textContent = message;
    }
    setCookie('lastVisited', Date.now());
  });

  document.addEventListener('DOMContentLoaded', () => {
    const animationNumb = getCookie('animation');
    let newTitleId;
    if (animationNumb === '') {
      newTitleId = mountAnimation(animationsStorage[1], 'title');
    } else {
      newTitleId = mountAnimation(animationsStorage[animationNumb], 'title');
    }
    intervalsId.title = newTitleId;
  });

  spinnersBar.addEventListener('input', (e) => {
    const { value } = e.target;
    stopTimers(intervalsId);
    const newPreviewId = mountAnimation(animationsStorage[value], screen);
    const newTitleId = mountAnimation(animationsStorage[value], 'title');
    intervalsId.preview = newPreviewId;
    intervalsId.title = newTitleId;
    setCookie('animation', value);
  });