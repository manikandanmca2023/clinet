import { useState, useEffect } from "react";
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

export default function Alldata() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (index) => {
    try {
      const deleteId = data[index]._id;
      await axios.delete(`https://server-4ml3.onrender.com/delete/${deleteId}`);
      alert(`Account ${data[index].id} deleted from the database`);
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <>
      <h2>Bank Users Database</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>AccountNo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Balance</th>
            <th>Delete Option</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) =>
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>{item.amount}</td>
              <td><Button onClick={() => handleDelete(index)}>Delete</Button></td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}
