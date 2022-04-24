package com.sorsix.album_collector.domain

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
data class PrivateAlbumInstance(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val Id: Long = 0,
    @ManyToOne
    @JsonIgnore
    val collector: Collector,
    @ManyToOne
    @JsonIgnore
    val album: Album,
//    @OneToMany
//    val allStickers: List<Sticker>,
    @OneToMany
    val collectedStickers: MutableList<Sticker>,
    @OneToMany
    val duplicateStickers: MutableList<Sticker>
)
