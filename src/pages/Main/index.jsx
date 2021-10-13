import React, { useState, useEffect } from 'react'

import tablesService from '../../services/tables'

import './styles.scss'

import Text from '../../components/Text'
import { Button } from '../../components/Button'
import { LinkWrapper } from '../../components/Anchors'
import { Table, TableRow, TableHead, TableHeadItem, TableBody, TableBodyItem } from '../../components/Table'
import { customToast } from '../../components/CustomToast'

function NoData() {
  return (
    <Text>Não há nenhuma tabela ainda! Comece adicionando uma clicando aqui :-)</Text>
  )
}

export default function Content() {
  let [tables, setTables] = useState(null)

  async function handleListTables() {
    const result = await tablesService.listTables()
    setTables(result)
  }

  useEffect(() => {
    handleListTables()

    return () => {
      setTables([])
    }
  }, [])

  async function handleDeleteTable(tableName) {
    try {
      const confirmation = window.confirm(`Deseja realmente excluir a tabela ${tableName}`)
      if (!confirmation) {
        return
      }

      await tablesService.deleteTable(tableName)
      customToast.success(`Tabela ${tableName} excluída com sucesso!`)
      handleListTables()

    } catch (error) {
      customToast.error(error.message)
    }
  }

  return (
    <div className='content'>
      <div className='titleContainer'>
        <Text strong size='big'>TABELAS</Text>
        <LinkWrapper href='/tables/new' type='primary'>Nova Tabela</LinkWrapper>
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
                <LinkWrapper href={`/tables/details/${el}`}>{el}</LinkWrapper>
              </TableBodyItem>
              <TableBodyItem className='tableOperations'>
                <Button onClick={() => handleDeleteTable(el)} size='small' layout='danger'>Excluir</Button>
              </TableBodyItem>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}