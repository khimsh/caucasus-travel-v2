'use strict'

const swiper = new Swiper('.tour-slider', {
    // Optional parameters
    loop: true,
    slidesPerView: 'auto',

    // Navigation arrows
    navigation: {
        nextEl: '.tour-slide-next',
        prevEl: '.tour-slide-prev',
    },
})

;(function () {
    function mapImages() {
        if (!document.querySelector('.tour-maps')) {
            return
        }

        const mapImageReferences = document.querySelectorAll('[data-reference]')
        const mapImages = [...document.querySelectorAll('[data-image]')]

        mapImageReferences.forEach((reference) => {
            reference.addEventListener('click', () => {
                mapImages.forEach((image) => {
                    image.classList.remove('active')
                })

                const imageRef = reference.dataset.reference
                const image = mapImages.find((image) => {
                    return image.dataset.image === imageRef
                })

                image.classList.add('active')
            })

            reference.addEventListener('mouseenter', () => {
                mapImages.forEach((image) => {
                    image.classList.remove('active')
                })

                const imageRef = reference.dataset.reference
                const image = mapImages.find((image) => {
                    return image.dataset.image === imageRef
                })

                image.classList.add('active')
            })
        })
    }

    mapImages()
})()
