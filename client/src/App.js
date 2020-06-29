import React from "react";
import axios from 'axios'

const API_URL = '/api'

function App() {
  const columns = Array.from({ length: 10 }).map((_, ix) => String.fromCharCode(65 + ix));
  const rows = Array.from({ length: 10 }).map((_, ix) => ix + 1);
  
  const [isLoading, setLoading] = React.useState(true);
  const [isActive, setIsActive] = React.useState({});
  const [grid, setGrid] = React.useState([]);
  const [selectedCell, setSelectedCell] = React.useState('');

  React.useEffect(() => {
    (async () => {
      const res = await axios.get(API_URL)
      setGrid(res.data.rows)
      setLoading(false)
    })()
  }, [])
  
  

  const submitCellValue = async (evt, row, column) => {
    const  { value } = evt.target;
    const digit = /^\d+/;

    if (digit.test(value) || value.indexOf('=') === 0) {
      await axios.post(API_URL,  {
        rowId: row,
        column,
        value,
      })
      const res = await axios.get(' http://localhost:4200/api')
      setGrid(res.data.rows)      
    }
  }

  const getValue = (x) => {
    const digit = /^\d+/;
    
    if (digit.test(x)) {
      return Number(x)
    } else {
      const [col, row] = x.split('')
      return Number(getCellValue(Number(row), col).computed)
    }
  }

  const getCellValue = (row, column) => {
    const rowx = grid.find(({ id }) => id === row)
    
    if(!rowx) return { val: '', computed: ''}

    const cell = rowx.cells.find((cell) => cell.column === column)

    if(!cell) return { val: '', computed: ''}
   

    if(cell.value.indexOf('=') === 0) {
      const [x, y] = cell.value.trim().substring(1).split('+')
      // =
      if(x === '' && y === undefined) {
        return { val: cell.value, computed: String(cell.value)}
      }
      // =A4
      if (x && y === undefined) {
        return { val: cell.value, computed: String(getValue(x))}
      }
      // =A4+B4
      return { val: cell.value, computed: String(getValue(x) + getValue(y))}
    }
    return { val: String(cell.value), computed: String(cell.value) }
  }

  if(isLoading) return null

  return (
    <div className="container">
      <div className="row">
        <input 
          type="text" 
          className="form-control m-3" 
          value={selectedCell}
          onChange={evt => setSelectedCell(evt.target.value)}
        />
      </div>
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              {columns.map((c) => {
                return <th key={`${c}`} className="text-center">{c}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              return (
                <tr key={`${r}`}>
                  <td className="text-center">{r}</td>
                  {columns.map((c) => {
                    const cell = getCellValue(r, c);
                    const isCellActive = isActive[`${c}${r}`]
                    return (
                      <td key={`${r}${c}`}>
                        <input 
                          type="text" 
                          className="form-control"
                          onFocus={(evt) => {
                            setSelectedCell(cell.val)
                            setIsActive({ [`${c}${r}`]: true})
                          }}
                          onBlur={evt => {
                            if (cell.val !== selectedCell ) {
                              submitCellValue(evt, r, c)
                            }
                            setIsActive({ [`${c}${r}`]: false})
                          }}
                          onChange={evt => setSelectedCell(evt.target.value)}
                          value={isCellActive ? selectedCell : cell.computed} 
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
