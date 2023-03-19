function draw_one_frame(cur_frac) {
  // VARIABLES

  let window_size = canvasHeight/2; // window size
  
  // COLOURS
  let window_color1 = color("#8AB0BF") // light blue colour
  let window_color2 = color("#D0EEF7") // lighter blue colour
  let backgroundColor = color ("#D9B384") // background colour sand
  let framingColor = color ("#A65F21") //framing colour 
  let celingColor = color ("#EBE3AB") //ceiling colour light sand
  let darkeygreen = color ("#93AEBF")  // dark greeny blue
  //let peachycolour = color("#F2B885") //peachycolour
  let windowXsize = width/2;
  let windowYsize = height*1;

  let mainColor = color("#733215") // burnt seinna
  let backupColor = color("#C19A36") // purple
  let detailColor = color ("#66CAD8") //yellow

///////////////// VARIABLES

// let orbSize = width / 20
// let spacingSize = width / 35

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
    color("#93AEBF"),
    color("#93AEBF") // dark greeny blue
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
  let arcColor_change = lerpColor(arcColor[0], arcColor[3], value);
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
  let val = map(cur_frac, -1, 1, 0, 1)
  let window_change = lerpColor(window_color1, window_color2, val);
  fill(window_change);

  //fill(window_color); //light blue

  push()
  fill(framingColor);
  ellipse(windowXsize, height*1.01, window_size*1.2);
  pop() 

  ellipse(windowXsize, height, window_size);

  //window framing inner circ
  push()
  strokeWeight(7)
  stroke(framingColor)
  ellipse(windowXsize, height, window_size/1.20);
  pop()

  // window framining inner lines
  push()
  strokeWeight(8)
  stroke(framingColor)
  line(width/2, height/1.26, width/2, height) // centre line 
  line(width/2.4, height/1.16, width/2, height) // left line
  line(width/1.71, height/1.16, width/2, height) // right line
  line(width/2.58, height, width/1.62, height) // bottom line
  pop()


  /////////// walls base

  //left wall
  fill(backgroundColor);
  quad(width*0.36, height, windowXsize*0.25, height*0, windowXsize*0, height*0, width*0.001, height)

  //right wall
  quad(width*0.64, height, windowXsize*1.75, height*0, windowXsize*2, height*0, width, height)
  
  // framing on walls
  fill(framingColor);
  // quad(width*0.12, height, windowXsize*0.25, height*0.17, windowXsize*0, height*-0.35, width*0, height) // left panel framing
  // quad(width*0.88, height, windowXsize*1.75, height*0.17, windowXsize*2, height*-0.35, width, height) // right panel framing

  triangle(width*0.32, height, windowXsize*0.30, height*0.27, windowXsize*0.30, height) //left panel framing inner
  triangle(width*0.85, height, windowXsize*1.70, height*0.27, width*0.68, height) //right panel framing inner

  push()
  fill("#D9CDB8")
  //scale()
  triangle(width*0.83, height*1.02, windowXsize*1.67, height*0.42, width*0.70, height) //right panel framing inner
  triangle(width*0.17, height*1.02, windowXsize*0.33, height*0.42, width*0.30, height) //right panel framing inner

  pop()

  ///////////// pictures on wall
  let orbSize = width / 20;
  let spacingSize = width / 37;
  
  let shapePoints = []; // array to store the points defining the custom shape
  
  fill("#D9CDB8");
  noStroke(30);
  beginShape(); // start defining the custom shape
  shapePoints.push(createVector(width*0.90, height));
  shapePoints.push(createVector(windowXsize*1.79, height*0.17));
  shapePoints.push(createVector(windowXsize*2, height*-0.25));
  shapePoints.push(createVector(width, height));
  quad(width*0.90, height, windowXsize*1.79, height*0.17, windowXsize*2, height*-0.25, width, height); // right panel framing
  shapePoints.push(createVector(width*0.10, height));
  shapePoints.push(createVector(windowXsize*.21, height*0.17));
  shapePoints.push(createVector(windowXsize*0, height*-0.25));
  shapePoints.push(createVector(width*0, height));
  quad(width*0.10, height, windowXsize*.21, height*0.17, windowXsize*0, height*-0.25, width*0, height); // left panel framing
  endShape(CLOSE); // end the custom shape
  
  // set of ellipses
  for(let across = 1; across < width/spacingSize; across++) {
    for(let down = 1; down < height/spacingSize; down++) {
      let x = spacingSize*across;
      let y = spacingSize*down;
      
      // check if the ellipse is within the custom shape
      if(isPointInShape(x, y, shapePoints)) {
        noiseColor = getNoiseValue(spacingSize*across, spacingSize*down, 0.9, "noiseColor", 0, 1, 20); // 200 is smooth value making it lumpy looking
      noiseyColor = lerpColor(mainColor, backupColor, noiseColor);
      noiseycolor2 = lerpColor(backupColor, detailColor, noiseColor);
      finallerp = lerpColor(noiseyColor, noiseycolor2, noiseColor);
        fill(finallerp);
        ellipse(x, y, orbSize);
      }
    }
  }
  
  // function to determine if a point is within a custom shape defined by an array of vertices
  function isPointInShape(x, y, vertices) {
    let inside = false;
    let j = vertices.length - 1;
    for(let i = 0; i < vertices.length; i++) {
      if((vertices[i].y < y && vertices[j].y >= y || vertices[j].y < y && vertices[i].y >= y) && (vertices[i].x <= x || vertices[j].x <= x)) {
        if(vertices[i].x + (y - vertices[i].y) / (vertices[j].y - vertices[i].y) * (vertices[j].x - vertices[i].x) < x) {
          inside = !inside;
        }
      }
      j = i;
    }
    return inside;
  }
  
  push()
  noFill()
  strokeWeight(20)
  stroke(framingColor)
  quad(width*0.90, height, windowXsize*1.79, height*0.17, windowXsize*2, height*-0.25, width, height); // right panel framing
  quad(width*0.10, height, windowXsize*.21, height*0.17, windowXsize*0, height*-0.25, width*0, height); // left panel framing
pop()
  }   
  