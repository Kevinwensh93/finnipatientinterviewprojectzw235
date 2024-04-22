import React, { useState, useEffect } from 'react';

function PatientCustomFieldTable({ patient }) {
    const [customFields, setCustomFields] = useState([]);
    const [editingCustomFieldId, setEditingCustomFieldId] = useState(null);
    const [newCustomField, setNewCustomField] = useState({
        name: '',
        value: ''
    });

    useEffect(() => {
        // Fetch custom fields for the given patient
        fetch(`http://localhost:3000/patients/${patient.id}/custom_fields`)
            .then(response => response.json())
            .then(data => setCustomFields(data))
            .catch(error => console.error('Error fetching custom fields:', error));
    }, [patient.id]);

    const handleInputChange = (e, id) => {
        const { name, value } = e.target;
        setCustomFields(prevCustomFields => prevCustomFields.map(field => {
            if (field.id === id) {
                return {
                    ...field,
                    [name]: value
                };
            }
            return field;
        }));
    };

    const handleNewCustomFieldInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomField(prevField => ({
            ...prevField,
            [name]: value
        }));
    };

    const saveEditedCustomField = (field) => {
        fetch(`http://localhost:3000/patients/${patient.id}/custom_fields/${field.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(field)
        })
        .then(response => {
            if (response.ok) {
                console.log(`Custom field with ID ${field.id} successfully updated.`);
                setEditingCustomFieldId(null);
            } else {
                throw new Error('Failed to update custom field.');
            }
        })
        .catch(error => console.error('Error updating custom field:', error));
    };

    const addCustomField = () => {
        fetch(`http://localhost:3000/patients/${patient.id}/custom_fields`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomField)
        })
        .then(response => response.json())
        .then(data => {
            setCustomFields([...customFields, data]);
            setNewCustomField({
                name: '',
                value: ''
            });
        })
        .catch(error => console.error('Error adding custom field:', error));
    };

    const deleteCustomField = (fieldId) => {
        fetch(`http://localhost:3000/patients/${patient.id}/custom_fields/${fieldId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                setCustomFields(customFields.filter(field => field.id !== fieldId));
                console.log(`Deleted custom field with id ${fieldId}`);
            } else {
                throw new Error('Something went wrong');
            }
        })
        .catch(error => console.error('Error deleting custom field:', error));
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {customFields.map(field => (
                    <tr key={field.id}>
                        <td>
                            {editingCustomFieldId === field.id ? (
                                <input type="text" name="name" value={field.name} onChange={(e) => handleInputChange(e, field.id)} />
                            ) : (
                                field.name
                            )}
                        </td>
                        <td>
                            {editingCustomFieldId === field.id ? (
                                <input type="text" name="value" value={field.value} onChange={(e) => handleInputChange(e, field.id)} />
                            ) : (
                                field.value
                            )}
                        </td>
                        <td>
                            {editingCustomFieldId === field.id ? (
                                <button className="button button-success" onClick={() => saveEditedCustomField(field)}>Save</button>
                            ) : (
                                <>
                                    <button className="button" onClick={() => setEditingCustomFieldId(field.id)}>Edit</button>
                                    <button className="button button-danger" onClick={() => deleteCustomField(field.id)}>DEL</button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        <input type="text" name="name" value={newCustomField.name} onChange={handleNewCustomFieldInputChange} />
                    </td>
                    <td>
                        <input type="text" name="value" value={newCustomField.value} onChange={handleNewCustomFieldInputChange} />
                    </td>
                    <td>
                        <button className="button button-success" onClick={addCustomField}>+</button>
                    </td>
                </tr>
            </tfoot>
        </table>
    );
}

export default PatientCustomFieldTable;
