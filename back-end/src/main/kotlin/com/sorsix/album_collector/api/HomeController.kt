package com.sorsix.album_collector.api

import com.sorsix.album_collector.domain.*
import com.sorsix.album_collector.service.AlbumService
import com.sorsix.album_collector.service.CollectorService
import com.sorsix.album_collector.service.PostService
import org.springframework.data.domain.Page
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = ["http://localhost:4200"])
class HomeController(
    val albumService: AlbumService,
    val postService: PostService,
    val collectorService: CollectorService
) {

    @GetMapping
    fun getAlbums() = albumService.getAll()

    @GetMapping("/albums/{albumId}")
    fun getStickers(@PathVariable albumId: Long): List<Sticker> {
        return albumService.getStickersForAlbum(albumId)
    }

    @PostMapping("/registerCollector")
    fun registerCollector(@RequestBody collector: CollectorRegistration): ResponseEntity<Collector> {
        println(collector)
        return ResponseEntity.ok(collectorService.createCollector(collector))
    }

    @GetMapping("/posts")
    fun getPostsPaginated(
        @RequestParam page: Int,
        @RequestParam pageSize: Int
    ): ResponseEntity<List<Post>> {
        return ResponseEntity.ok(postService.getAllPaginated(page, pageSize))
    }

    @PostMapping("/createPost")
    fun createPost(
        @RequestBody postCreator: PostCreator,
    ): ResponseEntity<Post> {
        println(postCreator)
        return ResponseEntity.ok(postService.create(postCreator))
    }

    @PutMapping("/updatePost/{postId}")
    fun updatePost(
        @PathVariable postId: Long,
        @RequestBody postCreator: PostCreator
    ): ResponseEntity<Post> {
        TODO()
    }

    @PostMapping("/importAlbum")
    fun uploadAlbum(
        @RequestParam file: MultipartFile,
        @RequestParam name: String,
        @RequestParam(required = false) image: String
    ): ResponseEntity<Album> {
        val album = albumService.importStickers(file, name, image)
        return ResponseEntity.ok(album)
    }
}