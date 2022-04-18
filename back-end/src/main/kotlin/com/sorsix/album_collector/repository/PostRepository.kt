package com.sorsix.album_collector.repository

import com.sorsix.album_collector.domain.Post
import org.springframework.data.domain.Page
import org.springframework.data.jpa.repository.JpaRepository
import java.awt.print.Pageable

interface PostRepository : JpaRepository<Post, Long> {
//    fun findAll(pageable: Pageable): Page<Post>
}