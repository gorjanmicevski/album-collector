package com.sorsix.album_collector.service

import com.sorsix.album_collector.domain.Event

interface EventService {
    fun getAll():List<Event>
    fun create(event: Event):Event
}