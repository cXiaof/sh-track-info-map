import { Button, Divider } from 'antd-mobile'
import React from 'react'

interface LoadAllProps {
  loadAll: () => void
}

const LoadAll: React.FC<LoadAllProps> = ({ loadAll }) => {
  return (
    <div className='text-center'>
      <Divider />
      <Button block color='primary' size='mini' onClick={loadAll}>
        加载历史数据
      </Button>
      <div className='text-xs'>(推荐在电脑端查看)</div>
    </div>
  )
}

export default React.memo(LoadAll)
