import {Pipe, PipeTransform} from '@angular/core';
import {IApiCollection} from "../interfaces";

@Pipe({
  name: 'apiFilter'
})
export class ApiFilterPipe implements PipeTransform {

  transform(apiList: IApiCollection[], keyword?: string): any {
    if (!keyword) return apiList;

    return apiList.reduce((total, current) => {

      let isMatch = current.folder.toLowerCase().includes(keyword);
      if(isMatch){
        return [...total, current]
      }
      let matchedApis = current.apiList.reduce((totalApis, currentApi) => {
        let isObjMatch = currentApi.name.toLowerCase().includes(keyword) || currentApi.url.toLowerCase().includes(keyword);
        if (isObjMatch) {
          return [...totalApis, currentApi]
        }
        return totalApis;
      }, []);

      if (matchedApis.length > 0) {
        return [...total, {folder: current.folder, apiList: matchedApis}]
      }
    }, []);
  }

}