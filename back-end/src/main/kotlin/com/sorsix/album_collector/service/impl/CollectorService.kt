package com.sorsix.album_collector.service.impl

import com.sorsix.album_collector.api.CollectorRegistration
import com.sorsix.album_collector.domain.Collector
import com.sorsix.album_collector.repository.CollectorRepository
import org.springframework.stereotype.Service
import com.sorsix.album_collector.service.CollectorService
import org.springframework.web.multipart.MultipartFile

@Service
class CollectorService(
    val collectorRepository: CollectorRepository
) : CollectorService {
    override fun getMissingStickers() {
        TODO("Not yet implemented")
    }

    override fun createCollector(collector: CollectorRegistration): Collector {
        return collectorRepository.save(
            Collector(
                name = collector.name,
                email = collector.email,
                password = collector.password
            )
        )
    }

    override fun setProfilePicture(collectorId: Long, file: MultipartFile) {
        val collector: Collector = collectorRepository.findById(collectorId).get()
        collector.profilePicture = file.bytes
        collectorRepository.save(collector)
    }

    override fun getProfilePicture(collectorId: Long): ByteArray {
        val collector = collectorRepository.findById(collectorId).orElseThrow()
        return collector.profilePicture!!
    }
}