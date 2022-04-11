package com.sorsix.album_collector.domain

import java.time.LocalDateTime
import javax.persistence.*

@Entity
data class Post(
    @Id
    @GeneratedValue
    val id: Long = 0,
    @ManyToOne
    val collector: Collector,
    val duplicateStickers: String?,
    val missingStickers: String?,
    val imageDuplicatesStickers: String?,
    val imageMissingStickers: String?,
    val dateTimeCreated: LocalDateTime
) {
}