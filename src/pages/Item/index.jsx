

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

function JSONItemEditor({ item, handleSetItem, handleSetHasError }) {
  function handleEditorChange(value) {
    handleSetItem(value.jsObject)
    handleSetHasError(!!value.error)
  }

  return (
    <div>
      <JSONInput
        id='jsonItemEditor'
        placeholder={item}
        locale={locale}
        confirmGood={false}
        waitAfterKeyPress={1500}
        onChange={handleEditorChange}
        width={DEFAULT_AREA_WIDTH}
        height={DEFAULT_AREA_HEIGHT}
      />
    </div>
  )
}

function ButtonHandler({ hasError, item, handleManageItem }) {
  return (
    <Button
      onClick={handleManageItem}
      disabled={hasError || (item && Object.keys(item).length === 0)}
    >
      Salvar
    </Button>
  )
}

function Item() {
  let history = useHistory()
  let { table } = useParams()
  const { keyData } = useLocation()
  let [item, setItem] = useState({})
  let [hasError, setHasError] = useState(false)

  useEffect(() => {
    async function getItem() {
      const item = await tablesService.getItem(table, keyData)
      setItem(item)
    }

    if (!!keyData) {
      // apenas atualiza com dados se passar parâmetros de chaves
      getItem()
    }

    return () => {
      setItem({})
      setHasError(false)
    }
  }, [keyData, table])

  async function handleManageItem() {
    try {
      await tablesService.manageItem(table, item)
      customToast.success('Os dados foram salvos com sucesso!')
      setTimeout(function () {
        history.push(`/tables/details/${table}`)
      }, 2000)
    } catch (err) {
      customToast.error(`Erro ao adicionar o registro: ${err.message}`)
    }
  }

  return (
    <div className='itemContainer'>
      <p>Item em <strong>{table}</strong></p>
      <p className='itemWarning'>
        <strong>Atenção:</strong>Aguarde 2 segundos após editar para o JSON ser validado.
      </p>
      <JSONItemEditor item={item} handleSetItem={setItem} handleSetHasError={setHasError} />
      <ButtonHandler hasError={hasError} item={item} handleManageItem={handleManageItem} />
    </div>
  )
}

export { Item }