$(document).ready(() => {
  $(".img1").click(function(){
    $(".img1").fadeOut();
  });
});


function onClickButton(pickupEvent){
	pickupEvent.preventDefault();
}

