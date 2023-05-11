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
    // Change Map Images on hover/click
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

                const dayPlan = reference.querySelector('p > strong').textContent
                const imageRef = reference.dataset.reference
                const image = mapImages.find((image) => {
                    return image.dataset.image === imageRef
                })

                image.appendChild(displayDayAgendaOnMap(dayPlan))
                image.classList.add('active')
            })

            reference.addEventListener('mouseenter', () => {
                mapImages.forEach((image) => {
                    image.classList.remove('active')
                })

                const dayPlan = reference.querySelector('p > strong').textContent
                const imageRef = reference.dataset.reference
                const image = mapImages.find((image) => {
                    return image.dataset.image === imageRef
                })

                image.appendChild(displayDayAgendaOnMap(dayPlan))
                image.classList.add('active')
            })
        })
    }

    mapImages()

    function displayDayAgendaOnMap(text) {
        const el = document.createElement('div')
        el.classList.add('day-plan')
        el.innerHTML = text
        return el
    }

    // Open/Close Tour Details
    function tourDetails() {
        if (!document.querySelector('.tour-card')) {
            return
        }

        const tourCards = [...document.querySelectorAll('.tour-card')]

        tourCards.forEach((card) => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('tour-card-action')) {
                    return
                }

                const tourDetails = card.querySelector('.tour-card__details')
                const tourDetailsHeight = tourDetails.scrollHeight
                card.classList.toggle('active')

                if (card.classList.contains('active')) {
                    tourDetails.style.height = tourDetailsHeight + 'px'
                } else {
                    tourDetails.style.height = 0
                }
            })
        })
    }

    tourDetails()
})()
