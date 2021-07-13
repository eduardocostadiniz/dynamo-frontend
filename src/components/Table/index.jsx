
import styles from './Table.module.scss'

import Text from '../Text'


function NoData() {
  return (
    <Text>Nenhum registro disponível.</Text>
  )
}


export function Table({ children, className = styles.table, hasData, placeholder = <NoData />, ...props }) {
  return (
    hasData ?
      <table className={className} {...props}>{children}</table> :
      placeholder
  )
}

export function TableRow({ children, className = styles.tableRow, ...props }) {
  return (
    <tr className={className} {...props}>{children}</tr>
  )
}

export function TableHead({ children, className = styles.tableHeader, ...props }) {
  return (
    <thead className={className} {...props}>{children}</thead>
  )
}

export function TableHeadItem({ children, className = styles.tableHeadItem, ...props }) {
  return (
    <th className={className} {...props}>{children}</th>
  )
}

export function TableBody({ children, className = styles.tableBody, ...props }) {
  return (
    <tbody className={className} {...props}>{children}</tbody>
  )
}

export function TableBodyItem({ children, className = styles.tableBodyItem, ...props }) {
  return (
    <td className={className} {...props}>{children}</td>
  )
}