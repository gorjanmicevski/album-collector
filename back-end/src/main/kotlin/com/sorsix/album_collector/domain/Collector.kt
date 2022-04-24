package com.sorsix.album_collector.domain

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
data class Collector(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val name: String,
    val surname: String,
    @Column(unique = true)
    val email: String,
    @JsonIgnore
    val password: String,
    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(
//        name = "collector_roles",
//        joinColumns = @JoinColumn(name = "collector_id"),
//        inverseJoinColumns = @JoinColumn(name = "role_id")
//    )
    //da se sredi ova da ne bide var 03:06 e nemom poke nemom
    var roles: MutableSet<Role> = HashSet(),
    @OneToMany(mappedBy = "collector")
    val albums: MutableList<PrivateAlbumInstance> = mutableListOf(),
    //warningov ako imame zhivci
    @Lob
    var profilePicture: ByteArray = ByteArray(0)
)