package com.sorsix.album_collector.domain

import com.fasterxml.jackson.annotation.JsonIgnore
import java.time.LocalDateTime
import javax.persistence.*

@Entity
data class Post(
    @Id
    @GeneratedValue
    val id: Long = 0,
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    val collector: Collector,
    val collectorName: String,
    val description: String,
    val phone: String,
    val location: String,
    val albumName: String,
    val duplicateStickers: String?,
    val missingStickers: String?,
//    val imageDuplicatesStickers: String?,
//    val imageMissingStickers: String?,
    val dateTimeCreated: LocalDateTime
)