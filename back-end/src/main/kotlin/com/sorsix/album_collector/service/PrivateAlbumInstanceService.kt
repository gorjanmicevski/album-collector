package com.sorsix.album_collector.service

import com.sorsix.album_collector.domain.PrivateAlbumInstance

interface PrivateAlbumInstanceService {
    fun createPrivateInstance(collectorId: Long, albumId: Long): PrivateAlbumInstance
    fun getMissingStickers(collectorId: Long, albumId: Long): String
}