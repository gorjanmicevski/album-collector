package com.sorsix.album_collector.service.impl

import com.sorsix.album_collector.domain.PrivateAlbumInstance
import com.sorsix.album_collector.domain.Sticker
import com.sorsix.album_collector.repository.AlbumRepository
import com.sorsix.album_collector.repository.CollectorRepository
import com.sorsix.album_collector.repository.PrivateAlbumInstanceRepository
import com.sorsix.album_collector.repository.StickerRepository
import com.sorsix.album_collector.service.PrivateAlbumInstanceService
import org.springframework.stereotype.Service

@Service
class PrivateAlbumInstanceService(
    val privateAlbumRepository: PrivateAlbumInstanceRepository,
    val collectorRepository: CollectorRepository,
    val albumRepository: AlbumRepository,
    val stickerRepository: StickerRepository
) :
    PrivateAlbumInstanceService {
    override fun createPrivateInstance(collectorId: Long, albumId: Long): PrivateAlbumInstance {
        val collector = collectorRepository.findById(collectorId).get()
        val album = albumRepository.findById(albumId).get()
        val stickers = album.stickers
        val privateAlbum = PrivateAlbumInstance(
            collector = collector,
            album = album,
//            allStickers = stickers,
            collectedStickers = mutableListOf(),
            duplicateStickers = mutableListOf()
        )
        return privateAlbumRepository.save(privateAlbum)
    }

    override fun getMissingStickers(collectorId: Long, albumId: Long): String {
        val collector = collectorRepository.findById(collectorId).get()
        val album = albumRepository.findById(albumId).get()
        val privateAlbum = privateAlbumRepository.findByCollectorAndAlbum(collector, album)
        val pom = album.stickers
            .filter { !privateAlbum.collectedStickers.contains(it) }
            .joinToString { it.number }
        println(pom)
        return pom
    }

    fun addNewCollectedSticker(collectorId: Long, albumId: Long, stickerNumber: String) {
        val collector = collectorRepository.findById(collectorId).get()
        val album = albumRepository.findById(albumId).get()
        val privateAlbum = privateAlbumRepository.findByCollectorAndAlbum(collector, album)
        privateAlbum.collectedStickers.add(stickerRepository.findByNumberAndAlbum(stickerNumber, album))
        privateAlbumRepository.save(privateAlbum)
    }
}