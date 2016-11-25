# PathFinding

Программа по нахождению кратчайшего пути на участке местности.

## Системные требования

Браузер Google Chrome, Opera или Mozilla Firefox (не желательно).

## Руководство пользователя

Откройте файл index.html в браузере.

В левой части страницы находится:

1. Название режима поиска пути.
2. Кнопки переключения режимов.
3. Кнопки выбора точек старта и финиша.
4. Кнопка сброса пути.
5. Поле вывода информации.

Выберите режим поиска пути:

  1. Обычный режим, в котором путешественник не может ходить только через озеро.
  2. Клаустрофоб - нельзя ходить по лесу, болоту и озеру.
  3. Альпинист - можно ходить только по горам и лесам.
  4. Акрофоб - можно ходить по всем клеткам, кроме озера, работает как "обычный режим", но с минимальным количеством посещений гористых и холмистых участков.

Нажмите на одну из кнопок выбора точек старта и финиша:

  Слева: город; город.
  Справа: точка, показанная в условии (флажок); город.

Предусмотрена возможность найти кратчайший путь между любыми точками на карте, кроме исключений режима. Для этого кликните на точку старта (в таблице), потом на точку финиша.
  
После первого выбора режима будет показан самый короткий из путей между точкой старта (флажком) и каждым городом. Он будет подсвечен желтым, оранжевым и красным цветом, где желтый - начало пути, красный - конец.

В поле вывода отобразится количество часов, затраченных на перемещение.

ВНИМАНИЕ: В условии задачи не оглашено время прохождения клетки города, а также не предусмотрена точка финиша, которая не является городом, поэтому время прохождения клетки финиша или города равно 0.

При нажатии правой клавишей мышки на клетку, слева выведется название типа участка и количество часов, за которое путешественник проходит этот участок.

При выборе режима 2. или 3. существуют непроходимые преграды, при невозможности обхода программа вместо времени прохождения пути выведет ошибку. Также, вследствие невозможности прохождения озера, при выборе озера как стартовой точки будет ошибка.