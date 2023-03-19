function draw_one_frame(cur_frac) {
  // VARIABLES

  let window_size = canvasHeight/2; // window size


  /////////////// COLOURS //////////////

  let window_color1 = color("#8AB0BF") // light blue colour
  let window_color2 = color("#D0EEF7") // lighter blue colour
  let backgroundColor = color ("#D9B384") // background colour sand
  let framingColor = color ("#A65F21") //framing colour 
  let celingColor = color ("#EBE3AB") //ceiling colour light sand
  let darkeygreen = color ("#93AEBF")  // dark greeny blue
  let framingdetail = color ("#7d4718")
  let windowXsize = width/2;
  let windowYsize = height*1;

  let mainColor = color("#733215") // burnt seinna
  let backupColor = color("#C19A36") // purple
  let detailColor = color ("#66CAD8") //yellow

///////////////// CEILING //////////////

  noStroke();
  fill(celingColor);
  rect(0, 0, width, height);

  
// /// array for ceiling arc colour ////

//   let arcColor = [
//     color("#A6785D"),
//     color("#F2B885"),
//     color("#A65D03"),
//     color("#F2C46D"),
//     color("#93AEBF"),
//     color("#f0c38d")
//   ]

/// where ellipses spawn //////
    strokeWeight(1);
    let circ_points = [
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

let colors = [
  color("#A6785D"),  // red
  color("#F2B885"),  // green
  color("#93AEBF"),  // blue
];

push()
for (let i = 0; i < circ_points.length - 1; i++) {
  // Calculate the position of the ellipse
  let y = map(cur_frac, 1, 0, circ_points[i], circ_points[i + 1]);
  
  // Calculate the color based on the position
  let t = map(y, circ_points[i], circ_points[i + 1], 0, 1);
  let c = lerpColor(colors[0], colors[2], t);

  // Draw the ellipse with the calculated color
  fill(c);
  strokeWeight(width/30)
  stroke(framingColor)
  ellipse(width / 2, y, windowXsize * 1.9, windowYsize * 4.4);
} 
pop()

// ///// making the arcs spawn and move upwards ////
//    push()
// strokeWeight(1);
// stroke(0);
// for (let i = 0; i < circ_points.length - 1; i++) {
//   let cur_grid_line = map(cur_frac, 1, 0, circ_points[i], circ_points[i + 1]);
//   let value = map(cur_grid_line, -1, 1, 0, 1);
//   let arcColor_change = lerpColor(arcColor[0], arcColor[5], value);
//   fill(arcColor_change);
//   ellipse(width / 2, cur_grid_line*1.04, windowXsize * 1.9, windowYsize * 4.4);

//   //console.log('cur_grid_line:', cur_grid_line);
//   //console.log('value:', value);
// }
  
//   if (debugView) {
//       strokeWeight(1);
//       stroke(255, 0, 0);
//       for(let i=0; i<circ_points.length; i++) {
//         ellipse(width/2, circ_points[i], width, circ_points[i]);
//       }
//     } 

// pop()

  /////////// WALLS BASE //////////////

  //left wall
  fill(backgroundColor);
  quad(width*0.35, height, windowXsize*0.25, height*0, windowXsize*0, height*0, width*0.001, height)

  //right wall
  quad(width*0.65, height, windowXsize*1.75, height*0, windowXsize*2, height*0, width, height)


  ////////////// PAINTING BASES //////////////
  push()
  fill("#D9CDB8")
  triangle(width*0.83, height*1.02, windowXsize*1.67, height*0.42, width*0.70, height*1.02) //right panel framing inner
  triangle(width*0.17, height*1.02, windowXsize*0.33, height*0.42, width*0.30, height*1.02) //right panel framing inner
  pop()

  //////////// WINDOW //////////////
  
  // window colour looping

  noStroke()
  let val = map(cur_frac, -1, 1, 0, 1)
  let window_change = lerpColor(window_color1, window_color2, val);
  let window_changeback = lerpColor(window_color2, window_color1, val);
  let window_colorloop = lerpColor(window_change, window_changeback, val);
  fill(window_colorloop);

  // window main ellipse framing

  push()
  fill(framingColor);
  ellipse(windowXsize, height*1.01, window_size*1.1);
  pop() 

  // window main ellipse

  ellipse(windowXsize, height, window_size);

  //window framing inner circle

  push()
  strokeWeight(width/100)
  stroke(framingColor)
  ellipse(windowXsize, height, window_size/1.20);
  pop()

  // window framining inner lines

  push()
  strokeWeight(width/100)
  stroke(framingColor)
  line(width/2, height/1.26, width/2, height) // centre line 
  line(width/2.4, height/1.16, width/2, height) // left line
  line(width/1.71, height/1.16, width/2, height) // right line
  line(width/2.58, height, width/1.62, height) // bottom line
  pop()

  ///////////// pixel effect on wall /////////////

  let orbSize = width / 40;
  let spacingSize = width / 55;
  
  let shapePoints = []; // array to store the points defining the custom shape
  
  // Defining quad and triangle points 

  fill("#D9CDB8");
  noStroke(30);
  beginShape(); // start defining the custom shape
  shapePoints.push(createVector(width*0.91, height));
  shapePoints.push(createVector(windowXsize*1.79, height*0.18));
  shapePoints.push(createVector(windowXsize*2, height*-0.25));
  shapePoints.push(createVector(width, height));
  quad(width*0.90, height, windowXsize*1.79, height*0.17, windowXsize*2, height*-0.10, width, height); // right panel framing
  
  shapePoints.push(createVector(width*0.09, height));
  shapePoints.push(createVector(windowXsize*.21, height*0.18));
  shapePoints.push(createVector(windowXsize*0, height*-0.25));
  shapePoints.push(createVector(width*0, height));
  quad(width*0.10, height, windowXsize*.21, height*0.18, windowXsize*0, height*-0.10, width*0, height); // left panel framing
  
  shapePoints.push(createVector(width*0.84, height*1.02));
  shapePoints.push(createVector(windowXsize*1.69, height*0.38));
  shapePoints.push(createVector(width*0.71, height)); // left bottom point
  triangle(width*0.83, height*1.02, windowXsize*1.69, height*0.38, width*0.70, height) //right panel framing inner
  
  shapePoints.push(createVector(width*0.17, height*1.02));
  shapePoints.push(createVector(windowXsize*0.33, height*0.42));
  shapePoints.push(createVector(width*0.29, height)); // right bottom point
  triangle(width*0.17, height*1.02, windowXsize*0.33, height*0.42, width*0.30, height) //left panel framing inner

  endShape(CLOSE); // end the custom shape
  
  // making loop for ellipses

  for(let across = 0.5; across < width/spacingSize; across++) {
    for(let down = 0.5; down < height/spacingSize; down++) {
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
  // (sourced from ChatGPT.com)
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
  

 ///////////////// FRAMING  ///////////////
  
 // framing for quads 

 push()
  noFill()
  strokeWeight(width/50)
  stroke(framingColor)
  quad(width*0.90, height*1.02, windowXsize*1.79, height*0.17, windowXsize*2, height*-0.25, width, height*1.02); // right panel framing
  quad(width*0.10, height*1.02, windowXsize*.21, height*0.17, windowXsize*0, height*-0.25, width*0, height*1.02); // left panel framing
  pop()

  // framing for triangle and wall ceiling mounting
  
  push()
  noFill()
  strokeWeight(width/50)
  stroke(framingColor)
  triangle(width*0.17, height*1.02, windowXsize*0.33, height*0.42, width*0.30, height*1.02) //left panel framing inner
  triangle(width*0.83, height*1.02, windowXsize*1.67, height*0.42, width*0.70, height*1.02) //right panel framing inner
  line (width*0.65, height,windowXsize*1.75, height*0); // right wall
  line (width*0.35, height,windowXsize*0.25, height*0); // left wall
  pop()

  // detailed framing for paintings and wall ceiling mounting

  push()
  noFill()
  strokeWeight(width/100)
  stroke(framingdetail)

  line (width*0.65, height,windowXsize*1.75, height*0); // right wall
  line (width*0.35, height,windowXsize*0.25, height*0); // left wall

  triangle(width*0.17, height*1.02, windowXsize*0.33, height*0.42, width*0.30, height*1.02) //left panel framing inner
  triangle(width*0.83, height*1.02, windowXsize*1.67, height*0.42, width*0.70, height*1.02) //right panel framing inner
  
  quad(width*0.90, height*1.02, windowXsize*1.79, height*0.17, windowXsize*2, height*-0.25, width, height*1.02); // right panel framing
  quad(width*0.10, height*1.02, windowXsize*.21, height*0.17, windowXsize*0, height*-0.25, width*0, height*1.02); // left panel framing
  pop()

  }   
  