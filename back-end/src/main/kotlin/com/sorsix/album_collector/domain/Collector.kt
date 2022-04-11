package com.sorsix.album_collector.domain

import javax.persistence.*

@Entity
data class Collector(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val name: String,
    val mail: String,
    val password: String,
    val phone: String,
    @OneToMany
    val albums: List<PrivateAlbumInstance>
) {

}