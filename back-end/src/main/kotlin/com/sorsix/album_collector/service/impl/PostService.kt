package com.sorsix.album_collector.service.impl

import com.sorsix.album_collector.api.PostCreator
import com.sorsix.album_collector.domain.Post
import com.sorsix.album_collector.repository.CollectorRepository
import com.sorsix.album_collector.repository.PostRepository
import com.sorsix.album_collector.service.PostService
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class PostService(val postRepository: PostRepository, val collectorRepository: CollectorRepository) : PostService {
    override fun getAll(): List<Post> = postRepository.findAll();

    override fun create(post: PostCreator): Post {
        val collector = collectorRepository.findById(post.collectorId)
        val duplicateStickers = post.duplicateStickers
        //duplikative vo stirng da se napraat ako gi ima
        val post = Post(
            collector = collector.get(),
            duplicateStickers = post.duplicateStickers.toString(),
            dateTimeCreated = LocalDateTime.now(),
            id = 0,
            imageDuplicatesStickers = null,
            imageMissingStickers = null,
            missingStickers = null
        )
        return post
    }


    override fun update(post: Post): Post {
        TODO("Not yet implemented")
    }
}