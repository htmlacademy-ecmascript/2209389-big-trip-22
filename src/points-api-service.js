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
      url: `${BaseUrl.POINTS}/${point.id}`, //адрес ресурса с КОНКРЕТНОЙ задачей
      method: ApiMethod.PUT, // указывается метод для обновления задачи - PUT
      body: JSON.stringify(this.#adaptToServer(point)), // 1) переводим объект в вид, с которым умеет работать сервер 2) преобразовываем в JSON формат и передаем на сервер
      headers: new Headers ({'Content-Type': 'aplication/json'}), // в заголовке сообщаем что сожержимое будет в формате JSON
    });

    //далее необходимо выполнить разбор ответа от сервера и вернуть распарсенный вариант
    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;

  }

  #adaptToServer(point) {
    const adaptedPoint = {...point,
      'base_price': point.basePrice,
      'date_from': point.dateFrom,
      'date_to': point.dateTo,
      'is_favorite': point.isFavorite,
    };

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;

  }


}

