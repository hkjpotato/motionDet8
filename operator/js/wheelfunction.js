

var start;
var Steering = 0;
var preSteering = 0;
var AccelInput = 0;
var preAccelInput = 0;
  var BrakeInput = 0; //brake plays no function in the drawloop function
  var preBrakeInput = 0;
  var Lag = 1500; //if lag value is available. otherwise use predefined value
  var dt = 0.01;  // time step (0.01 seconds) for drawing the line  *******DT line length*******

  var FWD=0;
  var FWD1=0;
  var FWD2=0;
  var FWD3=0;
  var preFWD=0;  

  var REV = 0;
  var REV1 = 0
  var REV2 = 0;
  var REV3 = 0;
  var preREV = 0;

  var EMG = 0;
  var EMG1 = 0;
  var EMG2 = 0;
  var preEMG = 0;
  
  var STR = 0;
  var STR1 = 0;
  var STR2 = 0;
  var preSTR = 0;





  var canvas = document.getElementById('myCanvas');

  canvas.width = 1900;
  canvas.height = 940;

  var context = canvas.getContext('2d');
  // set line width for all lines



  var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;

  var rAFStop = window.mozCancelRequestAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  window.cancelRequestAnimationFrame;

  window.addEventListener("gamepadconnected", function() {
    var gp = navigator.getGamepads()[0];
    drawLoop();
  });

  window.addEventListener("gamepaddisconnected", function() {
    rAFStop(start);
  });

  if(navigator.webkitGetGamepads) {  // Webkit browser that uses prefixes
    var interval = setInterval(webkitGP, 500);
  }

  function webkitGP() {
    var gp = navigator.webkitGetGamepads()[0];
    if(gp) {
      drawLoop();
      clearInterval(interval);
    }
  }

  //function Vel(et){
  //  var vell[];
  //  vell=[4.5*et[0],4.5*et[1]]; //4.5 m/s is approximately 10 miles per hour
  //  return vell;
  //}

  //function Accel(Ainput,V,et,en){
  //  var accell[];
  //  accell=[A*et[0]+V,
  //}
/////////////////////////////////////////////////Connection test
var ConnectionTest= setInterval(function(){ ConnectionTimer() }, 200);
var ConnRanNum = 0;

function ConnectionTimer() {
  ConnRanNum = Math.floor(Math.random()*1000+1);
  session.signal({
    type: myIgnitionPassword+"ConnRanNum",
    data: ConnRanNum
  });
  // console.log(ConnRanNum);
}
 /////////////////////////////////////////////////Connection test
 
 
 
 //Drawloop and session emit 
 function drawLoop() {

  if(navigator.webkitGetGamepads) {
    var gp = navigator.getGamepads()[0];
        Steering = gp.axes[0]; //range -1 to 1 with -1 full left turn
        AccelInput = gp.axes[2]; //range -1 to 1 with -1 fully throttled
        BrakeInput = gp.axes[3]; //range -1 to 1 with -1 fully braked
        FWD1 = +gp.buttons[8].pressed;
        FWD2 = +gp.buttons[10].pressed;
        FWD3 = +gp.buttons[12].pressed;
        REV1 = +gp.buttons[9].pressed;
        REV2 = +gp.buttons[11].pressed;
        REV3 = +gp.buttons[13].pressed;
        EMG1 = +gp.buttons[4].pressed;
        EMG2 = +gp.buttons[5].pressed;
        STR1 = +gp.buttons[1].pressed;
        STR2 = +gp.buttons[2].pressed;
        
        if(preSteering==Steering){
        } else{    
          session.signal({
            type: myIgnitionPassword+"Steering",
            data: Steering
          });
          // console.log(Steering);
          preSteering=Steering;
        }
        
        if(preAccelInput==AccelInput){
        } else{  
          session.signal({
            type: myIgnitionPassword+"AccelInput",
            data: AccelInput
          });
          // console.log(AccelInput);
          preAccelInput=AccelInput;
        }
        
        if(preBrakeInput==BrakeInput){
        } else{
          session.signal({
            type: myIgnitionPassword+"BrakeInput",
            data: BrakeInput
          });
          // console.log(BrakeInput);
          preBrakeInput=BrakeInput;
        }
        
        
        if(preFWD == ((+FWD1) + (+FWD2) + (+FWD3))){
        } else{
          FWD=(+FWD1) + (+FWD2) + (+FWD3);            
          session.signal({
            type: myIgnitionPassword+"FWD",
            data: FWD
          });
          // console.log(FWD);
          preFWD=FWD;
        }
        
        
        if(preREV==((+REV1) + (+REV2) + (+REV3))){
        } else{
          REV=(+REV1) + (+REV2) + (+REV3);            
          session.signal({
            type: myIgnitionPassword+"REV",
            data: REV
          });
          // console.log(REV);
          preREV=REV;
        }
        
        if(preEMG == (EMG1 && EMG2)){
        } else{
          EMG=(EMG1 && EMG2);            
          session.signal({
            type: myIgnitionPassword+"EMG",
            data: EMG
          });
          // console.log(EMG);
          preEMG=EMG;
        }
        
        if(preSTR == ((+STR1) + (+STR2))){
        } else{

         STR3=(+STR1) + (+STR2)

         if ((+STR1) == 1){
          STR=1;            
          session.signal({
           type: myIgnitionPassword+"STR",
           data: STR
         });
          // console.log(STR);
        }

        if ((+STR2) == 1){
          STR=0;            
          session.signal({
           type: myIgnitionPassword+"STR",
           data: STR
         });
          // console.log(STR);
        }

        preSTR=STR3;
      }


      // console.log("Accessed if");


    } else {

      var gp = navigator.getGamepads()[0];
        Steering = gp.axes[0]; //range -1 to 1 with -1 full left turn
        AccelInput = gp.axes[2]; //range -1 to 1 with -1 fully throttled
        BrakeInput = gp.axes[3]; //range -1 to 1 with -1 fully braked
        FWD1 = +gp.buttons[8].pressed;
        FWD2 = +gp.buttons[10].pressed;
        FWD3 = +gp.buttons[12].pressed;
        REV1 = +gp.buttons[9].pressed;
        REV2 = +gp.buttons[11].pressed;
        REV3 = +gp.buttons[13].pressed;
        EMG1 = +gp.buttons[4].pressed;
        EMG2 = +gp.buttons[5].pressed;
        STR1 = +gp.buttons[0].pressed;
        STR2 = +gp.buttons[1].pressed;
        
        if(preSteering==Steering){
        } else{    
          session.signal({
            type: myIgnitionPassword+"Steering",
            data: Steering
          });
          // console.log(Steering);
          preSteering=Steering;
        }
        
        if(preAccelInput==AccelInput){
        } else{  
          session.signal({
            type: myIgnitionPassword+"AccelInput",
            data: AccelInput
          });
          // console.log(AccelInput);
          preAccelInput=AccelInput;
        }
        
        if(preBrakeInput==BrakeInput){
        } else{
          session.signal({
            type: myIgnitionPassword+"BrakeInput",
            data: BrakeInput
          });
          // console.log(BrakeInput);
          preBrakeInput=BrakeInput;
        }
        
        
        if(preFWD == ((+FWD1) + (+FWD2) + (+FWD3))){
        } else{
          FWD=(+FWD1) + (+FWD2) + (+FWD3);            
          session.signal({
            type: myIgnitionPassword+"FWD",
            data: FWD
          });
          // console.log(FWD);
          preFWD=FWD;
        }
        
        
        if(preREV==((+REV1) + (+REV2) + (+REV3))){
        } else{
          REV=(+REV1) + (+REV2) + (+REV3);            
          session.signal({
            type: myIgnitionPassword+"REV",
            data: REV
          });
          // console.log(REV);
          preREV=REV;
        }
        
        if(preEMG == (EMG1 && EMG2)){
        } else{
          EMG=(EMG1 && EMG2);            
          session.signal({
            type: myIgnitionPassword+"EMG",
            data: EMG
          });
          // console.log(EMG);
          preEMG=EMG;
        }
        
        if(preSTR == ((+STR1) + (+STR2))){
        } else{

          STR3=(+STR1) + (+STR2)

          if ((+STR1) == 1){
            STR=1;            
            session.signal({
              type: myIgnitionPassword+"STR",
              data: STR
            });
            // console.log(STR);
          }

          if ((+STR2) == 1){
            STR=0;            
            session.signal({
              type: myIgnitionPassword+"STR",
              data: STR
            });
            // console.log(STR);
          }

          preSTR=STR3;
        }

        // console.log("Accessed else");

      }


    //if(preSteering==Steering){
    //}  else{
      context.clearRect(0,0,context.canvas.width,context.canvas.height); //the rectangle should be as large as the canvas stated at the beginning of the body
      
      var centerX= context.canvas.width/2;
      var centerY= context.canvas.height;
      
      var rho= Math.tan(-Steering*0.002+Math.PI/2); // transform steering range from -1 to 1 to rho (radius of curvature) ******RHO******
      
      var etx = 0; //define initial directions (remember that the centre of the coordinate system is on the upper left side of the screen)
      var ety = 1;
      
      var enx = 1; //define initial directions
      var eny = 0;
      
      var Vx = 0; // initial velocity in X
      var Vy = 1; // initial velocity in Y here is where we would put the velocity feed back value if we had it
                  // USE velocity value for length scaling.    
                  
      var Vxy=Math.sqrt(Math.pow(Vx,2)+Math.pow(Vy,2)); //initial normal velocity
      
      //var AtangentX = AccelInput * etx;
      //var AtangentY = AccelInput * ety;
      
      
      
      var AtangentX = (-AccelInput+1)/2*etx; // initial tangential acceleration
      var AtangentY = (-AccelInput+1)/2*ety; // initial tangential acceleration
      
      var AnormalX = Math.pow(Vxy,2)/rho*enx; // initial normal acceleration
      var AnormalY = Math.pow(Vxy,2)/rho*eny; // initial normal acceleration
      
      var posX = 0; // initial position
      var posY = 0;
      
      var SCALE=1.5;

      context.beginPath();
      context.moveTo(centerX, centerY);
        for (i=0;i<5000;i++){ // i < 500 with 5000 equals 5 seconds (not valid)

          posX = posX + Vx * dt + 0.5 * (AtangentX + AnormalX) * Math.pow(dt,2);
          posY = posY + Vy * dt + 0.5 * (AtangentY + AnormalY) * Math.pow(dt,2);
          
          Vx = Vx + (AtangentX + AnormalX) * dt;
          Vy = Vy + (AtangentY + AnormalY) * dt;
          Vxy = Math.sqrt(Math.pow(Vx,2) + Math.pow(Vy,2));
          
          etx = Vx / (Math.sqrt(Math.pow(Vx,2)+Math.pow(Vy,2)));
          ety = Vy / (Math.sqrt(Math.pow(Vx,2)+Math.pow(Vy,2)));
          
          enx = ety;
          eny = -etx;
          
          //AtangentX = AccelInput * etx;
          //AtangentY = AccelInput * ety;
          AtangentX = (-AccelInput+1)/2 * etx;
          AtangentY = (-AccelInput+1)/2 * ety;
          
          AnormalX = Math.pow(Vxy,2) / rho * enx;
          AnormalY = Math.pow(Vxy,2) / rho * eny;
          
          cos_posY=Math.cos(Math.PI/4)*posY*0.6; // ******** POV cosine ********
          
          context.lineTo((posX*SCALE+centerX),(-cos_posY*SCALE+centerY));
          //context.lineTo(centerX+i/(Steering*3+1), centerY-Math.pow(i,2)/500);
          
          if(i==Lag){
            Lag_posX=posX*SCALE;
            Lag_posY=cos_posY*SCALE;
          }
          
        }



      context.lineJoin = 'round'; // round line join (middle)
      context.lineWidth = 6; // *******Line width*******
      context.strokeStyle = 'rgb(43,221,11)';
      context.stroke(); //draw prediction line
      
      context.beginPath();
      context.moveTo(context.canvas.width,context.canvas.height);
      context.lineTo(centerX+Lag_posX+context.canvas.width*2/6,-Lag_posY+centerY);
      context.lineTo(centerX+Lag_posX+context.canvas.width*1/6,-Lag_posY+centerY);
      context.moveTo(centerX+Lag_posX-context.canvas.width*1/6,-Lag_posY+centerY);
      context.lineTo(centerX+Lag_posX-context.canvas.width*2/6,-Lag_posY+centerY);
      context.lineTo(0,context.canvas.height);
      context.lineWidth = 6;
      context.strokeStyle = 'rgb(255,0,0)';
      context.stroke(); //draw car position (red box on the bottom)
      
      context.beginPath();
      context.arc(centerX+Lag_posX, -Lag_posY+centerY, 2, 0, 2 * Math.PI, false);
      context.fillStyle = 'rgb(255,0,0)';
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = 'rgb(255,0,0)';
      context.stroke(); // draw red dot on prediction line (just in case)
      
      
      preSteering=Steering;

      var start = rAF(drawLoop);
    };