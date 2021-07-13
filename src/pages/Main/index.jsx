import React, { useState, useEffect } from 'react'

import tablesService from '../../services/tables'

import './styles.scss'

import Text from '../../components/Text'
import Button from '../../components/Button'
import { LinkWrapper } from '../../components/Anchors'
import { Table, TableRow, TableHead, TableHeadItem, TableBody, TableBodyItem } from '../../components/Table'

function NoData() {
  return (
    <Text>Não há nenhuma tabela ainda! Comece adicionando uma clicando aqui :-)</Text>
  )
}

export default function Content() {
  let [tables, setTables] = useState(null)

  useEffect(() => {
    async function handleListTables() {
      const result = await tablesService.listTables()
      setTables(result)
    }
    handleListTables()

    return setTables([])
  }, [])

  return (
    <div className='content'>
      <div className='titleContainer'>
        <Text strong size='big'>TABELAS</Text>
      </div>
      <Table hasData={!!tables} placeholder={<NoData />}>
        <TableHead>
          <TableRow>
            <TableHeadItem>Nome</TableHeadItem>
            <TableHeadItem className='tableOperations'></TableHeadItem>
          </TableRow>
        </TableHead>
        <TableBody>
          {tables && tables.map(el =>
            <TableRow key={el}>
              <TableBodyItem>
                <LinkWrapper href={`/tables/${el}`}>{el}</LinkWrapper>
              </TableBodyItem>
              <TableBodyItem className='tableOperations'>
                <Button onClick={() => ''} size='small' layout='danger'>Excluir</Button>
              </TableBodyItem>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}