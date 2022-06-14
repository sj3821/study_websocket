var stompClient = null;
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('roomId');

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#userinfo").html("");
}

$(document).ready(function() {
	connect();
	
	loadMsgHist();
	
});


function loadMsgHist(){
	var htmlCode='';
	$.ajax({
	    url: "/chat/msghist?roomId="+roomId,
	    type: "get",
	    dataType: "json",
	    success: function(ret){
		for(var i=0; i<ret.length;i++){
				htmlCode+="<tr><td>" + ret[i].name + ":" + ret[i].message + "</td></tr>";
		}	 
	  		$("#userinfo_before").append(htmlCode);
	  		
		} 
	});
}
 

function connect() {
    var socket = new SockJS('/websocket-example');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        
        var roomInfo = '/topic/chat/'+roomId;
        stompClient.subscribe(roomInfo, function (greeting) {
		//(Object) subscribe(destination, callback, headers = {})
	    //명명된 목적지"/topic/user"을 구독합니다.
            showGreeting(JSON.parse(greeting.body));
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
	var roomInfo = '/app/chat/'+roomId;
    stompClient.send(roomInfo, {}, JSON.stringify({'name': $("#name").val(), 'message':$("#message").val()}));
    //(void) send(destination, headers = {}, body = '')
	//명명된 목적지 "/app/user"로 메세지를 보냅니다.
	
	$("#message").val("");
}

function showGreeting(message) {
    $("#userinfo").append("<tr><td>" + message.name + ":" + message.message + "</td></tr>");
}


$(function () {
	
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});