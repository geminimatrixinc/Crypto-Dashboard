import React, { useEffect, useState } from 'react';

const Fetch = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    const fetchData = async () => {

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();

            setData(data);
            setLoading(false);
        }
        catch (error) {
            setError(error);
            setLoading(false);
        }
   
    }

    const fetchWithPromise = () => {

        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });

    }
    // component did mount..
    useEffect(() => {

        fetchData();

    }, []);

    // component updated ===> loading changed
    useEffect(() => {
        console.log(`loading updated..`)
    },[loading]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>{item.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Fetch;
