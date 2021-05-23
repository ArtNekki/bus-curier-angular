export default [
  {link: 'track-order', name: 'Отследить посылку'},
  {link: 'calc-rate', name: 'Расчет тарифа по Приморью'},
  {link: 'services', name: 'Услуги', dropdown: [
      {link: 'no', name: 'Грузоперевозки по Приморскому краю'},
      {link: 'services/delivery-russia', name: 'Грузоперевозки по России'},
      {link: 'services/courier', name: 'Забор и доставка курьером'},
      {link: 'no', name: 'Доставка посылок из интернет-магазинов'},
      {link: 'services/non-standard-tasks', name: 'Реализация нестандартных логистических задач'},
      {link: 'services/cargo-insurance', name: 'Страхование груза'},
  ]},
  {link: 'empty', name: 'Информация', dropdown: [
      {link: 'how-to-send', name: 'Как отправить посылку'},
      {link: 'no', name: 'Как получить посылку'},
      {link: 'rules-of-send', name: 'Правила приемки и отправки грузов'},
      {link: 'transportation-rates', name: 'Тарифы на перевозку'},
      {link: 'packing', name: 'Упаковки грузов и виды упаковки'},
      {link: 'no', name: 'Хранение груза на складах Bus-курьер'},
      {link: 'delivery-from-airport', name: 'Доставка грузов и багажа из Аэропорта'},
  ]},
  {link: 'documents', name: 'Документы'},
  {link: 'contacts', name: 'Контакты'}
]
