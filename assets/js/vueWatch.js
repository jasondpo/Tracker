const STORAGE_KEY="projectStorage"

const project = [
    {
      title: 'Jogging', 
      description: "A delightful children's book.",
      notes:"First of five notes for this project",
      completed: false
    },
    {
      title: 'Walking', 
      description: "Create a world of happy little trees!",
      notes:"Second of five notes for this project",
      completed: false
    },
    {
      title: 'Running', 
      description: "A (literally) neverending roadtrip.",
      notes:"Third of five notes for this project",
      completed: false
    },
    {
      title: 'Treadmill', 
      description: "Hours of beautiful but heart attack-inducing nature footage",
      notes:"Fourth of five notes for this project",
      completed: false
    },
    {
      title: 'Weight Lifting', 
      description: "The boat sinks.",
	  notes:"Fifth of five notes for this project",
	  completed: false      
    }
  ]


firstApp = new Vue({
	el:"#main-App",
	data:{
		newActivity:"",
		newDescription:"",
		projectName:"",
		isVisible: false,
		projectList:project
	},
    created(){
		this.projectList=JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
	},	
	methods:{
		saveActivity(){
			this.projectList.unshift({
				title: this.newActivity,
				description: this.newDescription,
				notes:"",
				completed: false
			})
			this.newActivity="";
			this.newDescription="";
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.projectList))				
		},
		deletecard(project){
			this.projectList.splice(this.projectList.indexOf(project),1)
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.projectList))	
		}
	},
	
})

//////////////// jQuey BELOW  ////////////////
/*
	NOTES: 
	1) Vuejs does not want to display the first option in the "select" list. Don't know how to solve. 
	2) Don't know how to list options inside "select" in alphabetical order using Vue 
*/

 	
function prependSelect(){
 	select = document.getElementById('projectListTest');
	var opt = document.createElement('option');
    opt.value = "Select Activity";
    opt.innerHTML = "Select Activity";
    select.prepend(opt);
	$("#projectListTest").val($("#projectListTest option:first").val());
}

$(function(){
	resetList();
	prependSelect();
	$(".timer-footer-nav-btn, h18").click(function(){
		if ($('.addToList-section').css('display') == "none"){
			    $(".timer-footer-nav-btn").css('-webkit-transform', 'rotateZ(-360deg)');
			    $(".timer-footer-nav-btn").css('-moz-transform', 'rotateZ(-360deg)');
			    $(".timer-footer-nav-btn").css('transform', 'rotateZ(-360deg)');
			    $(".activities").fadeOut("fast", function(){
					$(".stopwatch").fadeIn("fast");
				})
				$(".timer-footer-nav-btn").css({"background-color":"#321E41","background-image":"url(assets/images/clock-icon.png)"});
				$(".timer-footer-bkg").css("background-color","#FF4874");      
				$('.timer-section').fadeOut('fast', function(){
				$(".addToList-section").fadeIn('fast');

			});			
		}else{
			resetList();
			prependSelect();
				$(".timer-footer-nav-btn").css('-webkit-transform', 'rotateZ(0deg)');
				$(".timer-footer-nav-btn").css('-moz-transform', 'rotateZ(0deg)');
				$(".timer-footer-nav-btn").css('transform', 'rotateZ(0deg)');
			    $(".stopwatch").fadeOut("fast", function(){
					$(".activities").fadeIn("fast");
				})				
				$(".timer-footer-nav-btn").css({"background-color":"#FF4874","background-image":"url(assets/images/running-icon.png)"});
				$(".timer-footer-bkg").css("background-color","#321E41");      			      	
				$('.addToList-section').fadeOut('fast', function(){
				$(".timer-section").fadeIn('fast');
			});
		}
	});



	// This 1)takes info from local storage, 2)maps the "titles" 3) arranges them in alphabetical order of the "select's" list of <option> tags
	function resetList(){
		myList=JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
		
		var result = myList.map(a => a.title);
		result=result.sort()
		
		var text = "";
		var i = 0;
		while (i < result.length) {
		    text += "<option>"+result[i]+"</option>";
		    i++;
		}
		$("#projectListTest").html(text);
	}
})		
//// START & STOP BUTTONS ////	



var Active = false;

$(".startStop-btn").click(function(){
	if(Active == false ){	        
		if($("#projectListTest").val()!="Select Activity"){
		$("#startTime").val(getTime());
		$(".startBtn").text("stop");
		$(".startStop-btn").addClass("startStop-btn-active");
		startTimer();
		Active = true;
		}else{
			alert("Choose an activity");
		}
	}else{
		if(Active == true ){
			$("#endTime").val(getTime());
			diff();
			showTitles();
			$(".startBtn").text("start");
			$(".startStop-btn").removeClass("startStop-btn-active");
			stopTimer();
			Active = false;
		}
	};
		
});


function startTimer(){
	$('.logoTimerBox').css("background-image", "url(assets/images/stopWatchAnimation.png)");	
	var timer=1;
	mainTimer = setInterval(function(){
		timer++
		if(timer==1){
			$('.logoTimerBox').css("background-position", "top left");
		}if(timer==2){
			$('.logoTimerBox').css("background-position", "top right");
		}if(timer==3){
			$('.logoTimerBox').css("background-position", "bottom right");
		}if(timer==4){
			$('.logoTimerBox').css("background-position", "bottom left");
		}	
		if(timer==4){timer=0}
	}, 250);
}

function stopTimer(){
	clearInterval(mainTimer);
	$('.logoTimerBox').css("background-image", "url(assets/images/greyLogo.png)");		
}
///////////	GET TIME ///////
/* This is the start time and end time. The "diff" function calculates the difference*/
	function getTime(){
		var d = new Date();
	    var h= d.getHours();
	    var m= addZero(d.getMinutes());
	    var s= addZero(d.getSeconds());
	    var ms= addZero((d.getMilliseconds()/10).toFixed(0));
	    var startTime =h+":"+m+":"+s;
		
		return startTime;
	}

	
///////////	CALCULATE TIME DIFFERENCE ///////
	function diff(start, end) {
		
		var start = $("#startTime").val();
		var end = $("#endTime").val();
				
	    start = start.split(":");	   	    
	    end = end.split(":");
	    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
	    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
	    var diff = endDate.getTime() - startDate.getTime();
	    var hours = Math.floor(diff / 1000 / 60 / 60);
	    diff -= hours * 1000 * 60 * 60;
	    var minutes = Math.floor(diff / 1000 / 60);
	    var seconds = Math.floor(diff / 1000);
	    
	    $("#diff").val((hours < 9 ? "0" : "") + hours + "h:" + (minutes < 9 ? "0" : "") + minutes+"m")   
	}

	
///////////////	
	function addZero(i) {
	    if (i < 10) {
	        i = "0" + i;
	    }
	    return i;
	}
			
///////////	GET DAY TIME ///////
	function getDayTime(){
		var d = new Date();
	    var h = d.getHours();
	    var m = addZero(d.getMinutes());
	    return timeDay = h > 12 ? h-12 + ":" + m+' pm' : h + ":" + m+' am' ;
	}
////////////////////////////////////

	function showTitles(){
		var	value1 = $(".projectNameCapture").text(),
			value2 = $("#diff").val(),
			value4 = Math.floor((Math.random() * 100000) + 1);
			storedMessagesJSON = localStorage.displayMessages || '[]',
            storedMessages = JSON.parse(storedMessagesJSON),
            displayMessage = $('#timeKeeperContainer').val();
				    		    
		    storedMessages.unshift({
				title: value1,
				time: value2,
				notes:"This is jason",
				id:value4,
			})
			$("#diff, #startTime, #startTime, #endTime").val("");
		    localStorage.displayMessages = JSON.stringify(storedMessages);
            showMessages();
    }
 
   function showMessages() {
            storedMessagesJSON = localStorage.displayMessages || '[]';
            storedMessages = JSON.parse(storedMessagesJSON);
		var tex = "";
		var z = 0;
			while (z < storedMessages.length) {
			    tex += "<li  onclick='showNotes(this)' class='listItem' id='"+storedMessages[z].id+"'><div class='deleteMe' onclick='deleteItem(this)'></div>"+storedMessages[z].title+"</li>";
			    z++;
		}
			$("#timeKeeperContainer").html(tex);
    }
    
    showMessages();
  
	$("#clear").click(function(){
		window.localStorage.removeItem("displayMessages");
		showMessages()	
	})
	
	function deleteItem(obj){
		getID=$(obj).closest("li").attr("id");		
		for (var i = 0; i < storedMessages.length; i++) {
		    if (storedMessages[i].id == getID) {
		        storedMessages.splice(i, 1);
		        localStorage.displayMessages = JSON.stringify(storedMessages);
		        showMessages()
		        break;
		    }
		}    		
	}	    

	function changeNote(){
		newNotes=$("#userNotes").val();
		getID=$("#notesId").val();		
		for (var i = 0; i < storedMessages.length; i++) {
		    if (storedMessages[i].id == getID) {
				storedMessages[i].notes = newNotes;
		        localStorage.displayMessages = JSON.stringify(storedMessages);
		        showMessages()
		    }
		}    		
	}	


	function showNotes(obj){
		getID=$(obj).attr("id");		
		for (var i = 0; i < storedMessages.length; i++) {
		    if (storedMessages[i].id == getID) {
				$("#userNotes").val(storedMessages[i].notes);
				$("#notesId").val(getID)
		    }
		}    		
	}		
///////////////////////////////////////////////////////////////////////
	
	// Array of day names
	var dayNames = new Array("SUN","MON","TUE","WED","THU","FRI","SAT");
	
	// Array of month Names
	var monthNames = new Array(
	"JAN","FEB","MAR","APR","MAY","JUNE","JULY","AUG","SEP","OCT","NOV","DEC");
	
	var now = new Date();
	
	$(".date").html(dayNames[now.getDay()] + ", " + monthNames[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear());
	
	
////////////////////////////// Log Book /////////////////////////////////////////


$(".showlog-btn").click(function(){
	$(".logBook-overlay").fadeIn();
})
$(".logBook-overlay-close").click(function(){
	$(".logBook-overlay").fadeOut();
})







