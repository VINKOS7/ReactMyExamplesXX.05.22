import {useState} from "react";
import styles from './TableCalendar.module.scss';
import classnames from 'classnames';

interface Hour{
    id: string,
    value: number
    isSelected: boolean
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
        let _hours = [];

        for(let j=8; j<22; ++j)
            _hours.push({id: `${i}-${j}`, isSelected: false, value: j});

        days.push({id: i, hours: _hours});
    }

    return days;
}

class DayAndHour{
    day: number;
    hour: number;

    constructor(_day: number, _hour: number) {
        this.day = _day;
        this.hour = _hour;
    }
}

const ConvertHourIdToNumber = (HourId: string): DayAndHour => {
    let day: number = 0;
    let hour: number = 0;

    if(HourId.search(/\d-\d{1,2}/) !== -1){
        day = Number(HourId.match(/\d/));
        hour = Number(HourId.match(/-\d+/))*-1;
    }

    return new DayAndHour(day, hour);
}


const CalcCellsSelection = (usedCells: DayAndHour[], useCells: DayAndHour[], startId: DayAndHour, endId: DayAndHour) => {
    let cells: DayAndHour[] = [];
    let buf;

    if(startId.day > endId.day){
        buf = startId.day;
        startId.day = endId.day;
        endId.day = buf;
    }

    if(startId.hour > endId.hour){
        buf = startId.hour;
        startId.hour = endId.hour;
        endId.hour = buf;
    }

    //поиск ячеек
    for(let i = startId.day; i <= endId.day; ++i){
        for(let j = startId.hour; j <= endId.hour; ++j){
            cells.push(new DayAndHour(i, j));
        }
    }


    //сохранение ячеек совпадающие с выбраными и выбирающиеемся
    let bufCells: DayAndHour[] = [];
    for(let i = 0; i < usedCells.length; ++i){
        for(let j = 0; j < cells.length; ++j){
            if(
                usedCells[i].hour === cells[j].hour
                &&
                usedCells[i].day === cells[j].day
                && j !== i
            ) bufCells.push(useCells[j]);
        }
    }

    //добавление выбранных
    cells = cells.concat(usedCells);

    // удаление
    for(let i = 0; i < bufCells.length; ++i){
        for(let j = 0; j < cells.length; ++j){
            if(
                cells[j].hour === bufCells[i].hour
                &&
                cells[j].day === bufCells[i].day
            ) {
                cells.splice(j,1);
                --j;
            }
        }
    }

    return cells;
}

/*cells.filter((item) =>
    item.day === bufCells[i].day
    &&
    item.hour === bufCells[i].hour
);*/

interface HourComponentProps{
    hour: Hour,
    startCell: string;
    usedCells: DayAndHour[],
    useCells: DayAndHour[],
    setStartCell: (values: string) => void,
    setUsedCells: (values: DayAndHour[]) => void,
    setUseCells: (values: DayAndHour[]) => void
}

const IsSelectedCell = (cells: DayAndHour[], HourId: string) =>{
    for(let i = 0; i < cells.length; ++i){
        if(
            ConvertHourIdToNumber(HourId).day === cells[i].day
        &&
            ConvertHourIdToNumber(HourId).hour === cells[i].hour){
            return true;
        }
    }
}

const HourComponent = ({hour, startCell, setStartCell, usedCells, useCells, setUsedCells, setUseCells}: HourComponentProps) => {
    return(
        <div
            onMouseDown={(click) => {
                if(click.button === 0) {
                    setStartCell(hour.id);
                    useCells.push(
                        ConvertHourIdToNumber(hour.id),
                    );
                }
            }}
            onMouseMove={(click) => {
                if (startCell !== hour.id && startCell !== '') {
                    useCells = CalcCellsSelection([], [],
                        ConvertHourIdToNumber(startCell),
                        ConvertHourIdToNumber(hour.id)
                    );
                    setUseCells(useCells);
                }
            }}
            onMouseUp={(click) =>{
                if(click.button === 0) {
                    usedCells = CalcCellsSelection(usedCells, useCells,
                        ConvertHourIdToNumber(startCell),
                        ConvertHourIdToNumber(hour.id)
                    );
                    setUsedCells(usedCells);
                    setUseCells([]);
                    startCell = '';
                    setStartCell(startCell);
                }
            }}
            className={classnames(
                styles.cell,
                {[styles.selected]: IsSelectedCell(usedCells, hour.id)},
                {[styles.useCell]: IsSelectedCell(useCells, hour.id)},
                {[styles.useAndUsedCell]: IsSelectedCell(useCells, hour.id) && IsSelectedCell(usedCells, hour.id)})}/*второй аргемент, по условию после :*/
        >
            {`${hour.value.toString().padStart(2,'0')}:00`}
        </div>
    );
}

const TableAndreyLearn = () =>{
    let days = prepareDays();
    let CellsSelection: DayAndHour[] = [];
    let CellsUse: DayAndHour[] = [];
    let [usedCells, setUsedCells] = useState(CellsSelection)
    let [_useCells, _setUseCells] = useState(CellsUse)
    let [_startCell, _setStart] = useState('');

    return(
        <div>
            <div
                onDoubleClick={(click) =>{
                    setUsedCells([])
                    _setUseCells([]);
                    _setStart('');
                }}
                onMouseUp={() =>{

                    _setUseCells([]);
                    _setStart('');
                }}
                onMouseLeave={() =>{
                    _setUseCells([]);
                    _setStart('');
                }}
                className={`${styles.table}`}>
                {days.map(day => (
                    <div className={styles.column} key={day.id}>
                        {NumDayToString(day.id)}
                        <div>
                            {day.hours.map(hour => (
                                <HourComponent
                                    hour={hour}
                                    startCell={_startCell}
                                    setStartCell={_setStart}
                                    usedCells={usedCells}
                                    useCells={_useCells}
                                    setUsedCells={setUsedCells}
                                    setUseCells={_setUseCells}
                                    key={hour.id}/>
                            ))}
                        </div>
                    </div>
                ))}

            </div>
            <button className={`${styles.buttonSaveHours}`}>SAVE</button>
        </div>
    );
}

export default TableAndreyLearn;