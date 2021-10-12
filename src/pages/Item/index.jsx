

import { useEffect, useState } from 'react';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/pt';
import { useHistory, useLocation, useParams } from 'react-router';

import { Button } from '../../components/Button'
import { customToast } from '../../components/CustomToast';

import tablesService from '../../services/tables'

import './styles.scss'

const DEFAULT_AREA_WIDTH = '600px'
const DEFAULT_AREA_HEIGHT = '500px'

function JSONItemEditor({ item, onEditorChange }) {
  return (
    <div>
      <JSONInput
        id='jsonItemEditor'
        placeholder={item}
        locale={locale}
        confirmGood={false}
        waitAfterKeyPress={1500}
        onChange={onEditorChange}
        width={DEFAULT_AREA_WIDTH}
        height={DEFAULT_AREA_HEIGHT}
      />
    </div>
  )
}

function ButtonHandler({hasError, item, handleManageItem, feedback}) {
  return (
    <Button
      onClick={() => handleManageItem(item, feedback)}
      disabled={hasError || (item && Object.keys(item).length === 0)}
    >
      Salvar
    </Button>
  )
}

function NewItem({ table, handleManageItem }) {
  let [item, setItem] = useState({})
  let [hasError, setHasError] = useState(false)

  function handleEditorChange(value) {
    setItem(value.jsObject)
    setHasError(!!value.error)
  }

  return (
    <div className='itemContainer'>
      <p>Novo Item em <strong>{table}</strong></p>
      <JSONItemEditor item={item} onEditorChange={handleEditorChange} />
      <ButtonHandler hasError={hasError} item={item} handleManageItem={handleManageItem} feedback='inserido' />
    </div>
  )
}

function UpdateItem({ data, table, handleManageItem }) {
  let [item, setItem] = useState({})
  let [hasError, setHasError] = useState(false)

  useEffect(() => {
    async function getItem() {
      const item = await tablesService.getItem(table, data)
      setItem(item)
    }
    getItem()

    return () => {
      setItem({})
    }
  }, [data, table])

  function handleEditorChange(value) {
    setItem(value.jsObject)
    setHasError(!!value.error)
  }

  return (
    <div className='itemContainer'>
      <p>Atualizando Item em <strong>{table}</strong></p>
      <JSONItemEditor item={item} onEditorChange={handleEditorChange} />
      <ButtonHandler hasError={hasError} item={item} handleManageItem={handleManageItem} feedback='atualizado' />
    </div>
  )
}

function Item() {
  let history = useHistory()
  let { table } = useParams()
  const { state } = useLocation()

  async function handleManageItem(item, operation) {
    try {
      await tablesService.manageItem(table, item)
      customToast.success(`Item ${operation} com sucesso!!!`)
      setTimeout(function () {
        history.push(`/tables/details/${table}`)
      }, 2000)
    } catch (err) {
      customToast.error(`Erro ao adicionar o registro: ${err.message}`)
    }
  }

  return (
    !!state ?
      <UpdateItem data={state} table={table} handleManageItem={handleManageItem} /> :
      <NewItem handleManageItem={handleManageItem} table={table} />
  )
}

// TODO: Averiguar se há uma forma de melhorar a questão de passagem de parametros em cascata

export { Item }