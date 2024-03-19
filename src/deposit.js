import { useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function Deposit() {
  const [dep, setDep] = useState(0);
  const [userId, setUserId] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://server-4ml3.onrender.com/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  function handleClick(e) {
    e.preventDefault();
    let updateData;

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === Number(userId)) {
        data[i].amount = Number(data[i].amount) + Number(dep);
        updateData = { amount: data[i].amount };
        const url = `https://server-4ml3.onrender.com/update/${data[i]._id}`;
        axios.put(url, updateData);
        alert(`Rs.${dep} Amount Credited on Your Account`);
      }
    }
  }

  return (
    <>
      <img id="depositimg" src="deposit.avif" alt="Deposit" />
      <Form onSubmit={handleClick}>
        <h4>Deposit Your Amount Here</h4>
        <hr />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label id="label">Account No:</Form.Label>
          <Form.Control type="number" id="input" onChange={(e) => { setUserId(e.target.value) }} />
          <Form.Label id="label">Deposit Amount:</Form.Label>
          <Form.Control type="number" id="input" onChange={(e) => { setDep(e.target.value) }} />
          <Button type="submit" id="submitbtn" variant="danger">Submit</Button>
          <Button type="reset" id="resetbtn" variant="primary">Reset</Button>
        </Form.Group>
      </Form>
    </>
  );
}
