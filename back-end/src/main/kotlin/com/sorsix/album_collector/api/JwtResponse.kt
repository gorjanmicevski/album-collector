package com.sorsix.album_collector.api

import com.sorsix.album_collector.domain.PrivateAlbumInstance

data class JwtResponse(
    val token: String,
    val type: String = "Bearer",
    val id: Long,
    val name: String,
    val surname: String,
    val email: String,
    val roles: List<String>,
    val albums: List<PrivateAlbumInstance>,
    val profilePicture: ByteArray
)
