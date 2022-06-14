package com.techprimers.springbootwebsocketexample.resource;

import java.util.ArrayList;
import java.util.List;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.techprimers.springbootwebsocketexample.model.ChatRoom;

@Controller
public class ChatRoomController {
	private List<ChatRoom> chatroomList = new ArrayList<ChatRoom>();
	
	@RequestMapping(value="/chatRoom/list", method=RequestMethod.GET)
	@ResponseBody
	public List<ChatRoom> selectChatRoomList() {
        return chatroomList;
    } 
	
	@MessageMapping("/chatRoom/")
	@SendTo("/topic/chatRoom/")
	public ChatRoom chatroom(ChatRoom chatRoom){
		chatroomList.add(chatRoom);
        return chatRoom;
	}
	
	@RequestMapping(value="/chatRoom/createRoom", method=RequestMethod.POST)
	@ResponseBody
    public List<ChatRoom> createChatRoom(String roomNum) {
		ChatRoom newRoom = new ChatRoom();
		newRoom.setRoomNum(roomNum);
		chatroomList.add(newRoom);
        return chatroomList;
    }
}
