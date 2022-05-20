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
        <div>加载历史数据</div>
        <div className='text-xs'>(推荐在电脑端查看)</div>
      </Button>
    </div>
  )
}

export default React.memo(LoadAll)
