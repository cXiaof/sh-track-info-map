import { Button } from 'antd-mobile'
import React from 'react'

interface LoadAllProps {
  loadAll: () => void
}

const LoadAll: React.FC<LoadAllProps> = ({ loadAll }) => {
  return (
    <Button
      className='mt-1'
      block
      color='primary'
      size='mini'
      onClick={loadAll}
    >
      加载历史数据
    </Button>
  )
}

export default React.memo(LoadAll)
