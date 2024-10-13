// Начальное состояние
export const initialState = {
  data: {},
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: {}, count: 0, waiting: true };

    case 'comments/load-success':
      return { ...state, items: action.payload.items, count: action.payload.count, waiting: false };

    case 'comments/load-error':
      return { ...state, data: {}, count: 0, waiting: false }; //@todo текст ошибки сохранять?

    case 'comments/set-current':
      return { ...state, current: action.payload.id, currentUser: action.payload.user };

    case 'comments/record-start':
      return { ...state, waiting: true };

    case 'comments/record-success':
      return { ...state, items: [...state.items, action.payload], count: state.count + 1, waiting: false };

    case 'comments/record-error':
      return { ...state, waiting: false }; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
