import React, {useState} from "react";
import styles from './ChiefCheckTable.module.scss';
import classnames from 'classnames';

interface Hour{
    id: string,
    value: number,
    selected: boolean
}

interface Day{
    id: number,
    hours: Hour[]
}

const NumDayToString = (day: number) => {
    switch (day) {
        case 1: return "ПН";
        case 2: return "ВТ";
        case 3: return "СР";
        case 4: return "ЧТ";
        case 5: return "ПТ";
        case 6: return "СБ";
        case 7: return "ВС";
        default: return "-";
    }
}

const prepareDays = (): Day[] =>{
    let days = [];

    for(let i=1; i<8; ++i) {
        let hours = [];

        for(let j=8; j<22; ++j) {
            if (j > 8 && j < 16) {
                hours.push({id: `${i}-${j}`, value: j, selected: true});
            }
            else hours.push({id: `${i}-${j}`, value: j, selected: false});
        }

        days.push({id: i, hours: hours});
    }

    return days;
}

interface HourComponentProps{
    hour: Hour
}

const HourComponent = ({hour}: HourComponentProps) => {
    let IsSelected = false;

    if(hour.selected) IsSelected = true;

    let [selected, setSelected] = useState(IsSelected);

    return(
        <div
            className={classnames(styles.cell, {[styles.selected]: selected})}/*второй аргемент, по условию после :*/
        >
            {`${hour.value.toString().padStart(2,'0')}:00`}
        </div>
    );
}

const ChiefCheckTable = () =>{
    let days = prepareDays();

    return(
        <div className={`${styles.table}`}>
            {days.map(day => (
                <div className={styles.column} key={day.id}>
                    {NumDayToString(day.id)}
                    <div>
                        {day.hours.map(hour => (
                            <HourComponent hour={hour} key={hour.id}/>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ChiefCheckTable;