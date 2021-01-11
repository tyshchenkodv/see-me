import React from 'react';

export default function Profile ({setUserFitstName, setUserSecondName}) {
    const handleSubmit = (event) => {
        setUserFitstName(event.target.input1.value);
        setUserSecondName(event.target.input2.value);

        event.preventDefault();
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">First name</label>
                <input type="text"
                       className="form-control"
                       id="input1"
                       placeholder="Enter first name"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Second name</label>
                <input type="text"
                       className="form-control"
                       id="input2"
                       placeholder="Enter second name"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}
