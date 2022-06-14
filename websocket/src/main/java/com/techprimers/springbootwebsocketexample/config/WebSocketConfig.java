package com.techprimers.springbootwebsocketexample.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*; 

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
    	registry.addEndpoint("/websocket-example").withSockJS();
       
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
    	
    	//클라이언트로 메세지를 응답 해 줄 때 prefix 정의 - 클라이언트가 메세지를 받을 때
    	registry.enableSimpleBroker("/topic"); //ex) stomp.subscribe("/topic/chat/room/",function(){})
    	// /room
    	
    	
    	//클라이언트에서 메세지 송신 시 붙일 prefix 정의 - 클라이언트가 메세지를 보낼때
    	registry.setApplicationDestinationPrefixes("/app"); //ex) stomp.send("/sub/chat/room/",function(){})
    	
    	//send
    	
    	
    	
    	/*
    	registry.addHandler(chatHandler, "/ws/chat")
        .setAllowedOriginPatterns("http://*:8080", "http://*.*.*.*:8080")
        .withSockJS()
        .setClientLibraryUrl("http://localhost:8080/myapp/js/sock-client.js");
        */
        //.setClientLibarayUrl은 그냥 sockjs CDN 주소를 입력해도 무관하다.
        //https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.1.2/sockjs.js
        
        /*
        Spring Boot에서 CORS 설정 시, .allowCredentials(true)와
        .allowedOrigins("*")는 동시 설정을 못하도록 업데이트 되었다고 한다.
        모든 주소를 허용하는 대신 특정 패턴만 허용하는 것으로 적용해야한다고 변동됨.
        
        .allowedOrigins("*") 대신 .allowedOriginPatterns("*")를 사용하면 에러는 해결이
        된다고 한다.
        
        나는 이처럼 하지 않고, http://localhost:8080 또는, IP 주소로 접속하기 때문에
        위에 설정처럼 하였다.
        */
    }
}
