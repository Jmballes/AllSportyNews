package com.jmbo.sporty.service;

import com.jmbo.sporty.domain.Points;
import com.jmbo.sporty.repository.PointsRepository;
import com.jmbo.sporty.repository.search.PointsSearchRepository;
import com.jmbo.sporty.web.rest.vm.PointsPerWeek;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Points.
 */
@Service
@Transactional
public class PointsService {

    private final Logger log = LoggerFactory.getLogger(PointsService.class);

    private final PointsRepository pointsRepository;

    private final PointsSearchRepository pointsSearchRepository;

    public PointsService(PointsRepository pointsRepository, PointsSearchRepository pointsSearchRepository) {
        this.pointsRepository = pointsRepository;
        this.pointsSearchRepository = pointsSearchRepository;
    }

    /**
     * Save a points.
     *
     * @param points the entity to save
     * @return the persisted entity
     */
    public Points save(Points points) {
        log.debug("Request to save Points : {}", points);
        Points result = pointsRepository.save(points);
        pointsSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the points.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Points> findAll() {
        log.debug("Request to get all Points");
        return pointsRepository.findAll();
    }

    /**
     * Get one points by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Points findOne(Long id) {
        log.debug("Request to get Points : {}", id);
        return pointsRepository.findOne(id);
    }

    /**
     * Delete the points by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Points : {}", id);
        pointsRepository.delete(id);
        pointsSearchRepository.delete(id);
    }

    /**
     * Search for the points corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Points> search(String query) {
        log.debug("Request to search Points for query {}", query);
        return StreamSupport
            .stream(pointsSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public ResponseEntity<PointsPerWeek> getPointsFromMeThisWeek(){
    	log.info("Se intentan obtener los puntos de una semanaa");
    	LocalDate now=LocalDate.now();
    	LocalDate startOfWeek = now.with(DayOfWeek.MONDAY);
    	LocalDate endOfWeek= now.with(DayOfWeek.SUNDAY);
    	log.debug("Busqueda de puntos entre: {} y {}",startOfWeek,endOfWeek);
    	List<Points> points = pointsRepository.findByPersonIsCurrentUser();
    	log.info("El total de puntos es : " +points.size());
    	return calculatePoints(points);
    }
    @Transactional(readOnly = true)
    private ResponseEntity<PointsPerWeek> calculatePoints( List<Points> points){
    	Integer numPoints= points.stream().mapToInt(p -> 1).sum();

    	PointsPerWeek count= new PointsPerWeek(LocalDate.now(), numPoints);
    	log.debug("Se devuelve count: {} y fecha {}", count.getPoints(),count.getWeek());
    	return new ResponseEntity<>(count,HttpStatus.OK);
    }
}
