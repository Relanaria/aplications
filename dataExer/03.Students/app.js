// app.js

// Function to create a new student
async function createStudent(firstName, lastName, facultyNumber, grade) {
  const url = 'http://localhost:3030/jsonstore/collections/students';
  const data = {
      firstName,
      lastName,
      facultyNumber,
      grade
  };

  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      if (!response.ok) {
          throw new Error('Failed to create student.');
      }

      const result = await response.json();
      return result;
  } catch (error) {
      console.error('Error:', error.message);
  }
}

// Function to extract all students and display them in the table
async function extractStudents() {
  const url = 'http://localhost:3030/jsonstore/collections/students';
  const tableBody = document.querySelector('#results tbody');

  try {
      const response = await fetch(url);
      const data = await response.json();

      // Clear table rows before populating with new data
      tableBody.innerHTML = '';

      // Populate table rows with student data
      for (const id in data) {
          const student = data[id];
          const row = tableBody.insertRow();

          row.insertCell().textContent = student.firstName;
          row.insertCell().textContent = student.lastName;
          row.insertCell().textContent = student.facultyNumber;
          row.insertCell().textContent = student.grade;
      }
  } catch (error) {
      console.error('Error:', error.message);
  }
}

// Event listener for form submission
document.getElementById('form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const form = event.target;
  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const facultyNumber = form.facultyNumber.value.trim();
  const grade = form.grade.value.trim();

  // Check if all fields are filled
  if (!firstName || !lastName || !facultyNumber || !grade) {
      alert('Please fill all fields.');
      return;
  }

  // Create new student
  await createStudent(firstName, lastName, facultyNumber, grade);

  // Extract students again to update table
  await extractStudents();

  // Reset form fields
  form.reset();
});

// Initial extraction of students when the page loads
extractStudents();
