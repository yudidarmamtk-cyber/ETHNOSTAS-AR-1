const slider = document.getElementById("zSlider");
const zValue = document.getElementById("zValue");
const result = document.getElementById("result");
const alphaSelect = document.getElementById("alphaSelect");
const zDisplay = document.getElementById("zDisplay");
const zTable = document.getElementById("zTable");
const testType = document.getElementById("testType");
const viewMode = document.getElementById("viewMode");
const methodType = document.getElementById("methodType");
const manualInput = document.getElementById("manualInput");
const decisionOutput = document.getElementById("decisionOutput");

const hitungLabel = document.getElementById("hitungLabel");
const tabelLabel = document.getElementById("tabelLabel");
const sliderLabel = document.getElementById("sliderLabel");

// =========================
// DISTRIBUSI NORMAL
// =========================

function normalDistribution(x) {

  return (
    (1 / Math.sqrt(2 * Math.PI)) *
    Math.exp(-0.5 * x * x)
  );

}

function fDistribution(x){

  return (x * Math.exp(-x/2))/2;

}

// =========================
// GENERATE CURVE
// =========================

function generateCurve() {

  let mode = testType.value;
  console.log("MODE =", mode);

let currentView = viewMode.value;

let method = methodType.value;

let zCritical;

if(method === "z"){

  if(mode === "right" || mode === "left"){

    zCritical = 1.645;

  }

  if(mode === "two"){

    zCritical = 1.96;

  }

}

if(method === "t"){

  if(mode === "right" || mode === "left"){

    zCritical = 2.262;

  }

  if(mode === "two"){

    zCritical = 2.776;

  }

}
if(method === "f"){

  zCritical = 4.26;

}

let z = parseFloat(slider.value);

  zValue.innerText = z.toFixed(2);

zDisplay.innerText = z.toFixed(2);

if(method !== "corr"){

  zTable.innerText = zCritical;

}

manualInput.value = z.toFixed(2);

if(method === "z"){

  hitungLabel.innerText = "Z Hitung :";
  tabelLabel.innerText = "Z Tabel :";
  sliderLabel.innerText = "Nilai Z Hitung";
  slider.min = -4;
slider.max = 4;
slider.step = 0.05;

}
if(method === "t"){

  hitungLabel.innerText = "t Hitung :";
  tabelLabel.innerText = "t Tabel :";
  sliderLabel.innerText = "Nilai t Hitung";

  slider.min = -4;
  slider.max = 4;
  slider.step = 0.05;

}

if(method === "f"){

  hitungLabel.innerText = "F Hitung :";
  tabelLabel.innerText = "F Tabel :"; 
  sliderLabel.innerText = "Nilai F Hitung";
  slider.min = 0;
slider.max = 8;
slider.step = 0.1;

}

if(method === "corr"){

  slider.min = -1;
  slider.max = 1;
  slider.step = 0.1;

  alphaSelect.disabled = true;
  testType.disabled = true;

  hitungLabel.innerText = "Koefisien :";
  tabelLabel.innerText = "Kategori :";
  sliderLabel.innerText = "Nilai Korelasi";

  if(z >= 0.7){

    zTable.innerText = "Sangat Kuat Positif";

  }

  else if(z >= 0.3){

    zTable.innerText = "Positif";

  }

  else if(z > -0.3){

    zTable.innerText = "Tidak Ada Hubungan";

  }

  else if(z > -0.7){

    zTable.innerText = "Negatif";

  }

  else{

    zTable.innerText = "Sangat Kuat Negatif";

  }
  decisionOutput.innerHTML =
`<span style="color:#22c55e;">${zTable.innerText}</span>`;

result.innerHTML =
`
<span style="color:#22c55e;">
${zTable.innerText}
</span>
`;

}

if(method === "reg"){

  alphaSelect.disabled = true;
  testType.disabled = true;

  hitungLabel.innerText = "Kemiringan :";
  tabelLabel.innerText = "Model :";
  sliderLabel.innerText = "Nilai Regresi";
  zTable.innerText = "Regresi Linear";

if(z > 0){

decisionOutput.innerHTML =
'<span style="color:#22c55e;">Pengaruh Positif</span>';

}

else if(z < 0){

decisionOutput.innerHTML =
'<span style="color:#ef4444;">Pengaruh Negatif</span>';

}

else{

decisionOutput.innerHTML =
'<span style="color:#facc15;">Tidak Ada Pengaruh</span>';

}

if(z > 0){

result.innerHTML = `
<span style="color:#22c55e;">
Pengaruh Positif
</span>
`;

}

else if(z < 0){

result.innerHTML = `
<span style="color:#ef4444;">
Pengaruh Negatif
</span>
`;

}

else{

result.innerHTML = `
<span style="color:#facc15;">
Tidak Ada Pengaruh
</span>
`;

}

  zTable.innerText = "Linear";

  slider.min = -1;
  slider.max = 1;
  slider.step = 0.1;
  
}
if(method !== "corr"){

  alphaSelect.disabled = false;

  testType.disabled = false;

}

  let x = [];
let y = [];

if(method === "z"){

  for(let i = -4; i <= 4; i += 0.1){

    x.push(i);

    y.push(normalDistribution(i));

  }

}
if(method === "t"){

  for(let i = -4; i <= 4; i += 0.1){

    x.push(i);

    y.push(
      1 / Math.pow(
        1 + (i*i)/10,
        3
      )
    );

  }

}

if(method === "f"){

  for(let i = 0.01; i <= 8; i += 0.1){

    x.push(i);

    y.push(
      (i * Math.exp(-i/2))/2
    );

  }

}
if(method === "corr"){

  x = [1,2,3,4,5,6,7,8];

  let r = z;

  if(r > 0.3){

    y = [2,3,4,5,6,7,8,9];

  }

  else if(r < -0.3){

    y = [9,8,7,6,5,4,3,2];

  }

  else{

    y = [4,8,2,7,5,3,9,6];

  }

}

if(method === "reg"){

  x = [1,2,3,4,5,6,7,8];

  y = [2,3,4,5,6,7,8,9];

}
  // ==================================================
  // MODE 2D
  // ==================================================

  if(currentView === "2d"){

    let curve = {

      x: x,

      y: y,

      type:'scatter',

mode:
(method === "corr" || method === "reg")
? 'markers'
: 'lines',
marker:{
  size: method === "corr" ? 20 : 0,
  color:"#38bdf8"
},

      name:
method === "reg"
? "Data Regresi"
: method === "corr"
? "Scatter Plot"
: method === "f"
? "Kurva F"
: method === "t"
? "Kurva t"
: "Kurva Normal",

      line: {
        color: '#38bdf8',
        width: 5
      }

    };
    if(method === "corr" || method === "reg"){
      let dataPlot = [curve];

if(method === "reg"){

  let regressionLine = {

  x:[1,8],

  y: z >= 0
      ? [2,9]
      : [9,2],

    type:'scatter',

    mode:'lines',

    name:'Garis Regresi',

    line:{
      color:'#facc15',
      width:4
    }

  };

  dataPlot = [

  {
    x:x,
    y:y,
    type:'scatter',
    mode:'markers',
    name:'Data Regresi',
    marker:{
      size:10
    }
  },

  regressionLine

];

}

  Plotly.react(

    'chart',

    dataPlot,

    {

      title:
      method === "reg"
      ? 'Visualisasi Regresi'
      : 'Visualisasi Korelasi',

      paper_bgcolor:'rgba(0,0,0,0)',

      plot_bgcolor:'rgba(0,0,0,0)',

      font:{
        color:'white'
      }

    }

  );

  return;

}
let pointColor = "#22c55e";

let distance = Math.abs(zCritical - Math.abs(z));

if(distance <= 0.3){

  pointColor = "#facc15";

}

if(Math.abs(z) >= zCritical){

  pointColor = "#ef4444";

}
   let point = {

  x: [z],

  y: [
    method === "f"
      ? fDistribution(z)
      : normalDistribution(z)
  ],

      mode: 'markers+text',

      type: 'scatter',
      name:'Nilai Hitung',

      text:[
`${method === "f"
? "F"
: method === "t"
? "t"
: "Z"} = ${z.toFixed(2)}`
],
      

      textposition: 'top center',

      marker:{

  color:pointColor,

  size:22,

  opacity:1,

  line:{
    color:"white",
    width:3
  }

}

    };
    let guideLine = {

  x:[z,z],

  y:[0, method === "f"
? fDistribution(z)
: normalDistribution(z)],
  

  mode:'lines',

  type:'scatter',

  showlegend:false,

  line:{
    color:'yellow',
    width:2,
    dash:'dash'
  }

};
let criticalLine = {

  x:[zCritical,zCritical],

  y:[0, method === "f"
? fDistribution(zCritical)
: normalDistribution(zCritical)],

  mode:'lines',

  type:'scatter',

  name: method === "f"
? 'F Tabel'
: 'Z Tabel',

  line:{

    color:'#ef4444',

    width:3,

    dash:'dot'

  }

};

    let criticalAreas = [];
    let criticalLegend = {

  x:[null],

  y:[null],

  type:'scatter',

  mode:'lines',

  name:'Daerah Kritis',

  line:{
    color:'red',
    width:8
  }

};

    // =========================
    // UJI KANAN
    // =========================

    if(mode === "right"){

      let criticalX = [];
      let criticalY = [];

      for(let i = zCritical; i <= 4; i += 0.1){

        criticalX.push(i);

        criticalY.push(
  method === "f"
    ? fDistribution(i)
    : normalDistribution(i)
);

      }

      criticalAreas.push({
        name:'Daerah Kritis',

        x: criticalX,

        y: criticalY,

        fill: 'tozeroy',

        type: 'scatter',

        mode: 'lines',
        showlegend:false,

        fillcolor: 'rgba(239,68,68,0.4)',

        line: {
          color: 'rgba(0,0,0,0)'
        }

      });

    }

    // =========================
    // UJI KIRI
    // =========================

    if(mode === "left"){

      let criticalX = [];
      let criticalY = [];

      for(let i = -4; i <= -zCritical; i += 0.1){

        criticalX.push(i);

        criticalY.push(
  method === "f"
    ? fDistribution(i)
    : normalDistribution(i)
);

      }

      criticalAreas.push({
        name:'Daerah Kritis',

        x: criticalX,

        y: criticalY,

        fill: 'tozeroy',

        type: 'scatter',

        mode: 'lines',
        showlegend:false,

        fillcolor: 'rgba(239,68,68,0.4)',

        line: {
          color: 'rgba(0,0,0,0)'
        }

      });

    }

    // =========================
    // UJI DUA EKOR
    // =========================

    if(mode === "two"){

      // kiri
      let leftX = [];
      let leftY = [];

      for(let i = -4; i <= -zCritical; i += 0.1){

        leftX.push(i);

        leftY.push(
  method === "f"
    ? fDistribution(i)
    : normalDistribution(i)
);

      }

      criticalAreas.push({
        name:'Daerah Kritis',

        x: leftX,

        y: leftY,

        fill: 'tozeroy',

        type: 'scatter',

        mode: 'lines',
        showlegend:false,

        fillcolor: 'rgba(239,68,68,0.4)',

        line: {
          color: 'rgba(0,0,0,0)'
        }

      });

      // kanan
      let rightX = [];
      let rightY = [];

      for(let i = zCritical; i <= 4; i += 0.1){

        rightX.push(i);

        rightY.push(
  method === "f"
    ? fDistribution(i)
    : normalDistribution(i)
);

      }

      criticalAreas.push({
        name:'Daerah Kritis',

        x: rightX,

        y: rightY,

        fill: 'tozeroy',

        type: 'scatter',

        mode: 'lines',
        showlegend:false,

        fillcolor: 'rgba(239,68,68,0.4)',

        line: {
          color: 'rgba(0,0,0,0)'
        }

      });

    }

    Plotly.react(

      'chart',

      [
  curve,
  criticalLegend,
  ...criticalAreas,
  criticalLine,
  guideLine,
  point
],

      {

        title:'Visualisasi Interaktif Uji Hipotesis',

        paper_bgcolor:'rgba(0,0,0,0)',

        plot_bgcolor:'rgba(0,0,0,0)',

        font:{
          color:'white'
        },
        annotations:[

{

x:z,

y:0,

text:z.toFixed(2),

showarrow:false,

yshift:-35,

font:{
color:"#facc15",
size:18
}

},

{

x:zCritical,

y:0,

text:`
${method === "f"
? "F"
: method === "t"
? "t"
: "Z"} Tabel
${zCritical}
`,

showarrow:false,

yshift:-35,

font:{
color:"#ef4444",
size:18
}

}

],

      },
      

      {
        responsive:true
      }

    );

  }

  // ==================================================
  // MODE 3D
  // ==================================================

  if(currentView === "3d"){

    let zAxis = [];

    for(let i = 0; i <= 1; i += 0.1){

      zAxis.push(i);

    }

    let surfaceZ = [];

    for(let i = 0; i < zAxis.length; i++){

      let row = [];

      for(let j = 0; j < x.length; j++){

  let yValue;

  if(method === "f"){

  yValue = fDistribution(x[j]);

}
else if(method === "corr"){

  yValue = Math.abs(x[j]) / 8;

}
else if(method === "reg"){

  yValue = x[j] / 8;

}
else{

  yValue = normalDistribution(x[j]);

}

  row.push(yValue);

}

      surfaceZ.push(row);

    }

    // =========================
    // SURFACE 3D
    // =========================

    let surface = {

      z: surfaceZ,

      x: x,

      y: zAxis,

      type: 'surface',

      colorscale: 'Turbo',

      contours: {

        z: {

          show:true,

          usecolormap:true,

          highlightcolor:"#42f5ef",

          project:{z:true}

        }

      },

      lighting: {

        ambient:0.8,

        diffuse:1,

        roughness:0.4,

        specular:0.9

      },

      lightposition: {

        x:100,

        y:200,

        z:300

      }

    };

    // =========================
    // TITIK Z
    // =========================

    let point3D = {

      x:[z],

      y:[0.5],

      z:[

method === "f"
? fDistribution(z)

: method === "corr"
? Math.abs(z)

: method === "reg"
? Math.abs(z)

: normalDistribution(z)

],

      mode:'markers+text',

      type:'scatter3d',
      showlegend:false,

      text: [`
${method === "f"
? "F"
: method === "t"
? "t"
: "Z"} = ${z.toFixed(2)}
`],

      textposition:'top center',

      marker:{
        color:'#ff0000',
        size:14,
        symbol:'diamond'
      }

    };
    let criticalPoint3D = {

  x:[zCritical],

  y:[0.5],

  z:[method === "f"
      ? fDistribution(zCritical)
      : normalDistribution(zCritical)],

  mode:'markers+text',

  type:'scatter3d',
  showlegend:false,

 text:[`${

method === "f"
? "F Tabel"

: method === "t"
? "t Tabel"

: "Z Tabel"

} = ${zCritical}`],
  textposition:'top center',

  marker:{
    color:'#ef4444',
    size:12,
    symbol:'circle'
  }

};

    Plotly.react(

  'chart',

  [surface, criticalPoint3D, point3D],

  {

    title:
  method === "corr"
  ? "Visualisasi 3D Korelasi"
  : method === "reg"
  ? "Visualisasi 3D Regresi"
  : method === "f"
  ? "Visualisasi 3D Uji F"
  : method === "t"
  ? "Visualisasi 3D Uji t"
  : "Visualisasi 3D Uji Z",

        paper_bgcolor:'rgba(0,0,0,0)',

        font:{
          color:'white'
        },

        scene:{

          aspectratio:{
  x:3,
  y:1.5,
  z:1.5
},

          camera:{

           eye:{
  x:2.8,
  y:2.5,
  z:1.8
}

          },

          xaxis:{

            
           title:
method === "corr"
? "Nilai Korelasi"
: method === "reg"
? "Nilai Regresi"
: method === "f"
? "Nilai F"
: method === "t"
? "Nilai t"
: "Nilai Z",

            backgroundcolor:'rgb(20,20,20)',

            gridcolor:'white',

            showbackground:true,

            zerolinecolor:'white',

            color:'white'

          },

          yaxis:{

            title:'Depth',

            backgroundcolor:'rgb(30,30,30)',

            gridcolor:'white',

            showbackground:true,

            zerolinecolor:'white',

            color:'white'

          },

          zaxis:{

            title:'Probabilitas',

            backgroundcolor:'rgb(40,40,40)',

            gridcolor:'white',

            showbackground:true,

            zerolinecolor:'white',

            color:'white'

          }

        }

      },

      {
        responsive:true
      }

    );

  }

  // ==================================================
  // LOGIKA H0
  // ==================================================
  if(method === "reg"){

  return;

}

if(method === "corr"){

  return;

}

let reject = false;

  if(mode === "right"){

  reject = z >= zCritical;

}

if(mode === "left"){

  reject = z <= -zCritical;

}

if(mode === "two"){

  reject = Math.abs(z) >= zCritical;

}
console.log("Z =", z);
console.log("Z Critical =", zCritical);
console.log("ABS =", Math.abs(z));
console.log("REJECT =", reject);

  if(reject){

  decisionOutput.innerHTML =
'<span style="color:#ef4444;">H0 Ditolak</span>';

  result.innerHTML = `

    <span style="color:#ef4444;">
      H0 Ditolak
    </span>

    <br>

    <small>
      Nilai masuk daerah kritis
    </small>

  `;

}else{

  decisionOutput.innerHTML =
'<span style="color:#22c55e;">H0 Diterima</span>';

  result.innerHTML = `

    <span style="color:#22c55e;">
      H0 Diterima
    </span>

    <br>

    <small>
      Nilai tidak masuk daerah kritis
    </small>

  `;

}

}

// =========================
// EVENTS
// =========================

slider.addEventListener(
  "input",
  generateCurve
);

alphaSelect.addEventListener(
  "change",
  generateCurve
);

testType.addEventListener(
  "change",
  generateCurve
);

viewMode.addEventListener(
  "change",
  generateCurve
);
manualInput.addEventListener(
  "input",
  function(){

    slider.value = manualInput.value;

    generateCurve();

  }
);

methodType.addEventListener(
  "change",
  generateCurve
);

// =========================
// LOAD AWAL
// =========================

generateCurve();