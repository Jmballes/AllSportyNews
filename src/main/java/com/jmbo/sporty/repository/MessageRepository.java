package com.jmbo.sporty.repository;

import com.jmbo.sporty.domain.Message;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Message entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("select message from Message message where message.author.login = ?#{principal.username}")
    List<Message> findByAuthorIsCurrentUser();

}
