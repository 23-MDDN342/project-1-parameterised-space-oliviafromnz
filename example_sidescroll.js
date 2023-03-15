function draw_one_frame(cur_frac) {
  let sun_size = height/8;

  noStroke();
  // sky
  fill(100, 100, 214);
  rect(0, 0, width, height);

  // sun
  fill(255, 255, 0);
  ellipse(0.25 * width, 0.10 * height, sun_size);

  // grass
  fill(0, 200, 0);
  rect(0, height/2, width, height/2);

  stroke(0);
  fill(100, 100, 100);

  let b1_y = 0.55 * height;
  let b2_y = 0.65 * height;

  let b1_size = height/12;
  let b2_size = height/6;

  let grid_points1 = [
   -0.25 * width,
    0.0 * width,
    0.25 * width,
    0.50 * width,
    0.75 * width,
    1.00 * width
  ]

  if (debugView) {
    stroke(255, 0, 0);
    strokeWeight(height/100);
    noFill();
    for(let i=0; i<grid_points1.length; i++) {
      rect(grid_points1[i], b1_y, b1_size, 2*b1_size);
    }    
  }

  fill(100, 100, 100);
  noStroke();
  for(let i=0; i<grid_points1.length-1; i++) {
    let cur_x_pos = map(cur_frac, 0, 1, grid_points1[i], grid_points1[i+1])
    rect(cur_x_pos, b1_y, b1_size, 2*b1_size);
  }

  let grid_points2 = [
   -0.40 * width,
    0.10 * width,
    0.60 * width,
    1.10 * width
  ]

  if(debugView) {
    stroke(255, 0, 0);
    strokeWeight(height/100);
    noFill();
    for(let i=0; i<grid_points2.length; i++) {
      rect(grid_points2[i], b2_y, b2_size, 2*b2_size);
    }    
  }

  fill(100, 100, 100);
  noStroke();
  for(let i=0; i<grid_points2.length-1; i++) {
    let cur_x_pos = map(cur_frac, 0, 1, grid_points2[i], grid_points2[i+1])
    rect(cur_x_pos, b2_y, b2_size, 2*b2_size);
  }




  
  ///////////////// VARIABLES

let orbSize = width / 30
let spacingSize = width / 29

let noiseColor = getNoiseValue(0, 0, 0.8, "noiseColor", 0, 1, 1)
let noiseyColor;

////////////////// MAPS

let moveXmap, moveYMap;

///////////////// ELLIPSE

fill(mainColor)

for(let across = 1; across< width/spacingSize; across++){ // for loop for circles to be repeated across
	for(let down = 1; down +1 < height/spacingSize; down++){ // for loop for circs to be repeated downwards , +1 stops it going off page

	noiseColor = getNoiseValue(spacingSize*across,spacingSize*down,0.8,"noiseColor", 0, 1, 200) // 200 is smooth value making it lumpy looking

	noiseyColor = lerpColor(mainColor, backupColor, noiseColor)

	fill(noiseyColor)

	ellipse(spacingSize*across, spacingSize*down, orbSize) // circ with x and y loop with noisecolor
		
	// if(noiseColor > 0.9){ // making a smaller yellow circle if the value of the colour in noise function is higher than 0.9
	// 	fill(detailColor)
	// 	ellipse(spacingSize*across, spacingSize*down, orbSize/2)
	// 	}

	if(cur_frac > 0.1 && noiseColor > 0.9){ // if cur frac value is more than 0.3 and nosie colour is higher than make a smaller yellow circle
		fill(detailColor)
		moveXmap = map(cur_frac, 0.3, 1, spacingSize*across, spacingSize*(across+1))
		ellipse(moveXmap, spacingSize*down, orbSize/2)
		}
	}
}
}