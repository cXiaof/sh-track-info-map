const getPointIcon = (fill: string, line: string) => ({
  markerType: 'ellipse',
  markerFill: fill,
  markerFillOpacity: 1,
  markerLineColor: line,
  markerLineWidth: 2,
  markerLineOpacity: 1,
  markerWidth: 8,
  markerHeight: 8,
  markerOpacity: 1,
  textName: '{published_address}',
  textFill: fill,
  textSize: {
    stops: [
      [15.5, 0],
      [15.5, 12],
    ],
  },
  textDy: 12,
  textHaloRadius: 1,
  textHaloFill: 'white',
})

export const trackLong = getPointIcon('#ffedd5', '#ffffff')
export const trackM = getPointIcon('#fdba74', '#ffedd5')
export const track14 = getPointIcon('#f97316', '#fdba74')
export const track7 = getPointIcon('#c2410c', '#f97316')
export const track3 = getPointIcon('#7c2d12', '#c2410c')

export const riskSymbol = [
  {
    markerType: 'path',
    markerPathWidth: 12,
    markerPathHeight: 16,
    markerWidth: {
      stops: [
        [10, window.getTextSize(12)],
        [18, window.getTextSize(30)],
      ],
    },
    markerHeight: {
      stops: [
        [10, window.getTextSize(16)],
        [18, window.getTextSize(40)],
      ],
    },
    markerPath: [
      {
        path: 'M6,16c2.4-2.3,6-6.2,6-9.7C12,2.8,9.3,0,6,0S0,2.8,0,6.3C0,9.8,3.8,14,6,16z',
        fill: '#696aad',
      },
    ],
  },
  {
    textName: '{published_address}',
    textFill: '#696aad',
    textSize: {
      stops: [
        [12, 0],
        [12, 12],
      ],
    },
    textDy: 12,
    textHaloRadius: 1,
    textHaloFill: 'white',
  },
]
