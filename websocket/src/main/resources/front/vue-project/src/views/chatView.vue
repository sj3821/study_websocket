<template>
    <div>
        <div id="main-content" class="container">
            <div class="row">
                <div class="col-md-6">
                    <form class="form-inline">
                        <div class="form-group">
                            <label for="connect">WebSocket connection:</label>
                            <button id="connect" class="btn btn-default" type="submit" :disabled="connected == true"
                                @click.prevent="connect">Connect</button>
                            <button id="disconnect" class="btn btn-default" type="submit" :disabled="connected == false"
                                @click.prevent="disconnect">Disconnect
                            </button>
                        </div>
                    </form>
                </div>
                <div class="col-md-6">
                    <form class="form-inline">
                        <div class="form-group">
                            <input type="text" id="name" class="form-control" v-model="send_name" placeholder=" Your
                                name here...">
                            <input type="text" id="message" class="form-control" v-model="send_message"
                                placeholder="Send Msg...">
                        </div>
                        <button id="send" class="btn btn-default" type="submit" @click.prevent="send">Send</button>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <table id="conversation" class="table table-striped">
                        <thead>
                            <tr>
                                <th>Greetings</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in received_messages" :key="item">
                                <td>{{ item }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
    name: "websoeckdemo",
    data() {
        return {
            received_messages: [],
            send_message: null,
            send_name:null,
            connected: false,
            roomId: $route.params.roomId,
            sub_roomInfo: '/topic/chat/' + roomId,
            pub_roomInfo: '/app/chat/' + roomId
        };
    },
    methods: {
        send() {
            console.log("Send message:" + this.send_message);
            if (this.stompClient && this.stompClient.connected) {
                const msg = { name: this.send_message };
                this.stompClient.send(pub_roomInfo, JSON.stringify(msg), {});
            }
        },
        connect() {
            this.socket = new SockJS("http://localhost:8091/websocket-example");
            this.stompClient = Stomp.over(this.socket);
            this.stompClient.connect(
                {},
                frame => {
                    this.connected = true;
                    console.log(frame);
                    this.stompClient.subscribe(sub_roomInfo, tick => {
                        console.log(tick);
                        this.received_messages.push(JSON.parse(tick.body).content);
                    });
                },
                error => {
                    console.log(error);
                    this.connected = false;
                }
            );
        },
        disconnect() {
            if (this.stompClient) {
                this.stompClient.disconnect();
            }
            this.connected = false;
        },
        tickleConnection() {
            this.connected ? this.disconnect() : this.connect();
        }
    },
    mounted() {
        // this.connect();
    }
};
</script>

<style scoped>
</style>