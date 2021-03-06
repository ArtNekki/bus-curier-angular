export default [
  {link: 'orders/track-order', name: 'Отследить посылку'},
  {link: 'orders/quick-order', name: 'Расчет тарифа по Приморью'},
  {link: 'our-services', name: 'Услуги', dropdown: [
      {link: 'no', name: 'Грузоперевозки по Приморскому краю'},
      {link: 'services/delivery-russia', name: 'Грузоперевозки по России'},
      {link: 'services/courier', name: 'Забор и доставка курьером'},
      {link: 'parcels', name: 'Доставка посылок из интернет-магазинов'},
      {link: 'services/non-standard-tasks', name: 'Реализация нестандартных логистических задач'},
      {link: 'services/cargo-insurance', name: 'Страхование груза'},
  ]},
  {link: 'useful-info', name: 'Информация', dropdown: [
      {link: 'info/how-to-send', name: 'Как отправить посылку'},
      {link: 'info/how-to-get', name: 'Как получить посылку'},
      {link: 'info/rules-of-send', name: 'Правила приемки и отправки грузов'},
      {link: 'info/transportation-rates', name: 'Тарифы на перевозку'},
      {link: 'info/packing', name: 'Упаковки грузов и виды упаковки'},
      {link: 'info/storage-cargo', name: 'Хранение груза на складах Bus-курьер'},
      {link: 'info/delivery-from-airport', name: 'Доставка грузов и багажа из Аэропорта'},
  ]},
  {link: 'documents', name: 'Документы'},
  {link: 'contacts', name: 'Контакты'}
];
