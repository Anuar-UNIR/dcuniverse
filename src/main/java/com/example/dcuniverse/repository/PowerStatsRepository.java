package com.example.dcuniverse.repository;

import com.example.dcuniverse.model.Powerstats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PowerStatsRepository extends JpaRepository<Powerstats, Long> {

    List<Powerstats> findByPowerGreaterThan(@Param("value") Double value);

}
