import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LinkWrapper } from '../../components/Anchors'
import { TableInfo } from './TableInfo'
import { TableData } from './TableData'

import './styles.scss'

import tablesService from '../../services/tables'
import Text from '../../components/Text'

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
      < hr />
      <Text size='small' strong layout='success'>Criar tela de edição de itens na tabela</Text>
      <Text size='small' strong layout='success'>Criar tela de criação de itens na tabela</Text>
      <Text size='small' strong layout='success'>Criar tela de adicionar novas tabelas</Text>
      <Text size='small' strong layout='success'>Criar componente de paginação</Text>
      <Text size='small' strong layout='success'>Transformar CSS para SCSS (Sass)</Text>
    </div>
  )
}

export { TableDetails }
