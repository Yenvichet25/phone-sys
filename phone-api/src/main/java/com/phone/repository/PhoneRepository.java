package com.phone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.phone.model.Phone;

public interface PhoneRepository extends JpaRepository<Phone, Long> {
	List<Phone> findByPublished(boolean published);

	List<Phone> findByTitleContaining(String title);
}
