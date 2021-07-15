Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90

});
camera=document.getElementById("camera");
Webcam.attach('#camera')
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'">';
    })
}
console.log('ml5 version',ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/dDHEs5DsH/model.json", modelloaded);

function modelloaded(){
    console.log ("model has been loaded")
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data1="the first prediction is"+prediction_1
speak_data2="the second prediction is" +prediction_2
var utterthis=new SpeechSynthesisUtterance(speak_data1+speak_data2)
synth.speak(utterthis);
}
function check(){
    img=document.getElementById("capture_image") 
    classifier.classify(img,got_results)
}
function got_results(error,results){
    if(error){console.error(error)}
    else{
        console.log(results)
        document.getElementById("result_emotion_name1").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label
        prediction_2=results[1].label
        speak();
        if(results[0].label == "amazing"){
            document.getElementById("update_emoji1").innerHTML="&#128076;";
        }
        if(results[0].label == "thumbs_up"){
            document.getElementById("update_emoji1").innerHTML="&#128077;";
        }
        if(results[0].label == "thumbs_down"){
            document.getElementById("update_emoji1").innerHTML="&#128078;";
        }
        
        if(results[1].label == "amazing"){
            document.getElementById("update_emoji2").innerHTML="&#128076;";
        }
        if(results[1].label == "thumbs_up"){
            document.getElementById("update_emoji2").innerHTML="&#128077;";
        }
        if(results[1].label == "thumbs_down"){
            document.getElementById("update_emoji2").innerHTML="&#128078;";
        }
    }
}
