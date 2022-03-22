import dayjs from 'dayjs'

export const riskStyle = {
    symbol: [
        {
            markerType: 'path',
            markerPathWidth: 16,
            markerPathHeight: 23,
            markerWidth: {
                stops: [
                    [10, window.getTextSize(16)],
                    [22, window.getTextSize(32)],
                ],
            },
            markerHeight: {
                stops: [
                    [10, window.getTextSize(23)],
                    [22, window.getTextSize(46)],
                ],
            },
            markerPath: [
                {
                    path: 'M8 23l0 0 0 0 0 0 0 0 0 0c-4,-5 -8,-10 -8,-14 0,-5 4,-9 8,-9l0 0 0 0c4,0 8,4 8,9 0,4 -4,9 -8,14z M3,9 a5,5 0,1,0,0,-0.9Z',
                    fill: 'orange',
                },
            ],
        },
        {
            textName: '{published_address}',
            textFill: 'orange',
            textOpacity: 0.85,
            textSize: {
                stops: [
                    [12, 0],
                    [12, 12],
                ],
            },
            textDy: 12,
            textWeight: 'bold',
            textHaloRadius: 2,
            textHaloFill: 'white',
            textHaloOpacity: 0.85,
        },
    ],
}

const getPointSymbol = (fill: string = '#de3333') => ({
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
            fill,
        },
    ],
})

export const trackStyle = [
    {
        filter: ['<=', 'date', dayjs().subtract(14, 'day').valueOf()],
        symbol: [
            getPointSymbol('#ffedd5'),
            {
                textName: '{published_address}',
                textFill: '#ffedd5',
                textSize: {
                    stops: [
                        [16, 0],
                        [16, 12],
                    ],
                },
                textDy: 12,
                textWeight: 'bold',
                textHaloRadius: 2,
                textHaloFill: 'white',
            },
        ],
    },
    {
        filter: ['<=', 'date', dayjs().subtract(7, 'day').valueOf()],
        symbol: [
            getPointSymbol('#fdba74'),
            {
                textName: '{published_address}',
                textFill: '#fdba74',
                textSize: {
                    stops: [
                        [16, 0],
                        [16, 12],
                    ],
                },
                textDy: 12,
                textWeight: 'bold',
                textHaloRadius: 2,
                textHaloFill: 'white',
            },
        ],
    },
    {
        filter: ['<=', 'date', dayjs().subtract(3, 'day').valueOf()],
        symbol: [
            getPointSymbol('#f97316'),
            {
                textName: '{published_address}',
                textFill: '#f97316',
                textSize: {
                    stops: [
                        [16, 0],
                        [16, 12],
                    ],
                },
                textDy: 12,
                textWeight: 'bold',
                textHaloRadius: 2,
                textHaloFill: 'white',
            },
        ],
    },
    {
        filter: ['>', 'date', dayjs().subtract(3, 'day').valueOf()],
        symbol: [
            getPointSymbol('#c2410c'),
            {
                textName: '{published_address}',
                textFill: '#c2410c',
                textSize: {
                    stops: [
                        [16, 0],
                        [16, 12],
                    ],
                },
                textDy: 12,
                textWeight: 'bold',
                textHaloRadius: 2,
                textHaloFill: 'white',
            },
        ],
    },
]
