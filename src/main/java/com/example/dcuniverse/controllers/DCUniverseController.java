package com.example.dcuniverse.controllers;

import com.example.dcuniverse.model.Characters;
import com.example.dcuniverse.model.Powerstats;
import com.example.dcuniverse.service.CharacterService;
import com.example.dcuniverse.service.PowerStatsService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Log4j2
@AllArgsConstructor
@RequestMapping("/api")
public class DCUniverseController {
    CharacterService characterService;
    PowerStatsService powerStatsService;


    @GetMapping(value = "/characters")
    public ResponseEntity<List<Characters>> getCharacters() {
        log.debug("A request has arrived to get all characters");
        return ResponseEntity.ok(characterService.findAll());
    }

    @PostMapping("/characters")
    public Characters createCharacter(@RequestBody Characters character) {
        log.debug("A request has arrived to create a character");
        return characterService.save(character);
    }

    @PutMapping("/characters")
    public Characters updateCharacter(@RequestBody Characters character) {
        log.debug("A request has arrived to update a character");
        return characterService.save(character);
    }

    @GetMapping(value = "/characters/{id}")
    public ResponseEntity<Characters> getCharacterById(@PathVariable Long id) {
        log.debug("A request has arrived to get character by id: {} ", id);
        Optional<Characters> characterOptional = characterService.findById(id);

        // Verificar si el personaje está presente
        if (characterOptional.isPresent()) {
            return ResponseEntity.ok(characterOptional.get()); // Devolver el personaje encontrado con estado 200 OK
        } else {
            log.error("Character with id {} not found", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Devolver 404 si no se encuentra el personaje
        }
    }

    @GetMapping(value = "/characters/name/{heroName}")
    public ResponseEntity<List<Characters>> getCharacterById(@PathVariable String heroName) {
        log.debug("A request has arrived to get character by heroName: {} ", heroName);
        List<Characters> charactersList = characterService.findByHeronameContains(heroName);

        // Verificar si el personaje está presente
        if (!charactersList.isEmpty()) {
            return ResponseEntity.ok(charactersList); // Devolver el personaje encontrado con estado 200 OK
        } else {
            log.error("Character with heroName {} not found", heroName);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Devolver 404 si no se encuentra el personaje
        }
    }

    @DeleteMapping("/characters/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCharacter(@PathVariable("id") Long id) {
        log.info("A request has been received to delete the character with id {}", id);
        characterService.deleteById(id);
    }

    @GetMapping("/powerstats/power/{value}")
    public List<Powerstats> getPowerGreaterThan(@PathVariable("value") Double value) {
        log.info("A request has been received to get power greater than value {}", value);
        return powerStatsService.findByPowerGreaterThan(value);
    }

    @GetMapping("/characters/power/{value}")
    public List<Characters> getCharactersPowerGreaterThan(@PathVariable("value") Double value) {
        log.info("A request has been received to get characters with power greater than value {}", value);
        return characterService.findByPowerGreaterThan(value);
    }


}
