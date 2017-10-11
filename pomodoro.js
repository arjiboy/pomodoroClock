var state = {
	current: 'work',
	break: 5,
	work: 25,
	visual: 25,
	msTime: ''
}

function render(n){
	document.querySelector('#break #time').innerHTML = state.break;
	document.querySelector('#work #time').innerHTML = state.work;
	document.querySelector('#visual #time').innerHTML = n
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

function countdown(time){
	var date = new Date();
	date.setTime(time)
	var timeStr = (date.toTimeString()).split(" ")
	timeStr = (timeStr[0].split(":")).slice(1)
	state.visual = timeStr.join(":")
	render(state.visual);
	state.msTime -= 1000
}

render(state.work);

var buttons = document.getElementsByClassName('btn')
for (i=0;i < buttons.length;i++){
	buttons[i].addEventListener('click',function(){
		adjVal(event.target.id,event.target.parentElement.id)
		render(state.work);
	})
}

document.getElementById('visual').addEventListener('click',function(){
	state.msTime = state.work * 60 * 1000;
	var x = setInterval(function(){
		countdown(state.msTime)
	},1000)
	if (state.msTime === 0){
		clearInterval(x)	
	}
})


//stop if 0
//if 0 run break
//disable buttons while running
//pause if clicked