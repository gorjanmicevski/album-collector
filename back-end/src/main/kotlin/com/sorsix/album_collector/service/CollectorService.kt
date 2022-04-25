package com.sorsix.album_collector.service

import com.sorsix.album_collector.api.dtos.CollectorRegistration
import com.sorsix.album_collector.domain.Collector
import com.sorsix.album_collector.domain.PrivateAlbumInstance
import org.springframework.web.multipart.MultipartFile

interface CollectorService {
    fun createCollector(collectorRegistration: CollectorRegistration): Collector
    fun setProfilePicture(collectorId: Long, file: MultipartFile)
    fun getProfilePicture(collectorId: Long): ByteArray
    fun emailTaken(email: String): Boolean
    fun getPrivateAlbums(collectorId: Long): List<PrivateAlbumInstance>
}