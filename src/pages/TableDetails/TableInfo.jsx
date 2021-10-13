
import Text from '../../components/Text'

import './styles.scss'

function TableInfo({ tableInfo }) {
  const TYPE_MAPPING = {
    S: 'String',
    N: 'Número'
  }

  function formatDateTime(datetime) {
    if (!datetime) {
      return ''
    }
    return new Date(datetime).toLocaleString()
  }

  return (
    <div className='tableDetails'>
      <Text align='center' strong>{tableInfo && tableInfo.TableName}</Text>
      <Text><strong>Criado em: </strong>{formatDateTime(tableInfo && tableInfo.CreationDateTime)}</Text>
      <Text><strong>Total de registros: </strong>{tableInfo && tableInfo.ItemCount}</Text>
      <Text>
        <strong>Chaves: </strong>
        {tableInfo && tableInfo.KeySchema.map(el =>
          <span key={el.AttributeName}>
            {el.KeyType}: <i>{el.AttributeName}</i> &nbsp;
          </span>
        )}
      </Text>
      <Text>
        <strong>Tipo das chaves: </strong>
        {tableInfo && tableInfo.AttributeDefinitions.map(el =>
          <span key={el.AttributeName}>
            {el.AttributeName}: <i>{TYPE_MAPPING[el.AttributeType]}</i> &nbsp;
          </span>
        )}
      </Text>
      <Text>
        <strong>Unidades de capacidade: </strong>
        [Leitura]&rarr;{tableInfo && tableInfo.ProvisionedThroughput.ReadCapacityUnits} |
        [Escrita]:&rarr;{tableInfo && tableInfo.ProvisionedThroughput.ReadCapacityUnits}
      </Text>
    </div>
  )
}

export { TableInfo }
