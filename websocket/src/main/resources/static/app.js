var stompClient = null;

$(document).ready(function() {
	loadRoom();
});

function loadRoom(){
	var htmlCode='';
	$.ajax({
	    url: "/chatRoom/list",
	    type: "get",
	    dataType: "json",
	    success: function(ret){
		for(var i=0; i<ret.length;i++){
				htmlCode+='<tr><td><a href="/chat.html?roomId='+ret[i].roomNum+ '">' + ret[i].roomNum + "</a></td></tr>";
		}	 
	  		$("#userinfo").append(htmlCode);
	  		
		} 
	});
}
 
function createRoom() {
	$("#userinfo").html("");	
	var newRoomNum = $("#roomNum").val();
	var htmlCode=''; 
	
    $.ajax({
	    url: "/chatRoom/createRoom",
	    type: "post",
	    dataType: "json",
	    data: {'roomNum':newRoomNum},
	    success: function(ret){
		
		for(var i=0; i<ret.length;i++){
				htmlCode+='<tr><td><a href="/chat.html?roomId='+ret[i].roomNum+ '">' + ret[i].roomNum + "</a></td></tr>";
		}	 
	  	$("#userinfo").append(htmlCode);
	  	$("#roomNum").val("");	
		} 
	});
}

 



function showGreeting(message) {
    $("#userinfo").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    
    
    $( "#send" ).click(function() { createRoom(); });
});