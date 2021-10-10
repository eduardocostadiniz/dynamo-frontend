

import { useState } from 'react';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/pt';
import { useParams } from 'react-router';

import { Button } from '../../components/Button'

import tablesService from '../../services/tables'

import './styles.scss'

const DEFAULT_AREA_WIDTH = '600px'
const DEFAULT_AREA_HEIGHT = '500px'

function NewItem() {
  let {table} = useParams()
  let [item, setItem] = useState({})
  let [hasError, setHasError] = useState(false)

  function handleEditorChange(value) {
    setItem(value.jsObject)
    setHasError(!!value.error)
  }

  function handleNewItem () {
    tablesService.manageItem(table, item)
  }

  return (
    <div className='newItemContainer'>
      <p>Novo Item em <strong>{table}</strong></p>
      <div>
        <JSONInput
          id='jsonItemEditor'
          placeholder={item}
          locale={locale}
          confirmGood={false}
          waitAfterKeyPress={2000}
          onChange={handleEditorChange}
          width={DEFAULT_AREA_WIDTH}
          height={DEFAULT_AREA_HEIGHT}
        />
      </div>
      <Button
        onClick={handleNewItem}
        disabled={hasError}
      >
        Inserir
      </Button>
    </div>
  )
}

// function UpdateItem() {
//   return (
//     <div>TODO</div>
//   )
// }

function Item() {
  return (
    <NewItem />
  )
}

export { Item }