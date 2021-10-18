$("#side-menu li").click(function(){
    console.log(1);
    $("#side-menu li ul").removeClass("openmenu");
    $(this).addClass("activemenu");
    $(this).children("ul").addClass("openmenu");
});