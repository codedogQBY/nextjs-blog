import { FC } from 'react'
import classnames from 'classnames'
interface LineProps {
  color?: string
  height?: number
  scale?: number
  width?: string
  className?: string
}

const Line: FC<LineProps> = ({ color, height, scale, width, className }) => {
  const classes = classnames('line', className)
  return (
    <>
      <span className={classes}></span>
      <style jsx>
        {`
          .line {
            display: inline-block;
            background-color: ${color};
            height: ${height}px;
            ${scale && `transform: scaleY(${scale})`};
            width: ${width}`}
      </style>
    </>
  )
}
Line.defaultProps = {
  color: '#ebebeb',
  height: 1,
  width: '100%',
}

export default Line
