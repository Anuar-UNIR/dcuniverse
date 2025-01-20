package com.example.dcuniverse.repository;

import com.example.dcuniverse.model.Characters;
import com.example.dcuniverse.service.CharacterService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CharacterRepository extends JpaRepository<Characters, Long> {

    List<Characters> findByHeronameContains(@Param("heroname") String heroname);

    List<Characters> findByAlignment(String alignments);

    List<Characters> findByPowerstats_PowerGreaterThan(Double value);
}
