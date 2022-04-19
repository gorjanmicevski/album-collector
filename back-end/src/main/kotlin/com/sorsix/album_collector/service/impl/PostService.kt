package com.sorsix.album_collector.service.impl

import com.sorsix.album_collector.api.PostCreator
import com.sorsix.album_collector.domain.Post
import com.sorsix.album_collector.repository.AlbumRepository
import com.sorsix.album_collector.repository.CollectorRepository
import com.sorsix.album_collector.repository.PostRepository
import com.sorsix.album_collector.service.PostService
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import java.awt.print.Pageable
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

    override fun create(post: PostCreator): Post {
        val collector = collectorRepository.findById(post.collectorId).get()
        return postRepository.save(
            Post(
                collector = collector,
                collectorName = collector.name,
                description = post.description,
                phone = post.phone,
                location = post.location,
                albumName = post.albumName,
                duplicateStickers = post.duplicateStickers,
                missingStickers = post.missingStickers,
                dateTimeCreated = LocalDateTime.now()
            )
        )
    }

    override fun update(post: PostCreator, postId: Long): Post {
        val postToUpdate = postRepository.findById(postId).get()
        val collector = collectorRepository.findById(post.collectorId).get()
        TODO()
    }
}