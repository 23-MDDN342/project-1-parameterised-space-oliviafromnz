function draw_one_frame(cur_frac) {
  // VARIABLES

  let window_size = canvasHeight/2; // window size
  

  // COLOURS
  let window_color = color("#0FC1C7") // light blue colour
  let backgroundColor = color ("#C0B461") // background colour sand
  let framingColor = color ("#7D711E") //framing colour sand
  let celingColor = color ("#EBE3AB") //ceiling colour light sand

  noStroke();

  ////// background
  fill(celingColor);
  rect(0, 0, width, height);

  /// window
  fill(window_color); //light blue
  let windowXsize = width/2;
  ellipse(windowXsize, height, window_size);

//  //////////  lines downwards on green rect
//     stroke(0);
//     line(width*0.36, height, windowXsize*0.25, height*0); // left diagonal line structural 
//     line(width*0.64, height, windowXsize*1.75, height*0); // right diagonal line structural

  /// walls base

  //left wall
  fill(backgroundColor);
   quad(width*0.36, height, windowXsize*0.25, height*0, windowXsize*0, height*0, width*0.001, height)

    //right wall
  quad(width*0.64, height, windowXsize*1.75, height*0, windowXsize*2, height*0, width, height)
  
   fill(framingColor);
  triangle(width*0.32, height, windowXsize*0.30, height*0.27, windowXsize*0.30, height)
  
  triangle(width*0.85, height, windowXsize*1.70, height*0.27, width*0.68, height)

 



  // // amount of sqaures producing from equator line on green rect
  // strokeWeight(10);
  // let grid_points = [
  //   0.50 * height, // starts half way 0.50
  //   0.53 * height,
  //   0.60 * height,
  //   0.75 * height,
  //   1.00 * height
  // ]

//   if (debugView) {
//     strokeWeight(1);
//     stroke(255, 0, 0);
//     for(let i=0; i<grid_points.length; i++) {
//       line(0, grid_points[i], width, grid_points[i]);
//     }
//   }

  // green across line stroke, repeating
  strokeWeight(2);
  stroke(0);
  for(let i=0; i<grid_points.length-1; i++) {
    let cur_grid_line = map(cur_frac, 0, 1, grid_points[i], grid_points[i+1])
    line(0, cur_grid_line, width, cur_grid_line);
  }
  
 }