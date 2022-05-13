import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { DotLoading } from 'antd-mobile'
import React from 'react'

interface LegendItemProps {
  theme: string
  loading: boolean
  icon?: React.ReactNode
  title: string
}

const LegendItem: React.FC<LegendItemProps> = ({
  theme,
  loading,
  icon,
  title,
}) => {
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
}

export default React.memo(LegendItem)
