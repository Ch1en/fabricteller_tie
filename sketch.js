
var button;
var capture;
let cam;
let ctracker;
let tie;

function preload(){
  tie = loadImage('tie.PNG');
  bg = loadImage('BG2.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  button = createButton('拍照');
  button.position(width/2+400,height/2);
  button.mousePressed(takesnap);
  //setup camera
  cam = createCapture(VIDEO);
  cam.size(720,540);
  cam.hide();

  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(cam.elt);
  noStroke();
}

function takesnap() {
  snapshot = cam.get();
  print(snapshot);
  saveCanvas('myCanvas.png');
  return false;
}

function draw() {
  background(193,231,253);
  imageMode(CORNER);//原本的(防止被下面影響)3-[   .]
  image(cam, windowWidth/2-360,windowHeight/2-270,720,540);
  image(bg,windowWidth/2-390,windowHeight/2-295,781,601);

  // get array of face marker positions [x, y] format
  let face = ctracker.getCurrentPosition();

  if(face != false){
    imageMode(CENTER);
    let d = dist(face[27][0],face[27][1], face[32][0], face[32][1]);
    print(d);//90-118
    let imgSize = map (d, 90, 116, 60, 120);
    image(tie,face[7][0]+400, face[7][1]+175, 200, 200);
  }


  
}