'use strict';

var startInput = 6 + ' ' + 9,
  finishInput = 1 + ' ' + 1;
  
var g = new Graph();
var totalTime = 0;

var newElem=document.createElement('table');

var counterOfInput = true;

var inf = 1/0;

const arrOfTimes = [
[inf, inf, inf, inf, inf, inf, inf, inf, inf, inf, inf, inf, inf, inf, inf, inf],
	[inf, 0, 8, 4, 3, 8, 4, 7, 4, 7, 3, 4, 8, 3, 1, inf],
	[inf, 4, 4, 8, 8, 4, 3, 7, inf, 4, 4, 8, 3, 4, 0, inf],
	[inf, 8, 4, 4, 4, 8, 4, 7, 4, 8, 8, 3, 3, 4, 1, inf],
	[inf, 3, 8, 4, 3, 8, 4, 4, 8, 3, 3, 4, 4, 1, 7, inf],
	[inf, 4, 3, 8, 3, 8, 8, 8, 3, 4, 4, 4, 1, 7, 7, inf],
	[inf, 4, 3, 8, 8, 3, 4, 3, 8, 3, 4, 1, 7, 7, inf, inf],
	[inf, 3, 8, 3, 3, 8, 3, 4, 3, 8, 3, 4, 1, 7, 7, inf],
	[inf, 4, 8, 8, 4, 3, 8, 4, 4, 3, 3, 3, 1, 1, 1, inf],
	[inf, 4, 3, 8, 4, 3, 8, 8, 4, 4, 4, 3, 3, 1, 3, inf],
	[inf, 3, 8, 4, 4, 4, 3, 8, 3, 4, 4, 4, 3, 3, 1, inf],
	[inf, 8, 4, 4, 3, 3, 8, 8, 3, 4, 1, 4, 4, 1, 1, inf],
	[inf, 4, 4, 3, 8, 8, 8, 3, 4, 4, 7, 1, 4, 1, 7, inf],
	[inf, 3, 3, 8, 3, 3, 3, 8, 3, 4, 4, 7, 1, 7, 7, inf],
	[inf, 8, 8, 3, 4, 4, 3, 3, 8, 3, 3, 4, 4, 7, inf, inf],
	[inf, 3, 8, 0, 4, 1, 4, 8, 3, 8, 3, 3, 4, 0, 1, inf],
  [inf, inf, inf, inf, inf, inf, inf, inf, inf, inf, inf, inf, inf, inf, inf, inf],
];

  var timesForClaus = JSON.parse(JSON.stringify(arrOfTimes));
  var timesForClimber = JSON.parse(JSON.stringify(arrOfTimes));
  var timesForAcro = JSON.parse(JSON.stringify(arrOfTimes));
  for (var i = 0; i < timesForClaus.length; i++) {
    for (var j = 0; j < timesForClaus[i].length; j++) {
      if (timesForAcro[i][j] == null) {
        timesForAcro[i][j] = inf;
      }
      if (timesForAcro[i][j] == 3) {
        timesForAcro[i][j] = 999;
      }
      if (timesForAcro[i][j] == 8) {
        timesForAcro[i][j] = 9999;
      }
      if ((timesForClimber[i][j] == 3) || (timesForClimber[i][j] == 7) || (timesForClimber[i][j] == null) || (timesForClimber[i][j] == 1)) {
        timesForClimber[i][j] = inf;
      }
      if ((timesForClaus[i][j] == 4) || (timesForClaus[i][j] == 7) || (timesForClaus[i][j] == null)) {
        timesForClaus[i][j] = inf;
      }
    }
  }

var cell = [];
var assignedCells = [];

function PriorityQueue () {
  this._nodes = [];

  this.enqueue = function (priority, key) {
    this._nodes.push({key: key, priority: priority });
    this.sort();
  }
  this.dequeue = function () {
    return this._nodes.shift().key;
  }
  this.sort = function () {
    this._nodes.sort(function (a, b) {
      return a.priority - b.priority;
    });
  }
  this.isEmpty = function () {
    return !this._nodes.length;
  }
}

function Graph(){
  var INFINITY = 1/0;
  this.vertices = {};

  this.addVertex = function(name, edges){
    this.vertices[name] = edges;
  }

  this.shortestPath = function (start, finish) {
    var nodes = new PriorityQueue(),
        distances = {},
        previous = {},
        path = [],
        smallest, vertex, neighbor, alt;

    for(vertex in this.vertices) {
      if(vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(0, vertex);
      }
      else {
        distances[vertex] = INFINITY;
        nodes.enqueue(INFINITY, vertex);
      }

      previous[vertex] = null;
    }

    while(!nodes.isEmpty()) {
      smallest = nodes.dequeue();

      if(smallest === finish) {
        path;

        while(previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }

        break;
      }

      if(!smallest || distances[smallest] === INFINITY){
        continue;
      }

      for(neighbor in this.vertices[smallest]) {
        alt = distances[smallest] + this.vertices[smallest][neighbor];

        if(alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = smallest;

          nodes.enqueue(alt, neighbor);
        }
      }
    }

    return path;
  }
};

var arrOfCells = [];
var arrOfRows = [];

(function generateTable() {
for (var i = 15; i > 0; i--) {
  var newRow=newElem.insertRow(0);
  arrOfCells[i] = [];
  arrOfRows[i] = newRow;
  for (var j = 14; j > 0; j--) {
    var newCell = newRow.insertCell(0);
    arrOfCells[i][j] = newCell;
    newCell.setAttribute('width', '44');
    newCell.setAttribute('height', '44');
    newCell.setAttribute('id', j + ' ' + i);
    newCell.setAttribute('onclick', 'getValue(this)');
    newCell.setAttribute('oncontextmenu', 'showType(this)');
    newCell.setAttribute('style', 'border: 4px solid #353535');
    if (arrOfTimes[i][j] == 3) {
    newCell.setAttribute('background', 'img/hill.png');
    } else

    if (arrOfTimes[i][j] == 1) {
      newCell.setAttribute('background', 'img/meadow.png');
    } else

    if (arrOfTimes[i][j] == 0) {
      newCell.setAttribute('background', 'img/skyscraper.png');
    } else

    if (arrOfTimes[i][j] == 4) {
      newCell.setAttribute('background', 'img/forest.png');
    } else

    if (arrOfTimes[i][j] == 7) {
      newCell.setAttribute('background', 'img/swamp.png');
    } else

    if (arrOfTimes[i][j] == inf) {
      newCell.setAttribute('background', 'img/lake.png');
    } else

    if (arrOfTimes[i][j] == 8) {
      newCell.setAttribute('background', 'img/mount.png');
    }
  }
};

document.getElementById('content').appendChild(newElem);})();

function main(start, finish, timeArray) {

  function CellAssign(x, y, time) {
  var objForAssign = {};
  cell[y][x] = new newCell(x, y, time[y][x]);
  cell[y][x-1] = new newCell(x-1, y, time[y][x-1]);
  cell[y][x+1] = new newCell(x+1, y, time[y][x+1]);
  cell[y-1][x] = new newCell(x, y-1, time[y-1][x]);
  cell[y+1][x] = new newCell(x, y+1, time[y+1][x]);
  Object.assign(objForAssign, cell[y][x-1], cell[y][x+1], cell[y-1][x], cell[y+1][x]);
  return objForAssign;
}

  function newCell(x, y, time) {
  this[x + ' ' + y] = time;
}

for (var i = 0; i < 17; i++) {
  cell [i] = [];
  assignedCells[i] = [];
  for (var j = 0; j < 16; j++) {
    cell[i][j] = new newCell(j, i, timeArray[i][j]);
  }
};

for (var i = 1; i < 16; i++) {
  for (var j = 1; j < 15; j++) {
    assignedCells[i][j] = CellAssign(j, i, timeArray);
    g.addVertex((j + ' ' + i), assignedCells[i][j]);
  }
}
}

function clear() {
  for (var i = 15; i > 0; i--) {
    for (var j = 14; j > 0; j--) {
      arrOfCells[i][j].setAttribute('style', 'border: 4px solid #353535');
  }
}
}

function showPath() {
  for (var i = 15; i > 0; i--) {
    for (var j = 14; j > 0; j--) {
      if(g.shortestPath(finishInput, startInput).indexOf(arrOfCells[i][j].id) > -1) {
        arrOfCells[i][j].setAttribute('style', 'border: 4px solid orange');
      };
      if(startInput == j + ' ' + i) {
        arrOfCells[i][j].setAttribute('style', 'border: 4px solid yellow');
      }
      if(finishInput == j + ' ' + i) {
        arrOfCells[i][j].setAttribute('style', 'border: 4px solid red');
      }
  }
}
if (!g.shortestPath(finishInput, startInput).length) {
  document.getElementById('timeOutput').innerHTML = '<h4>' + errorOut + '</h4>';
}
var splittedPath = [];
var totalTime = 0;
  for (var i = 0; i < g.shortestPath(finishInput, startInput).length; i++) {
    splittedPath[i] = g.shortestPath(finishInput, startInput)[i].split(' ');
    totalTime += arrOfTimes[splittedPath[i][1]][splittedPath[i][0]];
  }
  var unit;
  var lastNum = totalTime;

  for (var i = 0; lastNum >= 10; i++) {
    lastNum = lastNum % 10;
  }
  if (lastNum == 1) {
    unit = 'час';
  } else
  if ((lastNum > 1) && (lastNum < 5)) {
    unit = 'часа';
  } else
  if (((lastNum > 4) && (lastNum < 10)) || (lastNum == 0)) {
    unit = 'часов';
  }
if (g.shortestPath(finishInput, startInput).length) {
  document.getElementById('timeOutput').innerHTML = 'Вы шли <h1>' + totalTime + '</h1>' + unit;
}
}

function getValue(ourCell) {
 if (counterOfInput == true) {
    startInput = ourCell.id;
    clear();
    ourCell.setAttribute('style', 'border: 3px solid yellow');
    counterOfInput = false;
  }
  else {
    finishInput = ourCell.id;
    counterOfInput = true;
    showPath();
  }
}

var errorClaus = ' Волка боюсь - в лес не хожу.';
var errorClimber = ' Рекорд не побит. Флаг не поставлен... ';
var errorNormal = ' Выберите другую точку начала.';
var errorOut = errorNormal;

main(startInput, finishInput, arrOfTimes);
function go(start, finish, timeArray, err, obj) {
  clear();
  errorOut = errorNormal;
  document.getElementById('mode').innerHTML = obj.value;
  if (err != errorNormal) {errorOut = err + '<br>' + errorOut;}
main(start, finish, timeArray);
showPath();
}

function set(start, finish) {
  clear();
  startInput = start;
  finishInput = finish;
  showPath();
}
function cleanHalfSelected() {
	counterOfInput = true;
	clear();
}
document.getElementById('content').oncontextmenu = function (){return false};

function showType(elem) {
	var coordOfTarget = elem.id.split(' ');
	var typeOfCell = '';
	var typeIndex = arrOfTimes[coordOfTarget[1]][coordOfTarget[0]];
	if (typeIndex == 0) {
		typeOfCell = 'город';
	} else
	if (typeIndex == 1) {
		typeOfCell = 'луг';
	} else
	if (typeIndex == 3) {
		typeOfCell = 'холм';
	} else
	if (typeIndex == 4) {
		typeOfCell = 'лес';
	} else
	if (typeIndex == 7) {
		typeOfCell = 'болото';
	} else
	if (typeIndex == 8) {
		typeOfCell = 'гора';
	} else
	if (typeIndex == inf) {
		typeOfCell = 'озеро';
	}
  document.getElementById('timeOutput').innerHTML = 'Это ' + typeOfCell;
}