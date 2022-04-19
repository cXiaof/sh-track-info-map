import { Divider } from 'antd-mobile'
import React from 'react'

const Notice = React.memo(() => {
  return (
    <div>
      <p className='text-center font-semibold mt-0'>制作目的</p>
      <div className='indent-4'>
        制作本页是为方便<b>没有或不会使用</b>
        支付宝/高德/百度等大厂疫情地图的亲朋好友，了解上海本轮疫情信息使用，
        <b>以免被谣言误导</b>。
      </div>
      <div className='indent-4'>
        望各位亲友<b>不信谣、不传谣</b>，注意个人防护，做到
        <b>防疫“三件套”，防护“五还要”</b>。
      </div>
      <div className='indent-4'>
        会使用大厂疫情地图的朋友请<b>关闭</b>本页，在<b>百度/高德</b>
        搜索“
        <b>疫情地图</b>”了解疫情信息，谢谢。
      </div>
      <Divider />
      <p className='text-center font-semibold mb-0'>数据源说明</p>
      <ol className='pl-5'>
        <li>
          本页地址数据全部来源于<b>上海发布</b>
          ，除标点符号修整外<b>未改动</b>任何信息。
        </li>
        <li>
          本页坐标信息来源于<b>高德地理编码</b>API，坐标和地址信息
          <b>未经任何</b>
          修整，底图为高德开放底图。地图引擎为<b>MAP</b>
          TALKS国产开源地图引擎。
        </li>
        <li>
          每日中午前更新前一天数据，具体时间随<b>上海发布</b>更新而定
        </li>
        <li>
          本页<b>不保留或分析任何用户信息</b>
          。位置信息仅作页面内地图定位使用。
        </li>
      </ol>
    </div>
  )
})

export default Notice
