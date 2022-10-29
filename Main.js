var canvas;
var stage;
var center_x;
var center_y;

var e_l = 0.2;
var g = 0.5;
var bool_number = 25;
var hit_number;
var obj_bools = [];
var obj_bools_x =[];
var obj_bools_y =[];
var obj_bools_V_x =[];
var obj_bools_V_y =[];
var obj_bools_A_x =[];
var obj_bools_A_y =[];
var obj_bools_R =[];
var obj_bools_M =[];
var obj_bools_rotation =[];
var obj_bools_k = [];
var hit_obj =[];
var i;
var j;
var o;
var p;
var s;
var w_x;
var w_y;
var w_x_2;
var w_y_2;
var v_x;
var v_y;
var nai_seki;
var v_unit;
var v;
var k_distance;
var k_x;
var k_y;
var V_x_k =[];
var V_y_k =[];
var V_x_k_before =[];
var V_y_k_before =[];
var r;
var bool;
var timer;
var timer2;
var count;

function init(){
	canvas = document.getElementById("mycanvas");
	stage = new createjs.Stage(document.getElementById("mycanvas"));
	center_x = stage.canvas.width/2;
	center_y = stage.canvas.height/2;

	for(i = 0; i < bool_number; i++){
		var bool = new createjs.Container();
		var center_1 = new createjs.Shape();
		center_1.graphics.beginStroke("#fff").moveTo(-5,-40).lineTo(5,-40).endStroke();
		center_1.regX = center_1.regY = 0;
		var center_2 = new createjs.Shape();
		center_2.graphics.beginStroke("#fff").moveTo(0,-45).lineTo(0,-35).endStroke();
		center_2.regX = center_2.regY = 0;
		var center_3 = new createjs.Shape();
		center_3.graphics.beginStroke("#fff").moveTo(-5,40).lineTo(5,40).endStroke();
		center_3.regX = center_3.regY = 0;
		var center_4 = new createjs.Shape();
		center_4.graphics.beginStroke("#fff").moveTo(0,35).lineTo(0,45).endStroke();
		center_4.regX = center_4.regY = 0;
		var shape = new createjs.Shape();
		shape.graphics.beginFill("#ff1585");
		shape.graphics.drawCircle(0, 0, 50);
		stage.addChild(bool);
		bool.addChild(shape);
		bool.addChild(center_1);
		bool.addChild(center_2);
		bool.addChild(center_3);
		bool.addChild(center_4);
		bool.x = Math.random() * stage.canvas.width;
		bool.y = -1 * Math.random() * 1000;
		bool.rotation = Math.random() * 365;
		scale = Math.random() * 0.5 + 0.5;
		bool.scaleX = bool.scaleY = scale;
		obj_bools_x[i] = bool.x
		obj_bools_y[i] = bool.y;
		obj_bools_V_x[i] = Math.random() * 200 - 100;
		obj_bools_V_y[i] = Math.random() * 200 - 100;
		obj_bools_A_x[i] = 0;
		obj_bools_A_y[i] = 0;
		obj_bools_R[i] = 48 * scale;
		obj_bools_M[i] = 5000 * scale;
		obj_bools_k[i] = 26;
		obj_bools_rotation[i] = bool.rotation;
		obj_bools.push(bool);
	}
	stage.update();
	createjs.Ticker.setFPS(50);
	createjs.Ticker.addEventListener("tick", act);

	function act(evt){
		stage.update();
		for(i = 0; i < bool_number; i++){
			obj_bools_A_y[i] = obj_bools_A_y[i] + g;
			obj_bools_V_y[i] = obj_bools_V_y[i] + obj_bools_A_y[i];
			
			if(Math.abs(obj_bools_V_y[i]/2.5) <= 1.5){
				obj_bools_V_y[i] = 0;
			}
			if(Math.abs(obj_bools_V_y[i]/2.5) >= 200){
				obj_bools_V_y[i] = 150;
			}
			obj_bools_y[i] =obj_bools_y[i] + obj_bools_V_y[i] /2.5;

			obj_bools_A_x[i] = obj_bools_A_x[i];
			obj_bools_V_x[i] = obj_bools_V_x[i] + obj_bools_A_x[i];
			
			if(Math.abs(obj_bools_V_x[i]/2.5) <= 0.7){
				obj_bools_V_x[i] = 0;
			}
			if(Math.abs(obj_bools_V_x[i]/2.5) >= 200){
				obj_bools_V_x[i] = 150;
			}
			obj_bools_x[i] =obj_bools_x[i] + obj_bools_V_x[i] /2.5;
			
			obj_bools_rotation[i] += obj_bools_V_x[i];
				
			if((obj_bools_y[i] + (obj_bools_R[i])) >= stage.canvas.height){
				obj_bools_A_y[i] = 0;
				obj_bools_V_y[i] = -1 * e_l * obj_bools_V_y[i];
			
				obj_bools_y[i] = stage.canvas.height - (obj_bools_R[i]);
			}
		
			if((obj_bools_x[i] - (obj_bools_R[i])) <=0){
				obj_bools_A_x[i] = 0;
				obj_bools_V_x[i] = -1 * e_l * obj_bools_V_x[i];
			
				obj_bools_x[i] = 0 + (obj_bools_R[i]);
				obj_bools_x[i] = obj_bools_x[i];
			}
			if((obj_bools_x[i] + (obj_bools_R[i])) >=stage.canvas.width){
				obj_bools_A_x[i] = 0;
				obj_bools_V_x[i] = -1 * e_l * obj_bools_V_x[i];
			
				obj_bools_x[i] = stage.canvas.width - (obj_bools_R[i]);
				obj_bools_x[i] = obj_bools_x[i];
			}
			obj_bools_rotation[i] += obj_bools_V_x[i] * 0.00000001;

			bool_obj_one = obj_bools[i];
			bool_obj_one.x = obj_bools_x[i];
			bool_obj_one.y = obj_bools_y[i];
			bool_obj_one.rotation = obj_bools_rotation[i];
		}
		for(i = 0; i < bool_number; i++){
			hit_number = 0;
			for(j = 0; j < bool_number; j++){
				if(i != j){
					if(Math.sqrt((obj_bools_x[j] -obj_bools_x[i]) * (obj_bools_x[j] -obj_bools_x[i]) +(obj_bools_y[j] -obj_bools_y[i]) * (obj_bools_y[j] -obj_bools_y[i])) <= obj_bools_R[i] + obj_bools_R[j]){
						obj_bools_A_y[i] = 0.05;
						k_distance = Math.sqrt((obj_bools_x[j] -obj_bools_x[i])*(obj_bools_x[j] -obj_bools_x[i]) + (obj_bools_y[j] -obj_bools_y[i])*(obj_bools_y[j] -obj_bools_y[i]));
						r = (obj_bools_R[i] + obj_bools_R[j]);
						
						k_x = (obj_bools_x[j] -obj_bools_x[i]) / k_distance;
						k_y = (obj_bools_y[j] -obj_bools_y[i]) / k_distance;

						V_x_k[i] = (-1) * obj_bools_k[i] * k_x;
						V_y_k[i] = (-1) * obj_bools_k[i] * k_y;
						
						if(Math.abs(V_x_k[i]) < 20){
							V_x_k[i] =0;
						}
						if(Math.abs(V_y_k[i]) < 20){
							V_y_k[i] =0;
						}
						obj_bools_V_x[i] = obj_bools_V_x[i] + V_x_k[i]/2.3;
						obj_bools_V_y[i] = obj_bools_V_y[i] + V_y_k[i]/2.3;
						
						V_x_k[i] = 0;
						V_y_k[i] = 0;
			
						obj_bools_V_x[i] = obj_bools_V_x[i];
						obj_bools_V_y[i] = obj_bools_V_y[i];
						
						nai_seki = obj_bools_V_x[i] * (obj_bools_x[j] -obj_bools_x[i]) + obj_bools_V_y[i] * (obj_bools_y[j] -obj_bools_y[i]);
						if(nai_seki > 0){
							console.log("hit");
							hit_obj.push(j);
							hit_number = hit_number + 1;
						}
					}
				}
			}
			Hit(i,hit_obj,hit_number);
			for(o = 0; o < hit_number; o++){
				console.log("hit");
				hit_obj.shift();
			}
		}
	}
	function Hit(i, obj, number){
		for(p = 0; p < number; p++){
			console.log("hit");
			w_x = obj_bools_x[obj[0]] - obj_bools_x[i];
			w_y = obj_bools_y[obj[0]] - obj_bools_y[i];
		
			v = (obj_bools_V_x[i] / number) * w_x + (obj_bools_V_y[i] / number) * w_y;
			v_unit = Math.sqrt(w_x * w_x + w_y * w_y);
							
			v_x = v / (v_unit * v_unit) * w_x;
			v_y = v / (v_unit * v_unit) * w_y;
				
			w_x_2 = obj_bools_V_x[i] - v_x;
			w_y_2 = obj_bools_V_y[i] - v_y;
			
			if(Math.abs(v_x) < 10){
				v_x = 0;
			}
			if(Math.abs(v_y) < 10){
				v_y = 0;
			}
			obj_bools_V_x[i] = (-1)* 0.05 * v_x + w_x_2;
			obj_bools_V_y[i] = (-1)* 0.05 * v_y + w_y_2;
							
			obj_bools_V_x[i] = obj_bools_V_x[i];
			obj_bools_V_y[i] = obj_bools_V_y[i];
			
			obj_bools_V_x[obj[0]] = obj_bools_V_x[obj[0]] + obj_bools_M[i] / obj_bools_M[obj[0]] *0.05 * v_x;
			obj_bools_V_x[obj[0]] = obj_bools_V_y[obj[0]] + obj_bools_M[i] / obj_bools_M[obj[0]] *0.05 * v_y;
		
			obj.shift();

		}
	}
}

