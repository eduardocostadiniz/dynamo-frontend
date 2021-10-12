import Text from '../../components/Text'
import svgCopy from '../../assets/copy.svg'
import svgEdit from '../../assets/pencil.svg'
import svgDelete from '../../assets/wast-basket.svg'
import { Table, TableRow, TableHead, TableHeadItem, TableBody, TableBodyItem } from '../../components/Table'

import './styles.scss'

import { useEffect, useState } from 'react'
import tablesService from '../../services/tables'
import { useHistory } from 'react-router'

function TableData({ tableKeys, tableName }) {
  let history = useHistory()
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    async function getTableData() {
      const data = await tablesService.scanData(tableName)
      setTableData(data)
    }
    if (tableKeys && tableKeys.length) {
      getTableData()
    }

    return () => {
      setTableData([])
    }
  }, [tableKeys, tableName])

  function renderTableHeader() {
    return (
      <TableHead>
        <TableRow className='tableDataHeader'>
          {tableKeys.map(keyName => <TableHeadItem key={keyName}>{keyName}</TableHeadItem>)}
          <TableHeadItem key='dados'>Dados</TableHeadItem>
          <TableHeadItem key='operacoes'>Operações</TableHeadItem>
        </TableRow>
      </TableHead>
    )
  }

  function renderItem(value) {
    if (!value) {
      return <></>
    }
    return (
      <TableBodyItem>
        <Text>{value}</Text>
      </TableBodyItem>
    )
  }

  function renderSVG(svgIcon, alt, onClick, action = 'default') {
    return (
      <img src={svgIcon} alt={alt} className={`svgIcon ${action}`} onClick={onClick} />
    )
  }

  function limitTextData(text) {
    if (text && text.length > 150) {
      return `${text.substr(0, 150)} ...`
    }
    return text
  }

  function copyToClipboard(data) {
    window.navigator.clipboard.writeText(JSON.stringify(data))
  }

  function handleEditItem(hashKey, rangeKey, data) {
    const keyData = buildKeyData(hashKey, rangeKey, data)  
    history.push({
      pathname: `/tables/item/${tableName}`,
      state: keyData
    })
  }

  function buildKeyData(hashKey, rangeKey, data) {
    const hashIdItem = data[hashKey]
    const rangeIdItem = data[rangeKey]
    const keyData = {}
    keyData[hashKey] = hashIdItem
    if (rangeKey) {
      keyData[rangeKey] = rangeIdItem
    }
    return keyData
  }

  async function handleDeleteItem(hashKey, rangeKey, data) {
    const answer = window.confirm(`Deseja realmente excluir o item da tabela ${tableName}?`)
    if (answer) {
      const keyData = buildKeyData(hashKey, rangeKey, data)      
      const deleted = await tablesService.deleteItem(tableName, keyData)
      if (deleted) {
        const registers = await tablesService.scanData(tableName)
        setTableData(registers)
      }
    }
  }

  function renderBodyItems(data) {
    const [hashKey, rangeKey] = tableKeys
    const dataCopy = Object.assign({}, data)
    delete dataCopy[hashKey]
    delete dataCopy[rangeKey]
    const dataText = limitTextData(JSON.stringify(dataCopy, null, ' '))

    return (
      <TableRow key={`${data[hashKey]}-${data[rangeKey]}`}>
        {renderItem(data[hashKey])}
        {renderItem(data[rangeKey])}
        {renderItem(dataText)}
        <TableBodyItem>
          <Text className='svgActions'>
            {renderSVG(svgCopy, 'Copiar', () => copyToClipboard(data))}
            {renderSVG(svgEdit, 'Editar', () => handleEditItem(hashKey, rangeKey, data), 'edit')}
            {renderSVG(svgDelete, 'Excluir', () => handleDeleteItem(hashKey, rangeKey, data), 'delete')}
          </Text>
        </TableBodyItem>
      </TableRow>
    )
  }

  function renderTableBody() {
    return (
      <TableBody>
        {tableData.map(data => renderBodyItems(data))}
      </TableBody>
    )
  }

  return (
    <div className='tableData'>
      <Table hasData={!!tableData.length}>
        {renderTableHeader()}
        {renderTableBody()}
      </Table>
    </div>
  )
}

export { TableData }
