
//slider

let slideIndex = 1;
showSlides(slideIndex);

function plusSlide() {
    showSlides(slideIndex += 1);
}

function minusSlide() {
    showSlides(slideIndex -= 1);  
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}
    
function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("clients__slide");

    if (n > slides.length) {
        slideIndex = 1
    } 
    if (n < 1) {
        slideIndex = slides.length
    } 

    for(i=0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    

    slides[slideIndex-1].style.display = "block";
}


//accordion

const accordionItems = document.querySelectorAll('.how__item');


accordionItems.forEach((elem) => {
    elem.addEventListener('click', function() {
        let parentElem = this.parentNode;
        let textelem = parentElem.querySelector('.how__text')
        let arrow = document.querySelector('.arrow');
        if(textelem.classList.contains("active")) {
            textelem.classList.remove('active');
        }
        else {
            textelem.classList.add('active');
        }
    })
})
