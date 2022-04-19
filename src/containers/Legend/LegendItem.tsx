import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { DotLoading } from 'antd-mobile'
import React, { FC, ReactNode } from 'react'

interface LegendItemProps {
  theme: string
  loading: boolean
  icon?: ReactNode
  title: string
}

const LegendItem: FC<LegendItemProps> = React.memo(
  ({ theme, loading, icon, title }) => {
    return (
      <div className='flex items-center space-x-1' style={{ color: theme }}>
        {loading ? (
          <DotLoading color='currentColor' />
        ) : (
          icon || <ExclamationCircleIcon className='h-4' />
        )}
        <span>{title}</span>
      </div>
    )
  },
)

export default LegendItem
