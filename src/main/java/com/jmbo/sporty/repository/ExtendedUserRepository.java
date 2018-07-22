package com.jmbo.sporty.repository;

import com.jmbo.sporty.domain.ExtendedUser;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the ExtendedUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedUserRepository extends JpaRepository<ExtendedUser, Long> {
    @Query("select distinct extended_user from ExtendedUser extended_user left join fetch extended_user.categoryPreferences")
    List<ExtendedUser> findAllWithEagerRelationships();

    @Query("select extended_user from ExtendedUser extended_user left join fetch extended_user.categoryPreferences where extended_user.id =:id")
    ExtendedUser findOneWithEagerRelationships(@Param("id") Long id);

}
