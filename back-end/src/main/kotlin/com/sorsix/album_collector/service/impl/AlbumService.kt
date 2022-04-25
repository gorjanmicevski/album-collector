package com.sorsix.album_collector.service.impl

import com.sorsix.album_collector.api.AlbumResponse
import com.sorsix.album_collector.domain.Album
import com.sorsix.album_collector.domain.Sticker
import com.sorsix.album_collector.repository.AlbumRepository
import com.sorsix.album_collector.repository.StickerRepository
import com.sorsix.album_collector.service.AlbumService
import com.sorsix.album_collector.service.CsvService
import com.sorsix.album_collector.service.ImageEncoderService
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile

@Service
class AlbumService(
    val albumRepository: AlbumRepository,
    val stickerRepository: StickerRepository,
    val csvService: CsvService,
    val encoderService:ImageEncoderService
) : AlbumService {
    override fun getAll(): List<Album> =albumRepository.findAll()

    override fun importStickers(file: MultipartFile, name: String, image: MultipartFile): Album {
        val album = albumRepository.save(Album(name = name, imageUrl = image.bytes))
        val stickers: MutableList<Sticker> = mutableListOf()
        csvService.readCsvFile(file).forEach {
            stickers.add(
                stickerRepository.save(
                    Sticker(
                        name = it.name,
                        number = it.number,
                        page = it.page,
                        album = album
                    )
                )
            )
        }
        album.stickers.addAll(stickers)
        return albumRepository.save(album)
    }

    override fun getStickersForAlbum(albumId: Long): List<Sticker> {
        return albumRepository.findById(albumId).get().stickers
    }

    override fun getAlbumImage(albumId: Long): ByteArray {
        return albumRepository.findById(albumId).get().imageUrl
    }
}