package com.sorsix.album_collector.service.impl

import com.sorsix.album_collector.domain.Event
import com.sorsix.album_collector.repository.EventRepository
import com.sorsix.album_collector.service.EventService
import org.springframework.stereotype.Service

@Service
class EventService(val eventRepository: EventRepository) : EventService{
    override fun getAll(): List<Event> = eventRepository.findAll()

    override fun create(event: Event): Event =eventRepository.save(event)
}