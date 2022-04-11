package com.sorsix.album_collector.domain

import javax.persistence.*

@Entity
data class Album(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val Id: Long,
    val name: String,
    val imageUrl: String,
    @OneToMany
    val cards: List<Sticker>,
//    @OneToMany
//    val missingStickers: List<Sticker>,
//    @OneToMany
//    val duplicateStickers: List<Sticker>
) {
}