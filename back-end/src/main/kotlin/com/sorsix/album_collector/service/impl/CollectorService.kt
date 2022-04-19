package com.sorsix.album_collector.service.impl

import com.sorsix.album_collector.api.CollectorRegistration
import com.sorsix.album_collector.domain.Collector
import com.sorsix.album_collector.repository.CollectorRepository
import org.springframework.stereotype.Service
import com.sorsix.album_collector.service.CollectorService

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
}