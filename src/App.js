import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Student.css";

const API_URL = "http://localhost:8085/api/students";

const StudentApp = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ id: "", name: "", email: "", phone: "" });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      console.log("Form Data being sent:", formData);  // Log the data for debugging
      if (formData.id) {
        // Update student if ID exists
        await axios.put(`${API_URL}/${formData.id}`, formData);
      } else {
        // Add new student
        await axios.post(API_URL, formData);
      }
      // Reset the form and refetch students after submitting
      setFormData({ id: "", name: "", email: "", phone: "" });
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const handleEdit = (student) => {
    // Set the form data to the student to edit
    setFormData(student);
  };

  const handleDelete = async (id) => {
    try {
      // Delete student by ID
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Student Management</h2>
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          className="border p-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="border p-2"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="border p-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {formData.id ? "Update" : "Add"} Student
        </button>
      </form>

      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.email}</td>
              <td className="border p-2">{student.phone}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(student)}
                  className="bg-yellow-500 text-white px-2 py-1 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentApp;