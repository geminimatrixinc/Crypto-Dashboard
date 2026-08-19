

// Example 1: Using useState
import React, { useState, useEffect } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(`loaded`)
    })

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}
export default Counter;

class CounterWithClass extends React.Component {

    constructor() {
        super();

        this.state = {
            count: 0
        }
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    handleClick () {
        this.setState({ count: this.state.count + 1 });
    }
  
    render() {
        return <div>
            <p>Count: {this.state.count}</p>
            <button onClick={() => this.handleClick}>Increment</button>
        </div>
    }
}



