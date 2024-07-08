import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Lucky Roller</h1>

      <form id="settings">
        <label>
          How many dice?
          <input type="text" id="numdice" />
        </label>

        <label>
          How many rolls?
          <input type="text" id="numrolls" />
        </label>

        <br />
        <p>
          Help: You can change the number of dice and rolls in real time. Click
          the ROLL! button to generate a new dataset.
        </p>
      </form>
      <button onClick={rollDice}>
        ROLL!
      </button>

      <div id="stats">
        <table id="statTable">
          <thead>
            <tr>
              <th>Dice Statistics</th>
            </tr>
          </thead>
          <tbody id = "tableBody">
            <tr>
              <td>Mean</td>
              <td id = "average">0</td>
            </tr>
            <tr>
              <td>Median</td>
              <td id = "median">0</td>
            </tr>
            <tr>
              <td>Mode</td>
              <td id = "mode">0</td>
            </tr>
          </tbody>
        </table>


        <table id="freq">
          <thead>
            <tr>
              <th>Frequencies</th>
            </tr>
          </thead>
          <tbody id="freqBody">
            
          </tbody>
        </table>
        <button onClick={showHistory}>See history</button>
      </div>
    </div>
  );
}

// Table
let oldRolls = [];
let totalRolls = [];


function rollDice() {
  let numDice = document.getElementById('numdice').value;
  if (numDice > 3 || numDice<1) {
    alert("Enter a dice number from 1-3");
    return;
  }
  let numRolls = document.getElementById('numrolls').value;

  for (let n = 0; n < numDice; n++) {
    for (let i = 0; i < numRolls; i++) {
      const diceResult = Math.floor(Math.random() * 6) + 1;
      console.log(diceResult)
      totalRolls.push(diceResult)
    }
  }
  updateStats(numDice)
}

function updateStats(howManyDice) {
  console.log(totalRolls)

  let numDice = howManyDice;
  //Doubles Rolled

    if (numDice==2) {
      let doublesCount = 0;
      var tbodyRef = document.getElementById('statTable').getElementsByTagName('tbody')[0];

      var doublesRow = document.getElementById("doublesRow");
      if (doublesRow == null) {
    
      var doublesRow = tbodyRef.insertRow();
      doublesRow.setAttribute("id", "doublesRow");

      var doublesCell = doublesRow.insertCell();
      var doublesText = document.createTextNode('Doubles Rolled');
      doublesCell.appendChild(doublesText);

      var doublesCountCell = doublesRow.insertCell();
      var doublesCountText = document.createTextNode('0');
      doublesCountCell.appendChild(doublesCountText);
  

    }
        for (let i = 0; i < totalRolls.length - 2; i++) {
          if (totalRolls[i] == totalRolls[i + 1]) {
            doublesCount++;
        } 
      }

      document.getElementById("doublesRow").getElementsByTagName("td")[1].textContent = doublesCount;
  }

  if (numDice == 3) {
    var tbodyRef = document.getElementById('statTable').getElementsByTagName('tbody')[0];
    let tripleCount = 0;

    // Check if the triplesRow element exists, if not, create it
    var triplesRow = document.getElementById("triplesRow");
    if (triplesRow == null) {
        triplesRow = tbodyRef.insertRow();
        triplesRow.setAttribute("id", "triplesRow");

        var triplesCell = triplesRow.insertCell();
        var triplesText = document.createTextNode('Triples Rolled');
        triplesCell.appendChild(triplesText);

        var triplesCountCell = triplesRow.insertCell();
        var triplesCountText = document.createTextNode('0');
        triplesCountCell.appendChild(triplesCountText);
       
    }

    // Update triples and doubles counts
    for (let i = 0; i < totalRolls.length - 2; i++) {
        if (totalRolls[i] == totalRolls[i + 1] && totalRolls[i] == totalRolls[i + 2]) {
            tripleCount++;
        }

      
    }

    // Update text content for triples and doubles counts
    document.getElementById("triplesRow").getElementsByTagName("td")[1].textContent = tripleCount;

}

 
  
  
  //Average
  const initialValue = 0;
  const sumWithInitial = totalRolls.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue,
  );
  let average = sumWithInitial/totalRolls.length;
  console.log("The average is " + average)
  average = Math.ceil(average * 100) / 100;
  document.getElementById("average").textContent = average;

  //Median
  const sortedTotalRolls = totalRolls.sort();
  const middleIndex = Math.floor(totalRolls.length / 2);
  if (totalRolls.length % 2 === 0) {
    let median = (sortedTotalRolls[middleIndex - 1] + sortedTotalRolls[middleIndex]) / 2;
    console.log("The median is " + median)
    document.getElementById("median").textContent = median;
  } else {
    let median = sortedTotalRolls[middleIndex];
    console.log("The median is " + median)
    document.getElementById("median").textContent = median;
  }

  //Mode
  let count = 0;
  let mode = 0;
  for (let i = 0; i < totalRolls.length; i++) {
    for (let n = 0; n < totalRolls.length; n++) {
      if (totalRolls[i] === totalRolls[n]) {
        count++;
      }
    }
    if (count > mode) {
      mode = totalRolls[i];
    }
    count = 0;
  }

  console.log("The mode is " + mode);
  document.getElementById("mode").textContent = mode;

  oldRolls.push(totalRolls);
  totalRolls=[] 
  console.log(oldRolls);

  getFreq(numDice);
  }
// FINISH THIS



  function getFreq(numDice) {
    var highest = numDice*6;
    var table = document.getElementById("freq")
    for (let i = 1; i<highest+1; i++) {
      const newLine = table.insertRow();
      var count = document.createTextNode(i);
      newLine.appendChild(count);
    }
  }

  function showHistory() {
    let rollHistory = "";
    for (let i = 0; i< oldRolls.length; i++) {
      rollHistory+= oldRolls[i]+"\n"
    }
    alert(rollHistory)
  }

export default App;
