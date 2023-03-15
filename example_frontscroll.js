function draw_one_frame(cur_frac) {
  // VARIABLES

  let window_size = canvasHeight/2; // window size
  
  // COLOURS
  let window_color = color("#0FC1C7") // light blue colour
  let backgroundColor = color ("#C0B461") // background colour sand
  let framingColor = color ("#7D711E") //framing colour sand
  let celingColor = color ("#EBE3AB") //ceiling colour light sand

  let windowXsize = width/2;
  let windowYsize = height*1;

  // let mainColor = color("#DB7F67") // burnt seinna
  // let backupColor = color("#0E050E") // purple
  // let detailColor = color ("#E0DF22") //yellow

///////////////// VARIABLES

let orbSize = width / 30
let spacingSize = width / 35

let noiseColor = getNoiseValue(0, 0, 0.8, "noiseColor", 0, 1, 1)
let noiseyColor;

////////////////// MAPS

let moveXmap, moveYMap;
  
  noStroke();

  ////// background
  fill(celingColor);
  rect(0, 0, width, height);


///////////// arcs repeating on ceiling colour series
  let arcColor = [
    color("#A6785D"),
    color("#F2B885"),
    color("#A65D03"),
    color("#F2C46D"),
    color("#93AEBF")
  ]

///////////// where ellipses spawn
    strokeWeight(1);
    let circ_points = [
      -0.5 * height,
      0.5 * height,
      0.75 * height,
      1 * height,
      1.25 * height,
      1.50 * height,
      1.75 * height,
      2.00 * height,
      2.25 * height,
      2.50 * height,
      2.75 * height,
    ]

///////////// making the arcs continue to spawn and move upwards 
    strokeWeight(1);
stroke(0);
for (let i = 0; i < circ_points.length - 1; i++) {
  let cur_grid_line = map(cur_frac, 1, 0, circ_points[i], circ_points[i + 1]);
  let value = map(cur_grid_line, 0, height, 0, 1);
  let arcColor_change = lerpColor(arcColor[0], arcColor[4], value);
  fill(arcColor_change);
  ellipse(width / 2, cur_grid_line, windowXsize * 2, windowYsize * 4.3);
}
  
  if (debugView) {
      strokeWeight(1);
      stroke(255, 0, 0);
      for(let i=0; i<circ_points.length; i++) {
        ellipse(width/2, circ_points[i], width, circ_points[i]);
      }
    } 


  //////////// window
  noStroke()
  fill(window_color); //light blue

  push()
  fill(framingColor);
  ellipse(windowXsize, height*1.01, window_size*1.2);
  pop() 

  ellipse(windowXsize, height, window_size);

  push()
  strokeWeight(7)
  stroke(framingColor)
  ellipse(windowXsize, height, window_size/1.20);
  pop()

  /////////// walls base

  //left wall
  fill(backgroundColor);
   quad(width*0.36, height, windowXsize*0.25, height*0, windowXsize*0, height*0, width*0.001, height)

  //right wall
  quad(width*0.64, height, windowXsize*1.75, height*0, windowXsize*2, height*0, width, height)
  
  // framing on walls
  fill(framingColor);
  quad(width*0.12, height, windowXsize*0.25, height*0.17, windowXsize*0, height*-0.35, width*0, height) // left panel framing
  quad(width*0.88, height, windowXsize*1.75, height*0.17, windowXsize*2, height*-0.35, width, height) // right panel framing

  triangle(width*0.32, height, windowXsize*0.30, height*0.27, windowXsize*0.30, height) //left panel framing inner

  triangle(width*0.85, height, windowXsize*1.70, height*0.27, width*0.68, height) //right panel framing inner

  ///////////// pictures on wall
  fill("#ffedd1")
  noStroke(0);
  quad(width*0.90, height, windowXsize*1.79, height*0.17, windowXsize*2, height*-0.25, width, height) // right panel framing
  quad(width*0.10, height, windowXsize*.21, height*0.17, windowXsize*0, height*-0.25, width*0, height) // right panel framing

  }

