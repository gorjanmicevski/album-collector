package com.sorsix.album_collector.api

data class CollectorRegistration(
    val name: String,
    val surname: String,
    val email: String,
    val password: String
)
