package com.sorsix.album_collector.service

import com.sorsix.album_collector.domain.Album

interface AlbumService {
    fun getAll():List<Album>
}