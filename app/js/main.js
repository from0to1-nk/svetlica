const projectSwiper = new Swiper(".projectSwiper", {
    enabled: true

});
const projectInfoSwiper = new Swiper(".projectInfoSwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
        el: ".swiper-pagination",
    },
    navigation: {
        nextEl: '.projectInfoSwiper__button-next',
        prevEl: '.projectInfoSwiper__button-prev',
    },

});
projectSwiper.controller.control = projectInfoSwiper;
projectInfoSwiper.controller.control = projectSwiper;


const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(en => {
        if (en.isIntersecting) {
            let coordinats = en.target.getBoundingClientRect().top - 100;
            window.scrollBy({
                top: coordinats,
                behavior: 'smooth'
            });
        }
    })
}, {
    threshold: 0.15
});

// document.querySelectorAll('.anchor').forEach(el => observer.observe(el));
$(function () {
    $(".menu-icon").on("click", function () {
        $(".header__main-menu").slideToggle();

    });

    $(".menu__arrow").on('click', function () {
        if ($(this).parent('.header-menu__link').has('.header-submenu')) {
            $(this).next().slideToggle(150)
        }
    });

})


function fixedHeader(windowInnerWidth) {
    let header = document.querySelector('#header');
    if (!header.classList.contains('fixed')) {

        window.addEventListener('scroll', function () {
            let scrollTop = window.pageYOffset;
            if (scrollTop > 0) {
                header.classList.add('fixed');
                document.querySelector('body').style.paddingTop = '100px'
            } else {
                header.classList.remove('fixed');
                document.querySelector('body').style.paddingTop = '0px'
            }
        })

    }
}
fixedHeader()

function windowSize() {
    const windowInnerWidth = window.innerWidth;
    if (windowInnerWidth > 992) {
        document.querySelectorAll('.anchor').forEach(el => observer.observe(el));
    }
}


window.addEventListener('load', windowSize);
window.addEventListener('resize', windowSize)