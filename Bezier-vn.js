function setup() {
  createCanvas(600, 600);
  
  /*
  QUADRATIC CURVE
  
  createVector(100,300),
  createVector(300,100),
  createVector(500, 300)
  
  
  CUBIC CURVE
  
  createVector(90,300),
  createVector(230,100),
  createVector(370,550),
  createVector(510,300)
  
  
  QUARTIC CURVE
  
  createVector(50,300),
  createVector(175,50),
  createVector(300,550),
  createVector(425,170),
  createVector(550,300)
  
  
  QUINTIC CURVE
  
  createVector(50,300),
  createVector(150,50),
  createVector(250,550),
  createVector(350,220),
  createVector(450,20),
  createVector(550,500)
  */
  
  
  points=[[
    createVector(0,300),
    createVector(100,550),
    createVector(200,400),
    createVector(300,20),
    createVector(400,150),
    createVector(500,500),
    createVector(600,300)
    ]
  ]
  for (i=0; i<points[0].length-1; i++){
    append(points, [])
  }
  w=6
  delta=0.005
  frameRate(1/(w*delta))
  ti=0
}

function draw() {
  if (ti>=1){ti=0}
  background(0)
  movingbCurve(points, ti, delta)
  ti+=delta
}


function movingbCurve(points, ti, delta){
  beginShape();
  for (let t=0; t<=ti; t+=delta){
    let r = bCurve(points, t)
    noFill()
    stroke(255);
    strokeWeight(6);
    vertex(r[r.length-1][0].x, r[r.length-1][0].y)
  }
  endShape();
  graphics(points, ti)
  strokeWeight(1)
  fill(255)
  textAlign(LEFT, TOP)
  textSize(30)
  text("Time: "+round(ti,2),5,5)
  rect(10,40, lerp(10,120, ti), 20)
  noFill()
  rect(10,40,120,20) 
}

function bCurve(points, t){
  for (let a=0; a<points[0].length-1; a++){
    for (let i=0; i<points[a].length-1; i++){
      let x=lerp(points[a][i].x, points[a][i+1].x, t)
      let y=lerp(points[a][i].y, points[a][i+1].y, t)
      points[a+1][i]=createVector(x,y)
    }
  }
  return points
}

function graphics(points, ti){
  let s=bCurve(points, ti)
  fill(255)
  for (let a=0; a<s.length; a++){
    for (let b=0; b<s[a].length; b++){
      circle(s[a][b].x, s[a][b].y, 15/(a+1))
    }
  }
  strokeWeight(1)
  for (let a=0; a<s.length; a++){
    for (let b=0; b<s[a].length-1; b++){
      line(s[a][b].x, s[a][b].y, s[a][b+1].x, s[a][b+1].y)
    }
  }
}
