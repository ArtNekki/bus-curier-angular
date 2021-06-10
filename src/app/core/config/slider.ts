 export const indexSlider = {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpointsInverse: true,
  updateOnImagesReady: true,
  // autoplay: {
  //   delay: 2000,
  //   stopOnLastSlide: false,
  //   disableOnInteraction: true
  // },
  // loop: true,
  breakpoints: {
    // ['576']: {
    //   slidesPerView: 2,
    //   spaceBetween: 14
    // },
    ['768']: {
      slidesPerView: 1,
      spaceBetween: 14
    }
  },
  pagination: {
    el: '#index-pagination',
    clickable: true,
    dynamicBullets: true
  },
  navigation: {
    nextEl: '#index-button-prev',
    prevEl: '#index-button-next',
  },
};
