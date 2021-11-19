const universitiesSwiper = new Swiper(".universities-slider", {
    pagination: {
        el: ".universities-pagination",
        clickable: true,
    },

    watchOverflow: true,

    slidesPerView: 1,
    slidesPerGroup: 1,

    breakpoints: {
        800: {
            slidesPerView: 2,
            slidesPerGroup: 1,
        },
        1200: {
            slidesPerView: 4,
            slidesPerGroup: 4,
        },
    },
});

const countriesSwiper = new Swiper(".events__swiper", {
    // navigation: {
    //     nextEl: ".events-button-next",
    //     prevEl: ".events-button-prev",
    // },

    pagination: {
        el: ".events-pagination",
        clickable: true,
    },

    watchOverflow: true,

    slidesPerView: 1,
    slidesPerGroup: 1,

    breakpoints: {
        1000: {
            slidesPerView: 2,
            slidesPerGroup: 1,
        },
    },
});

const eventsSwiper = new Swiper(".coutries__swiper", {
    // navigation: {
    //     nextEl: ".countries-button-next",
    //     prevEl: ".countries-button-prev",
    // },

    pagination: {
        el: ".countries-pagination",
        clickable: true,
    },

    watchOverflow: true,
    simulateTouch: true,
    touchRatio: 1,

    slidesPerView: 1,
    slidesPerGroup: 1,

    breakpoints: {
        800: {
            slidesPerView: 2,
            slidesPerGroup: 1,
        },
        1200: {
            slidesPerView: 3,
            slidesPerGroup: 1,
        },
    },
});

const testimonialSwiper = new Swiper(".testimonial-swiper", {
    // navigation: {
    //     nextEl: ".countries-button-next",
    //     prevEl: ".countries-button-prev",
    // },

    pagination: {
        el: ".testimonial-pagination",
        clickable: true,
    },

    watchOverflow: true,
    simulateTouch: true,
    touchRatio: 1,

    slidesPerView: 1,
    slidesPerGroup: 1,

    breakpoints: {
        800: {
            slidesPerView: 2,
            slidesPerGroup: 1,
        },
    },
});

const iconMenu = document.querySelector(".menu__icon");
const headerBtn = document.querySelector(".header__btn");

if (iconMenu) {
    const bodyMenu = document.querySelector(".menu__body");
    iconMenu.addEventListener("click", (e) => {
        document.body.classList.toggle("_lock");
        iconMenu.classList.toggle("menu__icon_active");
        bodyMenu.classList.toggle("menu__body_active");
        headerBtn.classList.toggle("header__btn_active-menu");
    });

    window.addEventListener("scroll", function () {
        document.body.classList.remove("_lock");
        iconMenu.classList.remove("menu__icon_active");
        bodyMenu.classList.remove("menu__body_active");
        headerBtn.classList.remove("header__btn_active-menu");
    });
}
