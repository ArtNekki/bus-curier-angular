import MediaQuery from '../utils/media';

export const commonSlider = {
  slidesPerView: 1,
  spaceBetween: 15,
  breakpointsInverse: true,
  breakpoints: {
    // [MediaQuery.S]: {
    //   slidesPerView: 2,
    //   spaceBetween: 15
    // },
    [MediaQuery.SM]: {
      slidesPerView: 2,
      spaceBetween: 15
    },
    [MediaQuery.MD]: {
      slidesPerView: 3,
      spaceBetween: 15
    },
    [MediaQuery.LG]: {
      slidesPerView: 4,
      spaceBetween: 30
    }
  }
}
