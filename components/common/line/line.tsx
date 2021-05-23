import { FC } from 'react'
interface LineProps {
  color?: string
  height?: number
  scale?: number
  width?: string
}

const Line: FC<LineProps> = ({ color, height, scale, width }) => {
  return (
    <>
      <div className='line'></div>
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
