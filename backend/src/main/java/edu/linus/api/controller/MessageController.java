package edu.linus.api.controller;

import edu.linus.api.entity.Category;
import edu.linus.api.entity.Messages;
import edu.linus.api.repository.MessageRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600, allowCredentials = "true", allowPrivateNetwork = "true")
@RestController // This means that this class is a Controller
@RequestMapping(path="/message") // This means URL's start with /demo (after Application path)
public class MessageController {

    MessageRepository messageRepository;

    public MessageController(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @GetMapping(path = "/all")
    public ResponseEntity<List<Messages>> getAllMessages() {
        List<Messages> messages = messageRepository.findAll();

        return ResponseEntity.ok(messages);
    }

    @PostMapping(path = "/add")
    public ResponseEntity<String> addMessasge (@RequestBody Messages messages){
        Messages messagesSave = messageRepository.save(messages);

        return ResponseEntity.status(HttpStatus.CREATED).body("Successfully added");
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<String> deleteMessage (@PathVariable Long id){
        messageRepository.deleteById(id);

        return ResponseEntity.ok().body("Successfully deleted");
    }




}
