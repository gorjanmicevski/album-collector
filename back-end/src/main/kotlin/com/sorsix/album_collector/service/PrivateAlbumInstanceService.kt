package com.sorsix.album_collector.service

import com.sorsix.album_collector.api.PrivateAlbumStickers
import com.sorsix.album_collector.domain.PrivateAlbumInstance

interface PrivateAlbumInstanceService {
    fun createPrivateInstance(collectorId: Long, albumId: Long): PrivateAlbumInstance
    fun getMissingStickers(collectorId: Long, albumId: Long): String
    fun getAllStickers(paId: Long): PrivateAlbumStickers
    fun addNewCollectedSticker(paId: Long, stickerNumber: String)
    fun removeCollectedSticker(paId: Long, stickerNumber: String)
    fun removeDuplicateSticker(paId: Long, stickerNumber: String)
}