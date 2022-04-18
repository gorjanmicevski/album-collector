package com.sorsix.album_collector.domain

import javax.persistence.*

@Entity
data class Album(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val Id: Long = 0,
    val name: String,
    val imageUrl: String?,
    @OneToMany(mappedBy = "album")
    val stickers: MutableList<Sticker> = mutableListOf()
)