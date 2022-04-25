package com.sorsix.album_collector.domain

import com.fasterxml.jackson.annotation.JsonIncludeProperties
import javax.persistence.*

@Entity
data class Event(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val title: String,
    val place: String,
    @OneToMany
    @JsonIncludeProperties("name")
    val albums: List<Album>,
    @OneToMany
    val collectorsGoing: List<Collector>,
    @OneToMany
    val collectorsInterested: List<Collector>
)