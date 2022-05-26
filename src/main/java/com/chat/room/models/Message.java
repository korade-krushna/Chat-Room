package com.chat.room.models;

import java.time.LocalTime;

public class Message {
    private String name;
    private String Content;
    private String time;

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Message(String name , String content , String time) {
        this.name = name;
        Content = content;
        this.time = time;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return Content;
    }

    public void setContent(String content) {
        Content = content;
    }
}
