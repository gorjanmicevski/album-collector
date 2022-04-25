package com.sorsix.album_collector.api

import com.sorsix.album_collector.domain.*
import com.sorsix.album_collector.security.jwt.JwtUtils
import com.sorsix.album_collector.security.service.UserDetailsImpl
import com.sorsix.album_collector.service.AlbumService
import com.sorsix.album_collector.service.CollectorService
import com.sorsix.album_collector.service.PostService
import com.sorsix.album_collector.service.impl.PrivateAlbumInstanceService
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.net.URI
import kotlin.streams.toList

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = ["http://localhost:4200"])
class HomeController(
    val albumService: AlbumService,
    val postService: PostService,
    val collectorService: CollectorService,
    val privateAlbumInstanceService: PrivateAlbumInstanceService,
    val authenticationManager: AuthenticationManager,
    val jwtUtils: JwtUtils
) {

    @GetMapping
    fun getAlbums() = albumService.getAll()

    @GetMapping("/albums/{albumId}")
    fun getStickers(@PathVariable albumId: Long): List<Sticker> {
        return albumService.getStickersForAlbum(albumId)
    }

    @PostMapping("/auth/registerCollector")
    fun registerCollector(@RequestBody collectorRegistration: CollectorRegistration): ResponseEntity<Any> {
        if (collectorService.emailTaken(collectorRegistration.email)) {
            return ResponseEntity.badRequest().body("Error: Email already used")
        }
        return ResponseEntity.ok(collectorService.createCollector(collectorRegistration))
    }

    @PostMapping("/auth/login")
    fun login(@RequestBody loginRequest: LoginRequest): ResponseEntity<Any> {
            val authentication: Authentication = authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(loginRequest.email, loginRequest.password)
        )
        SecurityContextHolder.getContext().authentication = authentication
        val jwt: String = jwtUtils.generateJwtToken(authentication)

        val userDetails: UserDetailsImpl = authentication.principal as UserDetailsImpl
        val roles: List<String> = userDetails.authorities.stream()
            .map { it.authority }
            .toList()
        return ResponseEntity.ok(
            JwtResponse(
                token = jwt,
                id = userDetails.id,
                name = userDetails.name,
                surname = userDetails.surname,
                email = userDetails.email,
                roles = roles,
                albums = userDetails.albums,
                profilePicture = userDetails.profilePicture
            )
        )
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
        @RequestParam(required = false) imageMissing: MultipartFile?,
        @RequestParam(required = false) imageDuplicates: MultipartFile?
    ): ResponseEntity<Post> {
        println(postCreator)
        return ResponseEntity.ok(
            postService.create(
                post = postCreator,
                imageDuplicates = imageDuplicates,
                imageMissing = imageMissing
            )
        )
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
        @RequestParam image: MultipartFile
    ): ResponseEntity<Album> {
        val album = albumService.importStickers(file, name, image)
        return ResponseEntity.ok(album)
    }
    @GetMapping("/album/{id}/image")
    fun getAlbumImage(@PathVariable id: Long):ResponseEntity<Any>{
        val image: ByteArray = albumService.getAlbumImage(id)
        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(MediaType.IMAGE_JPEG_VALUE))
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"${System.currentTimeMillis()}\"")
            .body(image)
    }

    @PostMapping("/privateAlbum/create")
    fun addAlbumForCollector(
        @RequestParam collectorId: Long,
        @RequestParam albumId: Long
    ): ResponseEntity<PrivateAlbumInstance> {
        return ResponseEntity.ok(privateAlbumInstanceService.createPrivateInstance(collectorId, albumId))
    }

    @GetMapping("/privateAlbum/missingStickers")
    fun getMissingStickers(
        @RequestParam collectorId: Long,
        @RequestParam albumId: Long
    ): ResponseEntity<String> {
        return ResponseEntity.ok(privateAlbumInstanceService.getMissingStickers(collectorId, albumId))
    }

    @PutMapping("/privateAlbum/collectSticker")
    fun collectSticker(
        @RequestParam collectorId: Long,
        @RequestParam albumId: Long,
        @RequestParam stickerNumber: String
    ) {
        privateAlbumInstanceService.addNewCollectedSticker(collectorId, albumId, stickerNumber)
    }

    @GetMapping("/privateAlbums/{collectorId}")
    fun getPrivateAlbums(
        @PathVariable collectorId: Long
    ): ResponseEntity<List<PrivateAlbumInstance>> {
        return ResponseEntity.ok(collectorService.getPrivateAlbums(collectorId))
    }
}