import React from 'react';
import PropTypes from 'prop-types';

const Counter = (props) => {
    return (
        <table className="counter">
        <tbody>
          <tr>
            <td>Attending:</td>
            <td>{props.numberAttending}</td>
          </tr>
        </tbody>
      </table>
    );
};

Counter.propTypes = {
    numberAttending: PropTypes.number,
    numberUnconfirmed: PropTypes.number,
    totalInvited: PropTypes.number
};

export default Counter;
