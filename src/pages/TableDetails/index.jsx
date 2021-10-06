import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LinkWrapper } from '../../components/Anchors'
import { TableInfo } from './TableInfo'
import { TableData } from './TableData'

import './styles.scss'

import tablesService from '../../services/tables'

function TableDetails() {
  const { name } = useParams()
  const [tableInfo, setTableInfo] = useState(undefined)
  const [tableKeys, setTableKeys] = useState([])

  useEffect(() => {
    async function describeTable() {
      const info = await tablesService.describeTable(name)
      setTableInfo(info)
      getKeysFromTableInfo(info)
    }
    describeTable()

    return () => {
      setTableInfo(undefined)
      setTableKeys([])
    }
  }, [name])

  function getKeysFromTableInfo(info) {
    const keys = []
    info && info.KeySchema.map(el => keys.push(el.AttributeName))
    setTableKeys(keys)
  }

  return (
    <div>
      <LinkWrapper href='/tables' type='primary'>HOME</LinkWrapper>
      <div className='containerDetails'>
        <TableInfo tableInfo={tableInfo} />
        <TableData tableKeys={tableKeys} tableName={name} />
      </div>
    </div>
  )
}

export { TableDetails }
