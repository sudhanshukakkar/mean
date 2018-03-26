$(document).ready(function () {
//    var j=0;
//    var i;
//    
////while(true){
//    slider();
////}
//    
//    function slider(){
        
//        if(j > sliderImage.length){
//            j=1;
//        }        
//        for(i=0; i<sliderImage.length; i++){
//            sliderImage[i].style.display = "none";
////            console.log((sliderImage[i]));
//        }       
//        
//        sliderImage[i].style.display = "block";
//        j = j + 1; 
//        slider();
//    }

    var j =0 ;
    var sliderImage = document.querySelectorAll(".sliderImage");    
    
    $abc = $(".sliderImage");
    
    slider();
    
    function slider(){
        
        if(j>=sliderImage.length){
            j = 0;
        }
        
        for(let i=0; i<sliderImage.length; i++){
            if(i==j){
                sliderImage[i].classList.remove('disNone');
            }
            else{
                sliderImage[i].classList.add('disNone');
            }
        }
        
//        $abc.each(function(i){
//            if(i==j){
//                $($abc[i].class).removeClass('disNone').fadeIn(3000);
//                console.log($abc[i].class);
//            }
//            else{
//                $($abc[i].class).addClass('disNone');
//                console.log($abc[i].class);
//            }
//        });
        
        j = j + 1;
        
        setTimeout(slider,3000);
        
    }
    
    
});