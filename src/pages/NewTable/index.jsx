

import { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'

import Text from '../../components/Text'
import { Input } from '../../components/Input'

import './styles.scss'
import { Option, Select } from '../../components/Select'

import tablesService from '../../services/tables'
import { customToast } from '../../components/CustomToast'


function TypeSelect({ ...props }) {
  return (
    <Select label='Tipo do campo:' {...props}>
      <Option value='S'>Texto</Option>
      <Option value='N'>Número</Option>
    </Select>
  )
}

function NewTable() {
  let history = useHistory();

  let [tableName, setTableName] = useState('')
  let [hashKey, setHashKey] = useState('')
  let [hashKeyType, setHashKeyType] = useState('S')
  let [rangeKey, setRangeKey] = useState('')
  let [rangeKeyType, setRangeKeyType] = useState('S')
  let [writeCapability, setWriteCapability] = useState(5)
  let [readCapability, setReadCapability] = useState(5)
  let [loading, setLoading] = useState(false)

  useEffect(() => {
    return () => {
      setTableName('')
      setHashKey('')
      setHashKeyType('S')
      setRangeKey('')
      setRangeKeyType('S')
      setWriteCapability(5)
      setReadCapability(5)
      setLoading(false)
    }
  }, [])

  function handleKeys(e, handler) {
    try {
      const name = e.target.value || ''
      handler(name.replaceAll(' ', ''))
    } catch (error) {
      handler('')
    }
  }

  function handleCapability(e, handler) {
    try {
      handler(Number(e.target.value))
    } catch (error) {
      handler(5)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setLoading(true)

    const payload = {
      tableName,
      hashKey,
      hashKeyType,
      rangeKey,
      rangeKeyType,
      writeCapability,
      readCapability
    }

    try {
      await tablesService.createTable(payload)
      customToast.success('Tabela inserida com sucesso!!!')
      setTimeout(function() {
        history.push('/tables')
      }, 2000)
    } catch (error) {
      setLoading(false)
      customToast.error(`Erro ao inserir a tabela: ${error.message}`)
    }
  }

  return (
    <div className='formularioNovaTabela'>
      <Text size='big' layout='primary'>Nova Tabela</Text>
      <form onSubmit={handleSubmit}>
        <div className='fullRow'>
          <Input
            label='Nome da tabela:'
            placeholder='Nome_Da_Tabela'
            value={tableName}
            disabled={loading}
            onChange={(e) => handleKeys(e, setTableName)}
          />
        </div>
        <div className='halfRow'>
          <Input
            label='Hash Key:'
            placeholder='hash_id'
            value={hashKey}
            disabled={loading}
            onChange={(e) => handleKeys(e, setHashKey)}
          />
          <TypeSelect
            value={hashKeyType}
            disabled={!hashKey || loading}
            onChange={(e) => setHashKeyType(e.target.value)}
          />
        </div>
        <div className='halfRow'>
          <Input
            label='Range Key:'
            placeholder='range_id'
            value={rangeKey}
            disabled={loading}
            onChange={(e) => handleKeys(e, setRangeKey)}
          />
          <TypeSelect
            value={rangeKeyType}
            disabled={!rangeKey || loading}
            onChange={(e) => setRangeKeyType(e.target.value)}
          />
        </div>
        <div className='halfRow'>
          <Input
            label='Capacidade de Escrita:'
            type='number'
            value={writeCapability}
            min={1}
            disabled={loading}
            onChange={(e) => handleCapability(e, setWriteCapability)}
          />
          <Input
            label='Capacidade de Leitura:'
            type='number'
            value={readCapability}
            min={1}
            disabled={loading}
            onChange={(e) => handleCapability(e, setReadCapability)}
          />
        </div>
        <button type='submit'>Adicionar</button>
      </form>
    </div>
  )
}

export { NewTable }