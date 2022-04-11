package com.sorsix.album_collector.domain

import javax.persistence.*

@Entity
data class Sticker(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val name: String,
    val number: Int,
    val pictureUrl: String?,
    @ManyToOne
    val album: Album
) {
}