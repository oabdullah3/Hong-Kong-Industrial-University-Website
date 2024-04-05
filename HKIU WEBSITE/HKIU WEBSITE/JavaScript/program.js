document.addEventListener("DOMContentLoaded", function (){

var index = Math.floor(Math.random()*3);
document.querySelector("body").onload = HeadingChange;
document.querySelector("video").onended = VideoChange;

function HeadingChange(){
    var headingArray = new Array("Join Hong Kong Industrial University's College of Science for world-class education and research opportunities in science and technology! 20 QUOTAS LEFT!", "Join the future of engineering with Hong Kong Industrial University's College of Engineering, offering innovative programs and world-class faculty to prepare you for success in the field! 40 QUOTAS LEFT!" , "Join the future of interdisciplinary studies with Hong Kong Industrial University's College of Interdisciplinary Studies, offering innovative programs and world-class faculty to prepare you for success in various fields! 30 QUOTAS LEFT!");

    msg = headingArray[index];
    document.querySelector(".heading").innerHTML = "<h3>" + msg + "</h3>";
    index++;
    if (index==2){
        index = 0;
    }
    setTimeout(function() {HeadingChange()} , 3000);
}

function VideoChange() {
    v = document.querySelector("video");
    if (document.querySelector("source").getAttribute("class") == "vid1") {
        v.innerHTML = '<source class="vid2" src="https://personal.cs.cityu.edu.hk/~cs2204/2023/video/video2.mp4"> <source class="vid2" src="https://personal.cs.cityu.edu.hk/~cs2204/2023/video/video2.mkv"> <p>Video format is not supported</p>';
    } else {
        v.innerHTML = '<source class="vid1" src="https://personal.cs.cityu.edu.hk/~cs2204/2023/video/video1.mp4"> <source class="vid1" src="https://personal.cs.cityu.edu.hk/~cs2204/2023/video/video1.mkv"> <p>Video format is not supported</p>';
    }
    v.load();
    v.play();
}

})


