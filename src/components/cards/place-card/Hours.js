import React from 'react';
import { formatHoursArr } from '../../../utils/time';

function Hours(props) {
    const hours = props.hours;

    return (
        <div className="flex flex-col">
            <p className='font-bold'>Hours:</p>
            <p>{`Sunday: ${formatHoursArr(hours.sun)}`}</p>
            <p>{`Monday: ${formatHoursArr(hours.mon)}`}</p>
            <p>{`Tuesday: ${formatHoursArr(hours.tue)}`}</p>
            <p>{`Wednesday: ${formatHoursArr(hours.wed)}`}</p>
            <p>{`Thursday: ${formatHoursArr(hours.thu)}`}</p>
            <p>{`Friday: ${formatHoursArr(hours.fri)}`}</p>
            <p>{`Saturday: ${formatHoursArr(hours.sat)}`}</p>
        </div>
    );
}

export default Hours;
