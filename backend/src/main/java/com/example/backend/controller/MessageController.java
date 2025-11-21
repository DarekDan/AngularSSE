package com.example.backend.controller;

import com.example.backend.service.SseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.NonNull;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allow all for MVP, restrict in prod
public class MessageController {

    private final SseService sseService;

    @GetMapping("/sse")
    public SseEmitter subscribe() {
        return sseService.addEmitter();
    }

    @PostMapping("/message")
    public void sendMessage(@RequestBody @NonNull String message) {
        if (StringUtils.isNotBlank(message)) {
            sseService.send(message);
        }
    }
}
