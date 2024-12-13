import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [error, setError] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    department: "",
    role: "",
    laptopAssigned: "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees");
        // Handle different possible response structures
        const employeeData = response.data.data || response.data;
        setEmployees(employeeData);
      } catch (error) {
        setError(`Error fetching employees: ${error.message}`);
        console.error("Employee fetch error:", error);
      }
    };

    const fetchLaptops = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/laptops");
        // Handle different possible response structures
        const laptopData = response.data.data || response.data;

        // Filter only available laptops
        const availableLaptops = laptopData.filter(
          (laptop) => laptop.status === "available"
        );

        setLaptops(availableLaptops);
      } catch (error) {
        setError(`Error fetching laptops: ${error.message}`);
        console.error("Laptop fetch error:", error);
      }
    };

    fetchEmployees();
    fetchLaptops();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/employees/${id}`
      );
      // Handle different possible success indicators
      if (response.data.success || response.status === 200) {
        setEmployees(employees.filter((employee) => employee._id !== id));
      }
    } catch (error) {
      setError(`Error deleting employee: ${error.message}`);
      console.error("Delete employee error:", error);
    }
  };

  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/employees",
        newEmployee
      );
      // Handle different possible success scenarios
      if (response.data.success || response.status === 201) {
        const newEmployeeData = response.data.data || response.data;
        setEmployees([...employees, newEmployeeData]);

        // Reset form and update available laptops if a laptop was assigned
        if (newEmployee.laptopAssigned) {
          setLaptops(
            laptops.filter(
              (laptop) => laptop._id !== newEmployee.laptopAssigned
            )
          );
        }

        // Reset the form
        setNewEmployee({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          password: "",
          department: "",
          role: "",
          laptopAssigned: "",
        });
      }
    } catch (error) {
      setError(`Error creating employee: ${error.message}`);
      console.error("Create employee error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employee List</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <h3>Create New Employee</h3>
      <form onSubmit={handleCreateEmployee} className="mb-4">
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="First Name"
              className="form-control mb-2"
              value={newEmployee.firstName}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, firstName: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Last Name"
              className="form-control mb-2"
              value={newEmployee.lastName}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, lastName: e.target.value })
              }
            />
          </div>
        </div>

        <input
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          value={newEmployee.email}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, email: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="form-control mb-2"
          value={newEmployee.phoneNumber}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, phoneNumber: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-2"
          value={newEmployee.password}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, password: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Department"
          className="form-control mb-2"
          value={newEmployee.department}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, department: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Role"
          className="form-control mb-2"
          value={newEmployee.role}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, role: e.target.value })
          }
        />

        <div className="mb-4">
          <label htmlFor="laptopAssigned" className="form-label">
            Assign Laptop
          </label>
          <select
            id="laptopAssigned"
            className="form-control"
            value={newEmployee.laptopAssigned}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, laptopAssigned: e.target.value })
            }
          >
            <option value="">Select Laptop</option>
            {laptops.length > 0 ? (
              laptops.map((laptop) => (
                <option key={laptop._id} value={laptop._id}>
                  {laptop.brand} {laptop.model}
                </option>
              ))
            ) : (
              <option disabled>No available laptops</option>
            )}
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={laptops.length === 0}
        >
          Create Employee
        </button>
      </form>

      <div className="list-group">
        {employees.length > 0 ? (
          employees.map((employee) => (
            <div key={employee._id} className="list-group-item mb-3">
              <div className="d-flex justify-content-between">
                <div>
                  <h5>
                    {employee.firstName} {employee.lastName}
                  </h5>
                  <p>
                    <strong>Email:</strong> {employee.email}
                  </p>
                  <p>
                    <strong>Department:</strong> {employee.department}
                  </p>
                  <p>
                    <strong>Role:</strong> {employee.role}
                  </p>
                  {employee.laptopAssigned ? (
                    <p>
                      <strong>Laptop Assigned:</strong>{" "}
                      {employee.laptopAssigned.brand}{" "}
                      {employee.laptopAssigned.model}
                    </p>
                  ) : (
                    <p>No laptop assigned</p>
                  )}
                </div>
                <div>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No employees found.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
