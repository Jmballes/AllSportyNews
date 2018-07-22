package com.jmbo.sporty.repository.search;

import com.jmbo.sporty.domain.ExtendedUser;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ExtendedUser entity.
 */
public interface ExtendedUserSearchRepository extends ElasticsearchRepository<ExtendedUser, Long> {
}
