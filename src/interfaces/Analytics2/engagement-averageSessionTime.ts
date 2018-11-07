import { IBot } from '../../app/core/interfaces/IBot';

export interface IChannelWiseAverageSessionTimeResponseBody {
    meta: any;
    objects: [
        {
            output: {
                'channelWiseAverageSessionTime': IChannelWiseAverageSessionTimeItem[],
            }
        }
    ];
}
export interface IChannelWiseAverageSessionTimeItem {
    'alexa': number;
    'facebook': number;
    'labels': string;
    'web': number;
}
// {
//     "meta": {
//         "limit": 20,
//         "next": null,
//         "offset": 0,
//         "previous": null,
//         "total_count": 1
//     },
//     "objects": [
//         {
//             "output": {
//                 "channelWiseAverageSessionTime": [
//                     {
//                         "alexa": 0,
//                         "facebook": 0,
//                         "labels": "01/08/2018",
//                         "web": 0
//                     },
//                     {
//                         "alexa": 0,
//                         "facebook": 0,
//                         "labels": "02/08/2018",
//                         "web": 0
//                     }
//                 ]
//             },
//             "resource_uri": "/api/v1/analytics/None/"
//         }
//     ]
// }
