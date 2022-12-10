import React from 'react';
import { formatHoursArr } from '../../../utils/time';

function Hours(props) {
    const hours = props.hours;

    return (
        <div className="flex flex-col">
            <p className="font-bold">Hours:</p>
            <div className='flex gap-2'>
                <div>
                    <p>{`Sunday:`}</p>
                    <p>{`Monday:`}</p>
                    <p>{`Tuesday:`}</p>
                    <p>{`Wednesday:`}</p>
                    <p>{`Thursday:`}</p>
                    <p>{`Friday:`}</p>
                    <p>{`Saturday:`}</p>
                </div>
                <div>
                    <p>{`${formatHoursArr(hours.sun)}`}</p>
                    <p>{`${formatHoursArr(hours.mon)}`}</p>
                    <p>{`${formatHoursArr(hours.tue)}`}</p>
                    <p>{`${formatHoursArr(hours.wed)}`}</p>
                    <p>{`${formatHoursArr(hours.thu)}`}</p>
                    <p>{`${formatHoursArr(hours.fri)}`}</p>
                    <p>{`${formatHoursArr(hours.sat)}`}</p>
                </div>
            </div>
        </div>
    );
}

export default Hours;
