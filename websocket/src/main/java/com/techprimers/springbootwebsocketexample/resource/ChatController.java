package com.techprimers.springbootwebsocketexample.resource;

import java.util.ArrayList;
import java.util.HashMap;
 
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.techprimers.springbootwebsocketexample.model.ChatMessage;


@Controller
public class ChatController {
	
	private HashMap<String, ArrayList<ChatMessage>> dic = new HashMap<String,ArrayList<ChatMessage>>();
	
	@MessageMapping("/chat/{roomId}")
	@SendTo("/topic/chat/{roomId}")
	public ChatMessage chat(@DestinationVariable("roomId") String roomId, ChatMessage chatMessage) {
		ArrayList<ChatMessage> list = new ArrayList<ChatMessage>();
		if(dic.containsKey(roomId)) {
			list = dic.get(roomId);
			list.add(chatMessage);
		}
		else {
			list.add(chatMessage);
		}
		dic.put(roomId, list);
		return chatMessage;
	}
	
	@RequestMapping(value="/chat/msghist", method=RequestMethod.GET)
	@ResponseBody
	public ArrayList<ChatMessage> selectChatRoomList(String roomId) {
		ArrayList<ChatMessage> list = new ArrayList<ChatMessage>();
		list = dic.get(roomId);
        return list;
    } 
}