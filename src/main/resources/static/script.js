var stompClient = null

    function connect() {
        let socket = new SockJS("/server1")
        stompClient = Stomp.over(socket)
        stompClient.connect({}, function(frame) {
            //console.log('Connection established : ' + frame)
            $("#name-form").addClass('d-none')
            $("#chat-room").removeClass('d-none')
            stompClient.subscribe("/topic/return-to", function(response) {
                showMessage(JSON.parse(response.body))
            })
        })
    }
    function showMessage(message) {
        //console.log(message)
        $("#message-container-table").prepend(`<tr>
                                            <td>
                                                <b>
                                                    ${message.name}
                                                </b>
                                                <sub>
                                                    ${message.time}
                                                </sub>
                                                :
                                                ${message.content}
                                            </td>
                                        </tr>`
        )
    }
    function sendMessage() {
        let jsonOb = {
                name: localStorage.getItem("name"),
                content: $("#message-value").val(),
                time: new Date().toLocaleTimeString()
        }
        stompClient.send("/app/message", {}, JSON.stringify(jsonOb));
    }

    $(document).ready((e) => {
        $("#login").click(() => {
            let name = $("#name-value").val()
            localStorage.setItem("name", name)
            $("#heading-name").html(`Welcome, <b> ${name} </b>`)
            connect()
        })
        $("#send").click(() => {
            sendMessage()
        })
        $("#logout").click(() => {
            localStorage.removeItem("name")
            if(stompClient != null){
                stompClient.disconnect()
            }
            $("#chat-room").addClass('d-none')
            $("#name-form").removeClass('d-none')
        })
    })