package com.sorsix.album_collector.api

import com.sorsix.album_collector.domain.Collector
import java.time.LocalDateTime

data class PostCreator(
    val collectorId: Long,
    val description: String,
    val phone: String,
    val location: String,
    val albumName: String,
    val duplicateStickers: String?,
    val missingStickers: String?,
//    val imageDuplicatesStickers: String?,
//    val imageMissingStickers: String?
)
