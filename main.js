
objects=[];
status="";

function preload(){
    video=createVideo("video.mp4");
}
                      

function setup() {
  canvas = createCanvas(380,380);
  canvas.center();
  video.hide();
  
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  video.loop();
  video.speed(1);
  video.volume(0);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw()
{
    image(video,0,0,380,380);
    if(status!="")
    {
        //r=random(255);
        //g=random(255);
        //b=random(255);
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="Status : Object dectected";
            document.getElementById("name_of_object").innerHTML="Number of object detected are : "+objects.lenght;
            fill("#FF0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + " "+ percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

