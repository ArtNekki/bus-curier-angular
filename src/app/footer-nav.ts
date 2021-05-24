export const topNav = [
  {link: 'widgets/track-order', name: 'Отследить посылку'},
  {link: 'widgets/calc-rate', name: 'Рассчет тарифа по Приморью'},
  {link: 'services', name: 'Услуги'},
  {link: 'no', name: 'Информация'},
  {link: 'documents', name: 'Документы'},
  {link: 'contacts', name: 'Контакты'}
]

export const mainNav = [
  {link: 'no', name: 'Услуги', dropdown: [
    {link: 'no', name: 'Грузоперевозки по Приморскому краю'},
    {link: 'no', name: 'Грузоперевозки в республике Татарстан'},
    {link: 'services/delivery-russia', name: 'Грузоперевозки по России'},
    {link: 'services/courier', name: 'Забор и доставка курьером'},
    {link: 'no', name: 'Доставка посылок из интернет-магазинов'},
    {link: 'services/non-standard-tasks', name: 'Решение нестандартных логистических задач'},
    {link: 'services/cargo-insurance', name: 'Страхование груза'}
  ]},
  {link: 'no', name: 'Информация', dropdown: [
    {link: 'info/how-to-send', name: 'Как отправить посылку', sm: true},
    {link: 'no', name: 'Как получить посылку', sm: true},
    {link: 'info/rules-of-send', name: 'Правила приемки и отправки грузов', sm: true},
    {link: 'info/transportation-rates', name: 'Тарифы на перевозку', sm: true},
    {link: 'info/packing', name: 'Упаковки грузов и виды упаковки', sm: true},
    {link: 'info/delivery-from-airport', name: 'Доставка грузов и багажа из Аэропорта', sm: true},
    {link: 'no', name: 'Франшиза Bus-Курьер', sm: true}
  ]},
  {link: 'no', name: 'Сервисы', dropdown: [
      {link: 'no', name: 'Поиск заказа', sm: true},
      {link: 'account', name: 'Личный кабинет', sm: true},
      {link: 'widgets/order', name: 'Онлайн-заявка', sm: true},
      {link: 'widgets/calc-rate', name: 'Расчет тарифа по Приморью', sm: true},
      {link: 'no', name: 'Расчет тарифа по Республике Татарстан', sm: true},
      {link: 'no', name: 'Расчет тарифа по России', sm: true},
      {link: 'about', name: 'О компании'},
      {link: 'work-in-team', name: 'Вакансии'},
      {link: 'documents', name: 'Документы'},
      {link: 'feedback', name: 'Обратная связь'},
      {link: 'contacts', name: 'Контакты'}
    ]},
]
