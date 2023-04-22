video ="";
status="";
objects =[];
input="";

function setup(){
    canvas=createCanvas(300,200);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video,0,0,480,380);
     if (status != ""){
        objectDetector.detect(video,gotResult);
       for(i=0; i<objects.length; i++){
        document.getElementById("status").innerHTML="Status : Objects Detected";

        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label+""+percent+"%", objects[i].x+15, objects[i].y+15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        if (objects[i].label == input){
            document.getElementById("input_objcts_status").innerHTML= input + "has been found";
         video.stop();
         objectDetector.detect(gotResult);
         speak();
    
        }else{
            document.getElementById("input_objcts_status").innerHTML= input + "not found";  
        }
       }
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
    document.getElementById("input").value;

}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error,results){

    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function speak(){
    var synth = window.speechSynthesis;
    SpeechSynthesisUtterance( input + "has been found");
    synth.speak(utterThis);
}