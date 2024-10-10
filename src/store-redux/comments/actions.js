export default {
  /**
   * Загрузка комметариев
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комметариев и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Комментариии загружены успешно
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result } });

      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    };
  },
  /**
  * установка текущего комметария
  * @param id
  */
  setCurrent: (id, user) => {
    return { type: 'comments/set-current', payload: { id, user } };
  },
  /**
  * Запись комметариев
  * @param id
  * @param token
  * @param type
  * @return {Function}
  */
  record: (id, token, type, text) => {
    const data = {
      "text": text,
      "parent": {
        "_id": id,
        "_type": type,
      },
    }
    return async (dispatch, getState, services) => {
      // Сброс текущих комметариев и установка признака ожидания загрузки
      dispatch({ type: 'comments/record-start' });
      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Token': token
          },
          body: JSON.stringify(data),
        });

        // Комментариии загружены успешно
        dispatch({ type: 'comments/record-success', payload: { data: res.data.result }});

      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/record-error' });
      }
    };
  },
};
