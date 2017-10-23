var state = {
	running: false,
	current: true,
	msTime: 0,
	break: 5,
	work: 25,
	visual: 25
}

function render(){
	document.querySelector('#break #time').innerHTML = state.break;
	document.querySelector('#work #time').innerHTML = state.work;
	document.querySelector('#visual #time').innerHTML = state.running === '' ? state.work : state.visual ;
}

function adjVal(operation,group){
	if (operation == 'inc'){
		if (state[group] == 59){
			return
		}
		else{
			state[group] += 1;
		}
	}
	else if (operation == 'dec'){
		if(state[group] === 0){
			return
		}
		else{
			state[group] -= 1;
		}
	}
}
function displayTime(time){
	var date = new Date();
	var timeStr = '';

	date.setTime(time)
	timeStr = (date.toTimeString()).split(" ")
	timeStr = (timeStr[0].split(":")).slice(1)
	timeStr = timeStr.join(":")
	return timeStr;
}
function countdown(equation){
	state.msTime = equation;
	state.visual = displayTime(state.msTime)
	render();
}

function countdownFunc(){
	if (state.running){
		if (state.msTime > 0){
			countdown(state.msTime - 1000);
		}
		else if(state.current && state.msTime == 0){
			state.current = false
			countdown(state.break * 60 * 1000)
			document.getElementById('status').innerHTML = 'On Break'
			alert('Hey! Time to take a break!')
			window.open('https://www.youtube.com/watch?v=-vEs0zEl-PA')
		}
		else if (!state.current && state.msTime == 0){
			state.current = true;
			countdown(state.work * 60 * 1000)
			document.getElementById('status').innerHTML = 'Work Session'
			alert('Hey! Time to work now!')
			window.open('https://www.youtube.com/watch?v=-vEs0zEl-PA')
		}
	}
}


render();

var buttons = document.getElementsByClassName('pm')
var cdInterval = '';

Array.prototype.map.call(buttons,function(n){
	n.addEventListener('click',function(){
		adjVal(event.target.id,event.target.parentElement.id)
		state.running = '';
		state.msTime = 0;
		render();
	})
})

	

document.getElementById('start').addEventListener('click',function(){
	state.running = true
	this.disabled = true;
	document.getElementById('pause').disabled = false;
	Array.prototype.map.call(buttons,function(n){
		n.disabled = true
	})

	var n = state.msTime === 0 ? (state.work * 60 * 1000) : state.msTime
	countdown(n)

	cdInterval = setInterval(countdownFunc,1000)	
})

document.getElementById('pause').addEventListener('click',function(){
	state.running = false;
	this.disabled = true;
	document.getElementById('start').disabled = false;
	Array.prototype.map.call(buttons,function(n){
		n.disabled = false
	})
	clearInterval(cdInterval)
})

