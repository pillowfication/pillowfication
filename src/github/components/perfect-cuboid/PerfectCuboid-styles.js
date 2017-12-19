// CSS Modules does not properly compose from other files
// https://github.com/webpack-contrib/css-loader/issues/636
import zf from '../../foundation.scss'
import styles from './PerfectCuboid.scss'

styles.idButton = `${styles.idButton} ${zf.button} ${zf.hollow}`

export default styles
