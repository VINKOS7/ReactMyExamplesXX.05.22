import  './TimeTable.css';


let WeekDays = [
    {id: 1, time: ['11:00', '14:00', '16:00', '17:00', "13:00",'10:00', '9:35']},
    {id: 2, time: ['13:00', '11:00', '16:00', '17:00', "13:00",'10:00', '9:35']},
    {id: 3, time: ['13:00', '14:00', '11:00', '17:00', "13:00",'10:00', '9:35']},
    {id: 4, time: ['13:00', '14:00', '11:00', '12:00', "13:00",'10:00', '9:35']},
    {id: 5, time: ['13:00', '12:00', '16:00', '17:00', "13:00",'10:00', '9:35']},
    {id: 6, time: ['13:00', '14:00', '16:00', '17:00', "13:00",'10:00', '9:35']},
    {id: 7, time: ['13:00', '15:00', '16:00', '17:00', "13:00",'10:00', '9:35']},
    {id: 8, time: ['13:00', '15:00', '16:00', '17:00', "13:00",'10:00', '9:35']},
    {id: 9, time: ['12:00', '15:00', '16:00', '17:00', "13:00",'10:00', '9:35']},
];

let TableRow = WeekDays.map(function(item) {
    return (
        <tbody>
        <tr key={item.id}>
            <td className="table-cell"><input className='cell-input' defaultValue={item.time[0]}></input></td>
            <td className="table-cell"><input className='cell-input' defaultValue={item.time[1]}></input></td>
            <td className="table-cell"><input className='cell-input' defaultValue={item.time[2]}></input></td>
            <td className="table-cell"><input className='cell-input' defaultValue={item.time[3]}></input></td>
            <td className="table-cell"><input className='cell-input' defaultValue={item.time[4]}></input></td>
            <td className="table-cell"><input className='cell-input' defaultValue={item.time[5]}></input></td>
            <td className="table-cell"><input className='cell-input' defaultValue={item.time[6]}></input></td>
        </tr>
        </tbody>
    );
});


const TableHeader = ( ) =>{
    return (
        <thead>
        <tr>
            <td className="table-cell-header">Monday</td>
            <td className="table-cell-header">Tuesday</td>
            <td className="table-cell-header">Wednesday</td>
            <td className="table-cell-header">Thursday</td>
            <td className="table-cell-header">Friday</td>
            <td className="table-cell-header">Saturday</td>
            <td className="table-cell-header">Sunday</td>
        </tr>
        </thead>
    );
}

const Table = () =>{
    return (
        <div className='MyTable'>
            <table>
                <TableHeader/>
                {TableRow}
            </table>
        </div>
    );
}

const MyTable = () =>{
    return Table();
}

export default MyTable;