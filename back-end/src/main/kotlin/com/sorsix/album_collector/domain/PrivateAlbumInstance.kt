package com.sorsix.album_collector.domain

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
data class PrivateAlbumInstance(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val Id: Long,
    @ManyToOne
    val collector: Collector,
    @ManyToOne
    @JsonIgnore
    val albumId: Album,
    @OneToMany
    val allStickers: MutableList<Sticker> = mutableListOf(),
    @OneToMany
    val missingStickers: MutableList<Sticker> = mutableListOf(),
    @OneToMany
    val duplicateStickers: MutableList<Sticker> = mutableListOf()
)
