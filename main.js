$(document).ready(function(){

    $('#menu').click(function(){
        $(this).toggleClass('fa-times')
        $('header').toggleClass('toggle');
    });


    $(window).on('scroll load',function(){
        $('#menu').removeClass('fa-times')
        $('header').removeClass('toggle')

        if($(window).scrollTop() > 0){
            $('.top').show();
        }else{
            $('.top').hide();
    
        }
    });

    //smooth scrolling

    $('a[href*="#"]').on('click',function(e){
        e.preventDefault();

        $('html, body').animate({
            scrollTop : $($(this).attr('href')).offset().top,
        },
        500,
        "linear"
        );
    });
});

const number = document.querySelector(".counter1")

let num = 0
function counter() {
  const counterInterval = setInterval(() => {
    num += 1
    number.textContent = num
    if (num === 100) {
    clearInterval(counterInterval)
    $('.counter1').addClass('hide')
    $('.preloader').addClass('active')

    //to show scrollbar when it rech 100%
    function HideScrollbar() {
        var style = document.createElement("style");
        style.innerHTML = `html {overflow: visible}`;
        document.head.appendChild(style);
        }
    }else{
// to hide scrollbar when it be 0%
        function HideScrollbar() {
            var style = document.createElement("style");
            style.innerHTML = `html {overflow: hidden}`
            document.head.appendChild(style);
            }
    }
    HideScrollbar()
   
  }, 10) 
}
counter()



document.querySelector('body').addEventListener('mousemove', eyeball)
function eyeball(){
    const eye = document.querySelectorAll('.eye');
    eye.forEach(function(eye){
        let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
        let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);
    
        let radian = Math.atan2(event.pageX - x, event.pageY - y );
        let rotation = (radian * (180 / Math.PI) * -1) + 270 ;
        eye.style.transform =  "rotate("+rotation+"deg)"
    })
}