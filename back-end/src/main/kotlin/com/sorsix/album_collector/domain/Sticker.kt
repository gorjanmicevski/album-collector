package com.sorsix.album_collector.domain

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
data class Sticker(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val name: String,
    val number: String,
    val page: String,
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    val album: Album
)