

function draw_one_frame(cur_frac) {
noStroke()
let backgroundColor = color("#2BDE98") // tuquoise colour
fill(backgroundColor)
rect(0, 0,width, height)

/////////////// COLOURS

let mainColor = color("#DB7F67") // burnt seinna
let backupColor = color("#0E050E") // purple
let detailColor = color ("#E0DF22") //yellow

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
