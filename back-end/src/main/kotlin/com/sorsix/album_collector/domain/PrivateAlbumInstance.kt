package com.sorsix.album_collector.domain

import javax.persistence.*

@Entity
data class PrivateAlbumInstance(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val Id: Long,
    @ManyToOne
    val albumId: Album,
    @OneToMany
    val missingStickers: List<Sticker>,
    @OneToMany
    val duplicateStickers: List<Sticker>
)
