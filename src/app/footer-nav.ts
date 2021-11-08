export const topNav = [
  {link: 'orders/track-order', name: 'Отследить посылку'},
  {link: 'orders/calc-rate', name: 'Рассчет тарифа по Приморью'},
  {link: 'our-services', name: 'Услуги'},
  {link: 'useful-info', name: 'Информация'},
  {link: 'documents', name: 'Документы'},
  {link: 'contacts', name: 'Контакты'}
];

export const mainNav = [
  {link: 'our-services', name: 'Услуги', dropdown: [
    {link: 'no', name: 'Грузоперевозки по Приморскому краю'},
    {link: 'no', name: 'Грузоперевозки в республике Татарстан'},
    {link: 'services/delivery-russia', name: 'Грузоперевозки по России'},
    {link: 'services/courier', name: 'Забор и доставка курьером'},
    {link: 'no', name: 'Доставка посылок из интернет-магазинов'},
    {link: 'services/non-standard-tasks', name: 'Решение нестандартных логистических задач'},
    {link: 'services/cargo-insurance', name: 'Страхование груза'}
  ]},
  {link: 'useful-info', name: 'Информация', dropdown: [
    {link: 'info/how-to-send', name: 'Как отправить посылку', sm: true},
    {link: 'info/how-to-get', name: 'Как получить посылку', sm: true},
    {link: 'info/rules-of-send', name: 'Правила приемки и отправки грузов', sm: true},
    {link: 'info/transportation-rates', name: 'Тарифы на перевозку', sm: true},
    {link: 'info/packing', name: 'Упаковки грузов и виды упаковки', sm: true},
    {link: 'info/delivery-from-airport', name: 'Доставка грузов и багажа из Аэропорта', sm: true},
    {link: 'no', name: 'Франшиза Bus-Курьер', sm: true}
  ]},
  {link: 'no', name: 'Сервисы', dropdown: [
      {link: 'no', name: 'Поиск заказа', sm: true},
      // {link: 'account', name: 'Личный кабинет', sm: true},
      {link: 'orders/order', name: 'Онлайн-заявка', sm: true},
      {link: 'orders/quick-order', name: 'Расчет тарифа по Приморью', sm: true},
      {link: 'no', name: 'Расчет тарифа по Республике Татарстан', sm: true},
      {link: 'no', name: 'Расчет тарифа по России', sm: true},
      {link: 'about', name: 'О компании'},
      {link: 'work-in-team', name: 'Вакансии'},
      {link: 'documents', name: 'Документы'},
      {link: 'feedback', name: 'Обратная связь'},
      {link: 'contacts', name: 'Контакты'}
    ]},
]
