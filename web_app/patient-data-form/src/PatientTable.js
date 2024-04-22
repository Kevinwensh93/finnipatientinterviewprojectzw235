import React, { useState, useEffect } from 'react';
import './App.css';  // Make sure your CSS file is correctly linked here

function PatientTable() {
    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        status: 'inquiry'
    });
    const [editingPatientId, setEditingPatientId] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/patients')
            .then(response => response.json())
            .then(data => setPatients(data))
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    const handleInputChangeNewPatient = (e) => {
        const { name, value } = e.target;
        setNewPatient(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleInputChangeEditRow = (e, id) => {
        const { name, value } = e.target;
        setPatients(prevPatients => prevPatients.map(patient => {
            if (patient.id === id) {
                return {
                    ...patient,
                    [name]: value
                };
            }
            return patient;
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
                first_name: newPatient.first_name,
                last_name: newPatient.last_name,
                date_of_birth: newPatient.date_of_birth,
                status: newPatient.status
            })
        })
        .then(response => response.json())
        .then(data => {
            setPatients([...patients, data]);
            setNewPatient({ first_name: '', last_name: '', date_of_birth: '', status: 'inquiry' }); // Reset form
        })
        .catch(error => console.error('Error adding patient:', error));
    };

    const startEditing = (id) => {
        setEditingPatientId(id);
    };

    const saveEditedPatient = (patient) => {
        fetch(`http://localhost:3000/patients/${patient.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
        })
        .then(response => {
            if (response.ok) {
                console.log(`Patient with ID ${patient.id} successfully updated.`);
                setEditingPatientId(null);
            } else {
                throw new Error('Failed to update patient.');
            }
        })
        .catch(error => console.error('Error updating patient:', error));
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
                            <td>{editingPatientId === patient.id ? <input type="text" name="first_name" value={patient.first_name} onChange={(e) => handleInputChangeEditRow(e, patient.id)} /> : patient.first_name}</td>
                            <td>{editingPatientId === patient.id ? <input type="text" name="last_name" value={patient.last_name} onChange={(e) => handleInputChangeEditRow(e, patient.id)} /> : patient.last_name}</td>
                            <td>{editingPatientId === patient.id ? <input type="date" name="date_of_birth" value={patient.date_of_birth} onChange={(e) => handleInputChangeEditRow(e, patient.id)} /> : patient.date_of_birth}</td>
                            <td>{editingPatientId === patient.id ? <select name="status" value={patient.status} onChange={(e) => handleInputChangeEditRow(e, patient.id)}>
                                <option value="inquiry">Inquiry</option>
                                <option value="onboarding">Onboarding</option>
                                <option value="active">Active</option>
                                <option value="churned">Churned</option>
                            </select> : patient.status}</td>
                            <td>
                                {editingPatientId === patient.id ? (
                                    <button className="button button-success" onClick={() => saveEditedPatient(patient)}>Save</button>
                                ) : (
                                    <>
                                        <button className="button" onClick={() => startEditing(patient.id)}>Edit</button>
                                        <button className="button button-danger" onClick={() => deletePatient(patient.id)}>DEL</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td><input className="form-input" type="text" name="first_name" value={newPatient.first_name} onChange={handleInputChangeNewPatient} placeholder="First Name" /></td>
                        <td><input className="form-input" type="text" name="last_name" value={newPatient.last_name} onChange={handleInputChangeNewPatient} placeholder="Last Name" /></td>
                        <td><input className="form-input" type="date" name="date_of_birth" value={newPatient.date_of_birth} onChange={handleInputChangeNewPatient} /></td>
                        <td>
                            <select className="form-input" name="status" value={newPatient.status} onChange={handleInputChangeNewPatient}>
                                <option value="inquiry">Inquiry</option>
                                <option value="onboarding">Onboarding</option>
                                <option value="active">Active</option>
                                <option value="churned">Churned</option>
                            </select>
                        </td>
                        <td>
                            <button className="button" onClick={addPatient}>Add Patient</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default PatientTable;
