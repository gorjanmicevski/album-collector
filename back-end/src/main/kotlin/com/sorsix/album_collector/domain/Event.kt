package com.sorsix.album_collector.domain

import javax.persistence.*

@Entity
data class Event(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id:Long,
    val name:String,
    val place:String,
    @OneToMany
    val collectorsGoing:List<Collector>,
    @OneToMany
    val collectorsInterested:List<Collector>
) {
}