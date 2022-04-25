package com.sorsix.album_collector.service.impl

import com.sorsix.album_collector.api.PostCreator
import com.sorsix.album_collector.domain.Post
import com.sorsix.album_collector.repository.AlbumRepository
import com.sorsix.album_collector.repository.CollectorRepository
import com.sorsix.album_collector.repository.PostRepository
import com.sorsix.album_collector.service.PostService
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.time.LocalDateTime

@Service
class PostService(
    val postRepository: PostRepository,
    val collectorRepository: CollectorRepository,
    val albumRepository: AlbumRepository
) : PostService {
    override fun getAllPaginated(page: Int, pageSize: Int): List<Post> {
        return postRepository.findAll(PageRequest.of(page - 1, pageSize)).content
    }

    override fun create(post: PostCreator, imageMissing: MultipartFile?, imageDuplicates: MultipartFile?): Post {
        val collector = collectorRepository.findById(post.collectorId).get()
        val album = albumRepository.findById(post.albumId).get()
        return postRepository.save(
            Post(
                collector = collector,
                collectorName = collector.name,
                description = post.description,
                phone = post.phone,
                location = post.location,
                album = album,
                duplicateStickers = post.duplicateStickers,
                missingStickers = post.missingStickers,
                imageMissingStickers = imageMissing?.bytes,
                imageDuplicatesStickers = imageDuplicates?.bytes,
                dateTimeCreated = LocalDateTime.now()
            )
        )
    }

    override fun update(
        post: PostCreator,
        imageMissing: MultipartFile?,
        imageDuplicates: MultipartFile?,
        postId: Long
    ): Post {
        val postToUpdate = postRepository.findById(postId).get()
        val collector = collectorRepository.findById(post.collectorId).get()
        val album = albumRepository.findById(post.albumId).get()
        postToUpdate.description = post.description
        postToUpdate.phone = post.phone
        postToUpdate.location = post.location
        postToUpdate.album = album
        postToUpdate.duplicateStickers = post.duplicateStickers
        postToUpdate.missingStickers = post.missingStickers
        postToUpdate.imageMissingStickers = imageMissing?.bytes
        postToUpdate.imageDuplicatesStickers = imageDuplicates?.bytes
        postToUpdate.collectorName = collector.name
        return postRepository.save(postToUpdate)
    }
}