package com.phone.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.phone.model.Phone;
import com.phone.repository.PhoneRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class PhoneController {

	@Autowired
	private PhoneRepository phoneRepository;

	@GetMapping("/phone")
	public ResponseEntity<List<Phone>> getAllTutorials(@RequestParam(required = false) String title) {
		try {
			List<Phone> phones = new ArrayList<Phone>();

			if (title == null) {
				phoneRepository.findAll().forEach(phones::add);
			} else {
				phoneRepository.findByTitleContaining(title).forEach(phones::add);
			}
			if (phones.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(phones, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/phone/{id}")
	public ResponseEntity<Phone> getTutorialById(@PathVariable("id") long id) {
		Optional<Phone> phone = phoneRepository.findById(id);
		if (phone.isPresent()) {
			return new ResponseEntity<>(phone.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/phone")
	public ResponseEntity<Phone> createTutorial(@RequestBody Phone phoneRequest) {
		try {
			Phone phone = phoneRepository
					.save(new Phone(phoneRequest.getTitle(), phoneRequest.getDescription(), false));
			return new ResponseEntity<>(phone, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/phone/{id}")
	public ResponseEntity<Phone> updateTutorial(@PathVariable("id") long id, @RequestBody Phone phoneRequest) {
		Optional<Phone> phoneOptional = phoneRepository.findById(id);

		if (phoneOptional.isPresent()) {
			Phone phone = phoneOptional.get();
			phone.setTitle(phoneRequest.getTitle());
			phone.setDescription(phoneRequest.getDescription());
			phone.setPublished(phoneRequest.isPublished());
			return new ResponseEntity<>(phoneRepository.save(phone), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/phone/{id}")
	public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("id") long id) {
		try {
			phoneRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/phone")
	public ResponseEntity<HttpStatus> deleteAllTutorials() {
		try {
			phoneRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/phone/published")
	public ResponseEntity<List<Phone>> findByPublished() {
		try {
			List<Phone> phones = phoneRepository.findByPublished(true);
			if (phones.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(phones, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
