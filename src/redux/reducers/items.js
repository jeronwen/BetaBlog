const initialState = [
  {
    title: "JavaScript: Как с помощью Dadata определить город по IP?",
    text: `На работе потребовалось запилить задачу для автоматического 
определения города при совершении заказа. Было решено сделать это на фронте, ибо бек был занят.`,
    createdAt: "12 августа 2019 в 08:06",
    countView: 301,
  },
  {
    title: "Какой-то очень интересный заголовок",
    text: `На работе потребовалось запилить задачу для автоматического определения города при совершении заказа.`,
    createdAt: "12 августа 2019 в 08:06",
    countView: 55,
  },
  {
    title: "Ставим обработчик фокуса для кастомоного React-компонента",
    text: `Что делать, если разработчик компонента для 
    форматирования номера телефона или других данных в текстовом поле, не добавил обработчики на установку и снятие фокуса?`,
    createdAt: "12 августа 2019 в 08:06",
    countView: 16,
  },
  {
    title: "Amet molestie tincidunt id nascetur sit purus turpis",
    text: `Vel vulputate mauris enim habitant ornare. Ut in sit purus turpis ultrices suspendisse scelerisque quam lorem. Amet molestie nascetur...`,
    createdAt: "12 августа 2019 в 08:06",
    countView: 300,
  },
];

export const ItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return action.payload;
    default:
      return state;
  }
};