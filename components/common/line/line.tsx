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
      <div className={classes}></div>
      <style jsx>
        {`
          .line {
            background-color: ${color};
            height: ${height}px;
            ${scale && `transform: scaleY(${scale})`};
            width: ${width}`}
      </style>
    </>
  )
}
Line.defaultProps = {
  color: 'white',
  height: 1,
  width: '100%',
}

export default Line
