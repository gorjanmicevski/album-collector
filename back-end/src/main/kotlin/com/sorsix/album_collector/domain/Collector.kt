package com.sorsix.album_collector.domain

import javax.persistence.*

@Entity
data class Collector(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val name: String,
    val email: String,
    val password: String,
    @OneToMany
    val albums: MutableList<PrivateAlbumInstance> = mutableListOf()
) {

}