package com.tourbooking.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.engine.internal.Cascade;

import java.util.List;

@Entity
@Table(name ="categories")
@Getter
@Setter
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToMany(mappedBy = "categories", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<Tour> tours;

}
