package com.example.dcuniverse.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "characters")
public class Characters {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "ID único del personaje. Autoincremental en bbdd. NO requerido en creación", example = "1")
    private Long id;
    @Column(name = "heroname")
    private String heroname;
    @Column(name = "fullname")
    private String fullname;
    @Column(name = "image1")
    private String image1;
    @Column(name = "image2")
    private String image2;
    @Column(name = "image3")
    private String image3;
    @Column(name = "gender")
    private String gender;
    @Column(name = "race")
    private String race;
    @Column(name = "alignment")
    private String alignment;

    @OneToOne(mappedBy = "characters", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Powerstats powerstats;


}
