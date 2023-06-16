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

                displayTextOnMap(reference, mapImages)
            })

            reference.addEventListener('mouseenter', () => {
                mapImages.forEach((image) => {
                    image.classList.remove('active')
                })

                displayTextOnMap(reference, mapImages)
            })
        })

        // Remove day plan text and revert back to first image
        // if the user has left the agenda container
        const mapAgenda = document.querySelector('.tour-agenda')

        mapAgenda.addEventListener('mouseleave', () => {
            // Reset image to the first image
            mapImages.forEach((image) => {
                image.classList.remove('active')
            })
            const image = [...document.querySelectorAll('[data-image]')][0]
            image.classList.add('active')

            removeDayPlanFromMap()
        })
    }

    mapImages()

    function displayTextOnMap(ref, images) {
        const dayNumber = ref.querySelector('.tour-day').textContent
        const dayPlan = ref.querySelector('p > strong').textContent
        const textOnMap = `${dayNumber} ${dayPlan}`
        const imageRef = ref.dataset.reference
        const image = images.find((image) => {
            return image.dataset.image === imageRef
        })

        image.appendChild(displayDayAgendaOnMap(textOnMap))
        image.classList.add('active')
    }

    function displayDayAgendaOnMap(text) {
        removeDayPlanFromMap()

        // Create day plan text
        const el = document.createElement('div')
        el.classList.add('day-plan')
        el.innerHTML = text
        return el
    }

    // Remove existing day plan from map
    function removeDayPlanFromMap() {
        const existingDayPlan = document.querySelector('.day-plan')
        if (existingDayPlan) {
            existingDayPlan.remove()
        }
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

            const cardImage = card.querySelector('.tour-card__image--hoverable')

            cardImage.addEventListener('mouseenter', (e) => {
                const tourDetails = card.querySelector('.tour-card__details')
                const tourDetailsHeight = tourDetails.scrollHeight
                card.classList.add('active')

                if (card.classList.contains('active')) {
                    tourDetails.style.height = tourDetailsHeight + 'px'
                } else {
                    tourDetails.style.height = 0
                }
            })

            cardImage.addEventListener('mouseleave', (e) => {
                const tourDetails = card.querySelector('.tour-card__details')
                const tourDetailsHeight = tourDetails.scrollHeight
                card.classList.remove('active')

                if (card.classList.contains('active')) {
                    tourDetails.style.height = tourDetailsHeight + 'px'
                } else {
                    tourDetails.style.height = 0
                }
            })
        })
    }

    tourDetails()

    // Change images on scroll
    function changeImagesOnScroll() {
        if (!document.querySelector('.scrollable-image')) return

        const scrollElement = document.querySelector('.scrollable-image > img')
        const imageSources = Array.from(
            document.querySelectorAll('.image-sources img')
        ).map((image) => image.src)

        const heightOfScrollElement =
            document.querySelector('.scroll-component').scrollHeight

        const numberOfImagesToShow = imageSources.length // რამდენჯერ გვინდა სურათის შეცვლა
        const imageChangeSpeed = heightOfScrollElement / numberOfImagesToShow

        // console.log(imageChangeSpeed)

        window.addEventListener('scroll', () => {
            // console.log(window.scrollY)
            // for (let i = 1; i < numberOfImagesToShow; i++) {
            //     console.log(i)
            //     console.log(i * imageChangeSpeed)
            // }
        })
    }

    changeImagesOnScroll()
})()
