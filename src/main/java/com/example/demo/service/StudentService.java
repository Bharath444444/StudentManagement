package com.example.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Student;
import com.example.demo.repository.StudentRepository;

import java.util.List;
import java.util.Optional;

@Service

public class StudentService {
	 @Autowired
	    private StudentRepository repository;

	    public List<Student> getAllStudents() {
	        return repository.findAll();
	    }

	    public Optional<Student> getStudentById(Long id) {
	        return repository.findById(id);
	    }

	    public Student addStudent(Student student) {
	        return repository.save(student);
	    }

	    public Student updateStudent(Long id, Student updatedStudent) {
	        return repository.findById(id).map(student -> {
	            student.setName(updatedStudent.getName());
	            student.setEmail(updatedStudent.getEmail());
	            student.setPhone(updatedStudent.getPhone());
	            return repository.save(student);
	        }).orElseThrow(() -> new RuntimeException("Student not found"));
	    }
	    
	    public void deleteStudent(Long id) {
	    	repository.deleteById(id);
	    }

}
