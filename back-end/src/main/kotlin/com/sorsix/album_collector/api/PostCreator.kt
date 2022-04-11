package com.sorsix.album_collector.api

import com.sorsix.album_collector.domain.Collector
import java.time.LocalDateTime

data class PostCreator(
    val collectorId: Long,
    val albumId: Long,
    val duplicateStickers: List<Int>?,
    val missingStickers: List<Int>?,
    val imageDuplicatesStickers: String?,
    val imageMissingStickers: String?,
    val dateTimeCreated: LocalDateTime
)
