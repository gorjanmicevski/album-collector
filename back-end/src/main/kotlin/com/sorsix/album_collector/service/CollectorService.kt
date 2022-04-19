package com.sorsix.album_collector.service

import com.sorsix.album_collector.api.CollectorRegistration
import com.sorsix.album_collector.domain.Collector
import org.springframework.web.multipart.MultipartFile

interface CollectorService {
    fun getMissingStickers()
    fun createCollector(collector: CollectorRegistration): Collector
    fun setProfilePicture(collectorId: Long, file: MultipartFile)
    fun getProfilePicture(collectorId: Long): ByteArray
}