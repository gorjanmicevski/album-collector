package com.sorsix.album_collector.api

import com.fasterxml.jackson.databind.util.JSONPObject
import com.sorsix.album_collector.domain.DTO
import com.sorsix.album_collector.domain.Event
import com.sorsix.album_collector.domain.Post
import com.sorsix.album_collector.service.AlbumService
import com.sorsix.album_collector.service.EventService
import com.sorsix.album_collector.service.PostService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = ["http://localhost:4200"])
class HomeController(
    val albumService: AlbumService,
    val postService: PostService,
    val eventService: EventService
) {

    @GetMapping
    fun getAlbums() = albumService.getAll()

    fun getStickers() {
        TODO()
    }

    fun updateStickers() {
        TODO()
    }

    @GetMapping("feed")
    fun getPosts(): DTO {
        println("feed")
//        return postService.getAll()
        return DTO("test")
    }

//    @PostMapping("/postPost")
//    fun createPost(@RequestBody postCreator: PostCreator) {
//        postService.create(postCreator)
//    }
    @PostMapping("feed")
    fun createPost(@RequestBody post:DTO) {
        println(post.test)
    }
    fun interactWithPost() {
        TODO()
    }

    fun getEvents() = eventService.getAll()

    fun createEvent(event: Event) = eventService.create(event)

    fun interactWithEvent() {
        TODO()
    }


}