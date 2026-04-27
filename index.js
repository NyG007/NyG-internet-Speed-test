let startTime, endTime;
let imageSize ="";
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbSpeed = document.getElementById("mbs"),
    info = document.getElementById("info");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 5;
let TestCompleted = 0;

// Get random image form unsplash.com
let imageApi = "https://source.unsplash.com/random?topic=nature";

// When image loads
image.onload = async function(){
    endTime = new Date().getTime();

    // Get image size
    await fetch(imageApi).then((resp) =>{
        imageSize = response.headers.get("content-length")
        calculateSpeed();
    });
};

// Function to calculate speed
function calculateSpeed(){
    // Time taken in seconds 
    let timeDuration = (endTime - startTime) / 1000;
    // Total bits
    let loadedBits = imageSize * 8;
    let speedInBts = loadedBits / timeDuration;
    let speedInKbs = speedInBts / 1024;
    let speedInMbs = speedInKbs / 1024;

    totalBitSpeed += speedInBts;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    TestCompleted++;

    //If all tests completed (we get 5 image then calculate average)
    if(TestCompleted === numTests){
        let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
        let averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
        let averageSpeedInMbps = (totalMbSpeed / numTests).toFixed(2);
    

        // Display average speeds
        bitSpeed.innerHTML += `${averageSpeedInBps}`;
        kbSpeed.innerHTML += `${averageSpeedInKbps}`;
        mbSpeed.innerHTML += `${averageSpeedInMbps}`;
        info.innerHTML = "test Completed";
    }
}