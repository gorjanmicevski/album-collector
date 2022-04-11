package com.sorsix.album_collector.service

import com.sorsix.album_collector.api.PostCreator
import com.sorsix.album_collector.domain.Post

interface PostService {
    fun getAll(): List<Post>
    fun create(post: PostCreator): Post
    fun update(post: Post): Post
}