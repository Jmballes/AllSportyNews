package com.jmbo.sporty.repository;

import com.jmbo.sporty.domain.Points;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

import java.time.LocalDate;
import java.util.List;

/**
 * Spring Data JPA repository for the Points entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PointsRepository extends JpaRepository<Points, Long> {

    @Query("select points from Points points where points.person.login = ?#{principal.username}")
    List<Points> findByPersonIsCurrentUser();

    //List<Points> findAllByDateBetween(LocalDate firstDate, LocalDate secondDate);
    
    @Query("select points from Points points where points.person.login = ?#{principal.username}")
    Page<Points> findByPersonIsCurrentUser(Pageable pageable);

}
