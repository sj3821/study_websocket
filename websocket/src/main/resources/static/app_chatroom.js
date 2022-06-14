var stompClient = null;

$(document).ready(function() {
	connect();
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
 
 function connect() {
    var socket = new SockJS('/websocket-example');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        //setConnected(true);
        console.log('Connected: ' + frame);
        
        var roomInfo = '/topic/chatRoom/';
        stompClient.subscribe(roomInfo, function (greeting) {
		//(Object) subscribe(destination, callback, headers = {})
	    //명명된 목적지"/topic/user"을 구독합니다.
            showGreeting(JSON.parse(greeting.body));
        });
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

function sendName() {
	var roomInfo = '/app/chatRoom/';
    stompClient.send(roomInfo, {}, JSON.stringify({'roomNum': $("#roomNum").val()}));
    //(void) send(destination, headers = {}, body = '')
	//명명된 목적지 "/app/user"로 메세지를 보냅니다.
	
	$("#roomNum").val("");
}

 



function showGreeting(message) {
	console.log(message);
    $("#userinfo").append('<tr><td><a href="/chat.html?roomId='+message.roomNum+ '">'+ message.roomNum + "</a></td></tr>");
    
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    
    
    $( "#send" ).click(function() { sendName(); });
});