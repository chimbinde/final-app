window.onload = () => {

   teste();

    var modal = $(".modal-content");
    var body = $(window);
    // Get modal size


  modal.css({
    "position": "absolute",
    "z-index": "10",
  }); 
  var w = modal.width();
  var h = modal.height();
  // Get window size
  var bw = body.width();
  var bh = body.height();

  var left_= (body.width()/2)-(modal.width()/2);
  var top_=(body.height()/2)-(modal.height()/2);
  
  modal.offset({ top: top_, left: left_ });    

}
function teste(){
    //alert("bvfbxbfv2334l");
    let colocacao = '<div class="row" style="">';
    colocacao += '<img style="width:70px; height:70px;margin: 0;';
    colocacao += 'top:'+ Math.max((0, (($(window).height() - $(this).outerHeight()) / 2) +  $(window).scrollTop()) + "px;");
    colocacao += 'left:'+Math.max((0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px;");
    //====
    colocacao += 'position: absolute;top: 50%;left: 50%; margin-right: -50%;transform: translate(-50%, -50%)" src="/img/Spinner.gif">';
    colocacao += '</div>';
    console.log(colocacao);
    $(".divspiner").html(colocacao);
}