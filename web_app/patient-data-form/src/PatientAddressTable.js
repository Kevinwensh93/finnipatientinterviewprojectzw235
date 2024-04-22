import React, { useState, useEffect } from 'react';

function PatientAddressTable({ patient }) {
    const [addresses, setAddresses] = useState([]);
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [newAddress, setNewAddress] = useState({
        line1: '',
        line2: '',
        city: '',
        state: '',
        zip: '',
        country: ''
    });

    useEffect(() => {
        // Fetch addresses for the given patient
        fetch(`http://localhost:3000/patients/${patient.id}/addresses`)
            .then(response => response.json())
            .then(data => setAddresses(data))
            .catch(error => console.error('Error fetching addresses:', error));
    }, [patient.id]);

    const handleInputChange = (e, id) => {
        const { name, value } = e.target;
        setAddresses(prevAddresses => prevAddresses.map(address => {
            if (address.id === id) {
                return {
                    ...address,
                    [name]: value
                };
            }
            return address;
        }));
    };

    const handleNewAddressInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress(prevAddress => ({
            ...prevAddress,
            [name]: value
        }));
    };

    const saveEditedAddress = (address) => {
        fetch(`http://localhost:3000/patients/${patient.id}/addresses/${address.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(address)
        })
        .then(response => {
            if (response.ok) {
                console.log(`Address with ID ${address.id} successfully updated.`);
                setEditingAddressId(null);
            } else {
                throw new Error('Failed to update address.');
            }
        })
        .catch(error => console.error('Error updating address:', error));
    };

    const addAddress = () => {
        fetch(`http://localhost:3000/patients/${patient.id}/addresses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAddress)
        })
        .then(response => response.json())
        .then(data => {
            setAddresses([...addresses, data]);
            setNewAddress({
                line1: '',
                line2: '',
                city: '',
                state: '',
                zip: '',
                country: ''
            });
        })
        .catch(error => console.error('Error adding address:', error));
    };

    const deleteAddress = (addressId) => {
        fetch(`http://localhost:3000/patients/${patient.id}/addresses/${addressId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                setAddresses(addresses.filter(address => address.id !== addressId));
                console.log(`Deleted address with id ${addressId}`);
            } else {
                throw new Error('Something went wrong');
            }
        })
        .catch(error => console.error('Error deleting address:', error));
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Line 1</th>
                    <th>Line 2</th>
                    <th>City</th>
                    <th>State</th>
                    <th>ZIP</th>
                    <th>Country</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {addresses.map(address => (
                    <tr key={address.id}>
                        <td>
                            {editingAddressId === address.id ? (
                                <input type="text" name="line1" value={address.line1} onChange={(e) => handleInputChange(e, address.id)} />
                            ) : (
                                address.line1
                            )}
                        </td>
                        <td>
                            {editingAddressId === address.id ? (
                                <input type="text" name="line2" value={address.line2} onChange={(e) => handleInputChange(e, address.id)} />
                            ) : (
                                address.line2
                            )}
                        </td>
                        <td>
                            {editingAddressId === address.id ? (
                                <input type="text" name="city" value={address.city} onChange={(e) => handleInputChange(e, address.id)} />
                            ) : (
                                address.city
                            )}
                        </td>
                        <td>
                            {editingAddressId === address.id ? (
                                <input type="text" name="state" value={address.state} onChange={(e) => handleInputChange(e, address.id)} />
                            ) : (
                                address.state
                            )}
                        </td>
                        <td>
                            {editingAddressId === address.id ? (
                                <input type="text" name="zip" value={address.zip} onChange={(e) => handleInputChange(e, address.id)} />
                            ) : (
                                address.zip
                            )}
                        </td>
                        <td>
                            {editingAddressId === address.id ? (
                                <input type="text" name="country" value={address.country} onChange={(e) => handleInputChange(e, address.id)} />
                            ) : (
                                address.country
                            )}
                        </td>
                        <td>
                            {editingAddressId === address.id ? (
                                <button className="button button-success" onClick={() => saveEditedAddress(address)}>Save</button>
                            ) : (
                                <>
                                    <button className="button" onClick={() => setEditingAddressId(address.id)}>Edit</button>
                                    <button className="button button-danger" onClick={() => deleteAddress(address.id)}>DEL</button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        <input type="text" name="line1" value={newAddress.line1} onChange={handleNewAddressInputChange} />
                    </td>
                    <td>
                        <input type="text" name="line2" value={newAddress.line2} onChange={handleNewAddressInputChange} />
                    </td>
                    <td>
                        <input type="text" name="city" value={newAddress.city} onChange={handleNewAddressInputChange} />
                    </td>
                    <td>
                        <input type="text" name="state" value={newAddress.state} onChange={handleNewAddressInputChange} />
                    </td>
                    <td>
                        <input type="text" name="zip" value={newAddress.zip} onChange={handleNewAddressInputChange} />
                    </td>
                    <td>
                        <input type="text" name="country" value={newAddress.country} onChange={handleNewAddressInputChange} />
                    </td>
                    <td>
                        <button className="button button-success" onClick={addAddress}>Add Address</button>
                    </td>
                </tr>
            </tfoot>
        </table>
    );
}

export default PatientAddressTable;
