
import { RawLink } from '../Anchors'
import './styles.scss'


export default function Footer() {
  const USER_GITHUB_ADDRESS = 'https://github.com/eduardocostadiniz'
  return (
    <footer>
      Desenvolvido por <i><RawLink href={USER_GITHUB_ADDRESS}>Eduardo Costa Diniz</RawLink></i>
    </footer>
  )
}
