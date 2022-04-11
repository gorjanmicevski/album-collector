package com.sorsix.album_collector.repository

import com.sorsix.album_collector.domain.Sticker
import org.springframework.data.jpa.repository.JpaRepository

interface StickerRepository:JpaRepository<Sticker,Long> {
}