package com.jmbo.sporty.repository;

import com.jmbo.sporty.domain.Category;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Category entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("select category from Category category where category.author.login = ?#{principal.username}")
    List<Category> findByAuthorIsCurrentUser();

}
