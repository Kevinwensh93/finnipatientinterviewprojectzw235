import React, { useState, useEffect } from 'react';
import './App.css';  // Make sure your CSS file is correctly linked here

function PatientTable() {
    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        status: 'inquiry'  // Default status or could be empty if you prefer
    });

    useEffect(() => {
        fetch('http://localhost:3000/patients')
            .then(response => response.json())
            .then(data => setPatients(data))
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPatient(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const deletePatient = (id) => {
        fetch(`http://localhost:3000/patients/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                setPatients(patients.filter(patient => patient.id !== id));
                console.log(`Deleted patient with id ${id}`);
            } else {
                throw new Error('Something went wrong');
            }
        })
        .catch(error => console.error('Error deleting patient:', error));
    };

    const addPatient = () => {
        fetch('http://localhost:3000/patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: newPatient.firstName,
                last_name: newPatient.lastName,
                date_of_birth: newPatient.dateOfBirth,
                status: newPatient.status
            })
        })
        .then(response => response.json())
        .then(data => {
            setPatients([...patients, data]);
            setNewPatient({ firstName: '', lastName: '', dateOfBirth: '', status: 'inquiry' }); // Reset form
        })
        .catch(error => console.error('Error adding patient:', error));
    };

    return (
        <div className="container">
            <h2>Patient Data</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Date of Birth</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient => (
                        <tr key={patient.id}>
                            <td>{patient.first_name}</td>
                            <td>{patient.last_name}</td>
                            <td>{patient.date_of_birth}</td>
                            <td>{patient.status}</td>
                            <td>
                                <button className="button button-danger" onClick={() => deletePatient(patient.id)}>
                                    DEL
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="form-inputs">
                <input
                    className="form-input"
                    type="text"
                    name="firstName"
                    value={newPatient.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                />
                <input
                    className="form-input"
                    type="text"
                    name="lastName"
                    value={newPatient.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                />
                <input
                    className="form-input"
                    type="date"
                    name="dateOfBirth"
                    value={newPatient.dateOfBirth}
                    onChange={handleInputChange}
                />
                <select
                    className="form-input"
                    name="status"
                    value={newPatient.status}
                    onChange={handleInputChange}
                >
                    <option value="inquiry">Inquiry</option>
                    <option value="onboarding">Onboarding</option>
                    <option value="active">Active</option>
                    <option value="churned">Churned</option>
                </select>
                <button className="button" onClick={addPatient}>Add Patient</button>
            </div>
        </div>
    );
}

export default PatientTable;