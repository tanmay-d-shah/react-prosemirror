import { FC, ReactNode, useState } from 'react'
export interface PillProps {
  name: string
  isInteractive: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  leftIconOnClick?: () => void
  rightIconOnClick?: () => void
  className?: string
  textClass?: string
  textClick?: () => void
  showTitleAttribute?: boolean
}

export const Pill: FC<PillProps> = (props: PillProps) => {
  const [visibility, setVisibility] = useState<Document['visibilityState']>('hidden')
  const style = {
    visibility: visibility
  }
  return (
    <span
      className={`pill flex justify-center items-center ${props.className ?? ''}`}
      onClick={props.textClick}
      onMouseEnter={() => props.isInteractive ? setVisibility('visible') : null}
      onMouseLeave={() => setVisibility('hidden')}
      title={props.showTitleAttribute ? `{${props.name}}` : ''}
    >
      {
        <span
          style={style}
          onClick={(e) => {
            e.stopPropagation()
            if (props.leftIconOnClick) {
              props.leftIconOnClick()
            }
          }}
        >
          {props.leftIcon ?? ''}
        </span>
      }
      <span className={props.textClass ?? ''}>
        {`{${props.name}}`}
      </span>

      {
        <span
          style={style}
          onClick={(e) => {
            e.stopPropagation()
            if (props.rightIconOnClick) {
              props.rightIconOnClick()
            }
          }}
        >
          {props.rightIcon ?? ''}
        </span>
      }
    </span>
  )
}
