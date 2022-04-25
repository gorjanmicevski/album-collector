package com.sorsix.album_collector.service.impl

import com.sorsix.album_collector.api.CollectorRegistration
import com.sorsix.album_collector.domain.Collector
import com.sorsix.album_collector.domain.ERole
import com.sorsix.album_collector.domain.Role
import com.sorsix.album_collector.repository.CollectorRepository
import com.sorsix.album_collector.repository.RoleRepository
import org.springframework.stereotype.Service
import com.sorsix.album_collector.service.CollectorService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.multipart.MultipartFile

@Service
class CollectorService(
    val collectorRepository: CollectorRepository,
    val roleRepository: RoleRepository,
    val encoder: PasswordEncoder,
) : CollectorService {
    override fun getMissingStickers() {
        TODO("Not yet implemented")
    }

    override fun createCollector(collectorRegistration: CollectorRegistration): Collector {
        val collector = Collector(
            name = collectorRegistration.name,
            surname = collectorRegistration.surname,
            email = collectorRegistration.email,
            password = encoder.encode(collectorRegistration.password)
        )
        val roles: MutableSet<Role> = HashSet()
        roleRepository.save(Role(1, ERole.ROLE_USER))//delete row
        val userRole: Role = roleRepository.findByName(ERole.ROLE_USER)
        roles.add(userRole)
        collector.roles = roles
        return collectorRepository.save(collector)
    }

    override fun setProfilePicture(collectorId: Long, file: MultipartFile) {
        val collector: Collector = collectorRepository.findById(collectorId).get()
        collector.profilePicture = file.bytes
        collectorRepository.save(collector)
    }

    override fun getProfilePicture(collectorId: Long): ByteArray {
        val collector = collectorRepository.findById(collectorId).orElseThrow()
        return collector.profilePicture
    }

    override fun emailTaken(email: String): Boolean {
        return collectorRepository.existsByEmail(email)
    }


}