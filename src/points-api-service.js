import ApiService from './framework/api-service.js';
import { ApiMethod, BaseUrl } from './const.js';


export default class PointsApiService extends ApiService {

  //this._load вернёт объект promis. После того, как он зарезолвится
  // мы должны распарсить данные, поэтому используем 'then' (строку преобразовать в JS объект).
  get points() {
    return this._load({url: BaseUrl.POINTS})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: BaseUrl.DESTINATIONS})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: BaseUrl.OFFERS})
      .then(ApiService.parseResponse);
  }

  //метод update
  async updatePoint(point) {
    //обращаемся к универсальному методу this._load и передаём объект настроек
    const response = await this._load({
      url: `${BaseUrl.POINTS}/${point.id}`,
      method: ApiMethod.PUT,
      body: JSON.stringify(point),
      headers: new Headers ({'Content-Type': 'aplication/json'}),
    });

    //далее необходимо выполнить разбор ответа от сервера и вернуть распарсенный вариант
    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;

  }


}
