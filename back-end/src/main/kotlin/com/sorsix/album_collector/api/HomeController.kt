package com.sorsix.album_collector.api

import com.sorsix.album_collector.domain.*
import com.sorsix.album_collector.service.AlbumService
import com.sorsix.album_collector.service.CollectorService
import com.sorsix.album_collector.service.PostService
import org.springframework.data.domain.Page
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.net.URI

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

    @PostMapping("/setProfilePicture/{collectorId}")
    fun setProfilePicture(@PathVariable collectorId: Long, @RequestParam file: MultipartFile): ResponseEntity<Any> {
        collectorService.setProfilePicture(collectorId, file)
        return ResponseEntity.created(URI("/setProfilePicture/${collectorId}")).build()
    }

    @GetMapping("/getProfilePicture/{collectorId}")
    fun getProfilePicture(@PathVariable collectorId: Long): ResponseEntity<Any> {
        val image: ByteArray = collectorService.getProfilePicture(collectorId)
        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(MediaType.IMAGE_JPEG_VALUE))
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"${System.currentTimeMillis()}\"")
            .body(image)
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