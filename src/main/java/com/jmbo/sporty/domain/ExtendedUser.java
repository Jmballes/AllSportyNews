package com.jmbo.sporty.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ExtendedUser.
 */
@Entity
@Table(name = "extended_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "extendeduser")
public class ExtendedUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "extended_user_category_preferences",
               joinColumns = @JoinColumn(name="extended_users_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="category_preferences_id", referencedColumnName="id"))
    private Set<Category> categoryPreferences = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public ExtendedUser user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Category> getCategoryPreferences() {
        return categoryPreferences;
    }

    public ExtendedUser categoryPreferences(Set<Category> categories) {
        this.categoryPreferences = categories;
        return this;
    }

    public ExtendedUser addCategoryPreferences(Category category) {
        this.categoryPreferences.add(category);
        return this;
    }

    public ExtendedUser removeCategoryPreferences(Category category) {
        this.categoryPreferences.remove(category);
        return this;
    }

    public void setCategoryPreferences(Set<Category> categories) {
        this.categoryPreferences = categories;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ExtendedUser extendedUser = (ExtendedUser) o;
        if (extendedUser.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), extendedUser.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ExtendedUser{" +
            "id=" + getId() +
            "}";
    }
}
