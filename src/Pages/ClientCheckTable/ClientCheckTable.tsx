import React, {useState} from "react";
import styles from './ClientCheckTable.module.scss';
import classnames from 'classnames';
import moment, {Moment} from "moment";

const prepareDays = (): Day[] =>{
    let days = [];
    let _dateDay = moment();
    let Monday = _dateDay.subtract(_dateDay.day() + 1, 'd');

    for(let i=1; i<8; ++i) {
        let hours = [];

        for(let j=8; j<22; ++j) {
            if (j > 8 && j < 16) {
                hours.push(
                    {
                        id: `${i}-${j}`,
                        value: j,
                        isWorking: true,
                    });
            }
            else hours.push(
                {
                    id: `${i}-${j}`,
                    value: j,
                    isWorking: false,
                });
        }

        days.push({id: i, date: moment(Monday).add(i + 1,'d'),hours: hours});
    }

    return days;
}

interface Hour{
    id: string,
    value: number,
    isWorking: boolean
}

interface Day{
    id: number,
    date: Moment,
    hours: Hour[]
}

const NumDay = (day: number) => {
    let datesWeek = [];
    let date: Date = new Date(Date.now())
    let numDay = date.getDate() - date.getDay() + 1;

    datesWeek.push(numDay);

    for(let i = 1; i < 7; ++i)
        datesWeek.push(numDay+i);

    switch (day) {
        case 1: return datesWeek[0].toString();
        case 2: return datesWeek[1].toString();
        case 3: return datesWeek[2].toString();
        case 4: return datesWeek[3].toString();
        case 5: return datesWeek[4].toString();
        case 6: return datesWeek[5].toString();
        case 7: return datesWeek[6].toString();
        default: return datesWeek[0].toString();
    }
}



let bufComponent: React.ReactNode;
let bufHourComponentProps: HourComponentProps;

interface HourComponentProps{
    hour: Hour,
    date: Moment,
    selected: string,
    setSelected: (value: string) => void
}

const HourComponent = ({hour, date, selected, setSelected}: HourComponentProps) => {
    let isWorking = hour.isWorking && (moment() < date.set('hour', hour.value));

    const selectHour = () =>{

        if(isWorking) {
            if (selected != hour.id) setSelected(hour.id);
            else setSelected('');
        }
    }

    return(
        <div
            id={hour.id.toString()}
            onClick={selectHour}
            className={classnames(
                styles.cell,
                {[styles.selected]: isWorking},
                {[styles.mySelected]: selected === hour.id})}/*второй аргемент, по условию после :*/
        >
            {`${hour.value.toString().padStart(2, '0')}:00`}
        </div>
    );
}



const ClientCheckTable = () =>{
    let days = prepareDays();
    let [_selected, _setSelected] = useState('');

    return(
        <div className={`${styles.table}`}>
            {days.map(day => (
                <div className={styles.column} key={day.id}>
                    {day.date.format('DD.MM')}
                    <div>
                        {day.hours.map(hour => (
                            <HourComponent hour={hour} date={day.date} selected={_selected} setSelected={_setSelected} key={hour.id}/>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ClientCheckTable;