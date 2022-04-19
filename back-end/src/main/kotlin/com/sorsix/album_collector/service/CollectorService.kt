package com.sorsix.album_collector.service

import com.sorsix.album_collector.api.CollectorRegistration
import com.sorsix.album_collector.domain.Collector

interface CollectorService {
    fun getMissingStickers()
    fun createCollector(collector: CollectorRegistration): Collector
}