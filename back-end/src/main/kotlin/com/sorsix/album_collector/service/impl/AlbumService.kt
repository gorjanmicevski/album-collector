package com.sorsix.album_collector.service.impl

import com.sorsix.album_collector.repository.AlbumRepository
import com.sorsix.album_collector.service.AlbumService
import org.springframework.stereotype.Service

@Service
class AlbumService(val albumRepository: AlbumRepository) : AlbumService {
    override fun getAll() =albumRepository.findAll()
}