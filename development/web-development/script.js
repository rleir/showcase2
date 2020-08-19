var INT_MIN_BRIGHTNESS = 102;
var HEX_MIN_BRIGHTNESS = INT_MIN_BRIGHTNESS.toString(16);
var MAX_BOKEHS = 100;
var num_bokehs = 0;

var BOKEH = {
  //diameter: [[90,100],[90,100],[45,50],[10,15],[4,5]],
  //diameter: [[low, high]], measured in vw
  diameter: [[6.67,7],[6.67,7],[3.33,3.5],[1.67,2],[0.8,0.83]],
  opacity: [[0.5,0.7],[0.15,0.2],[0.5,0.7],[0.8,1],[1,1]],
  z_axis: ["4","1","2","5","5"],
  shadow: ["2px 2px","3px 3px","5px 5px","2px 2px","7px 7px"],
  chance: [0.3,0.7,0.85,0.95,1],
  //Dictates the speed of the bubbles.
  duration: ["80s","65s","70s","110s","90s"]
};

function initBokeh() {
  if (MAX_BOKEHS <= num_bokehs){
    var temp = document.getElementById("center-back");
    var i = 0;
    while (i < temp.childNodes.length
      && temp.childNodes[i].className !== "bokeh"){
      i++;
    }
    temp.removeChild(temp.childNodes[i]);
  } else {
    num_bokehs++;
  }
  var element = document.createElement("div");
  element.className = "bokeh";

  var temp = Math.random();
  var i = 0;
  while (i < BOKEH.chance.length && !(temp < BOKEH.chance[i])){
    i++;
  }
  type = i;

  element.style.left =
  (Math.floor(Math.random() * window.innerWidth)).toString(10) + "px";

  deg = Math.floor(Math.random() * 360);
  var bgcolor;
  if (deg < 60){
    bgcolor =
    "#ff" + (INT_MIN_BRIGHTNESS
      + Math.floor((deg % 60) / 60 * (255 - INT_MIN_BRIGHTNESS))).toString(16)
      + HEX_MIN_BRIGHTNESS;
  } else if (deg < 120) {
    bgcolor =
    "#" + (255
      - Math.floor((deg % 60) / 60 * (255 - INT_MIN_BRIGHTNESS))).toString(16)
      + "ff" + HEX_MIN_BRIGHTNESS;
  } else if (deg < 180) {
    bgcolor =
    "#" + HEX_MIN_BRIGHTNESS + "ff" + (INT_MIN_BRIGHTNESS
      + Math.floor((deg % 60) / 60 * (255 - INT_MIN_BRIGHTNESS))).toString(16);
  } else if (deg < 240) {
    bgcolor =
    "#" + HEX_MIN_BRIGHTNESS + (255
      - Math.floor((deg % 60) / 60 * (255 - INT_MIN_BRIGHTNESS))).toString(16)
      + "ff";
  } else if (deg < 300) {
    bgcolor =
    "#" + (INT_MIN_BRIGHTNESS
      + Math.floor((deg % 60) / 60 * (255 - INT_MIN_BRIGHTNESS))).toString(16)
      + HEX_MIN_BRIGHTNESS + "ff";
  } else {
    bgcolor =
    "#ff" + HEX_MIN_BRIGHTNESS + (255
      - Math.floor((deg % 60) / 60 * (255 - INT_MIN_BRIGHTNESS))).toString(16);
  }

  element.style.opacity =
  Math.random() * (BOKEH.opacity[type][1] - BOKEH.opacity[type][0])
  + BOKEH.opacity[type][0];
  element.style.zIndex = BOKEH.z_axis[type];

  element.style.backgroundColor = bgcolor;
  element.style.boxShadow = "0 0 " + BOKEH.shadow[type] + " " + bgcolor;

  var diameter =
  (Math.floor(Math.random() * (BOKEH.diameter[type][1]
    - BOKEH.diameter[type][0]) + BOKEH.diameter[type][0])).toString(10) + "vw";
  element.style.width = diameter;
  element.style.height = diameter;

  element.style.animationDuration = BOKEH.duration[type];

  document.getElementById("center-back").appendChild(element);
  //document.write(MIN_OPACITY + opac * (1 - MIN_OPACITY));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startBokeh(){
  while(true){
    while(Math.random() < 0.3){
      initBokeh();
    }
    await sleep(500);
  }
}
