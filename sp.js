var Index = {
    //obj for data store
    data: {
        btnHome: document.querySelector("#btnHome"),
        inputSearchW: document.querySelector("#searchWord"),
        txt: "#",
        countyID: "",
        dotsElement: document.querySelector("#dots"),
        dpathElement: document.querySelector("#dpath"),
        myPD: {
            cntId: "",
            pnt: {},
        },
        pdArr: [],
    },
    //obj for func store
    func: {
        clickHome: function () {
            console.log("Hao is being clicked!")
        },

        getRect: function (countyCode) {
            Index.data.countyID = Index.data.txt.concat("FIPS_",countyCode);
            path = document.querySelector(Index.data.countyID);
            rect = path.getBBox();
            return rect;
        },

        getCC: function (rect) {
            // cy = (rect.bottom - rect.y) / 2 + rect.y;
            // cx = (rect.right - rect.x) / 2 + rect.x;
            cx = rect.x + rect.width/2.0;
            cy = rect.y + rect.height/2.0;
            cArr = [cx, cy];
            return cArr;
        },

        getR: function (start,end) {
            a = Math.pow((start[0]-end[0]),2);
            d = Math.sqrt(Math.pow((start[0]-end[0]),2)+Math.pow((start[1]-end[1]),2));
            r = (Math.pow(a,2)+Math.pow(d/2,2))/(2*a);
            return r;
        },

        dotsDraw: function (cx, cy) {
        sdotHtml = `<circle id="dot" cx="${cx}" cy="${cy}" r="1" />`;
        Index.data.dotsElement.innerHTML += sdotHtml;
        },

        pathsDraw: function (start, end, year1, year2) {

            // pathHtml = `<line x1="${start[0]}" y1="${start[1]}" x2="${end[0]}" y2="${end[1]}" style="stroke:rgb(255,0,0);stroke-width:1" />`;
            pathHtml =`<path opacity="0.6" 
            d="M ${start[0]} ${start[1]} 
            A ${Index.func.getR(start,end)} ${Index.func.getR(start,end)} 0 0 0 ${end[0]} ${end[1]}" 
            style="fill:none; stroke:${Index.func.colorMap(year1, year2)};
            stroke-width:1" />`
            Index.data.dpathElement.innerHTML += pathHtml;
        },

        colorMap: function (year1, year2) {
            let seqColors = [
                "#0d0887","#100788","#130789","#16078a","#19068c","#1b068d","#1d068e","#20068f","#220690","#240691","#260591",
                "#280592","#2a0593","#2c0594","#2e0595","#2f0596","#310597","#330597","#350498","#370499","#38049a","#3a049a",
                "#3c049b","#3e049c","#3f049c","#41049d","#43039e","#44039e","#46039f","#48039f","#4903a0","#4b03a1",
                "#4c02a1","#4e02a2","#5002a2","#5102a3","#5302a3","#5502a4","#5601a4","#5801a4","#5901a5","#5b01a5",
                "#5c01a6","#5e01a6","#6001a6","#6100a7","#6300a7","#6400a7","#6600a7","#6700a8","#6900a8","#6a00a8",
                "#6c00a8","#6e00a8","#6f00a8","#7100a8","#7201a8","#7401a8","#7501a8","#7701a8","#7801a8","#7a02a8",
                "#7b02a8","#7d03a8","#7e03a8","#8004a8","#8104a7","#8305a7","#8405a7","#8606a6","#8707a6","#8808a6",
                "#8a09a5","#8b0aa5","#8d0ba5","#8e0ca4","#8f0da4","#910ea3","#920fa3","#9410a2","#9511a1","#9613a1",
                "#9814a0","#99159f","#9a169f","#9c179e","#9d189d","#9e199d","#a01a9c","#a11b9b","#a21d9a","#a31e9a",
                "#a51f99","#a62098","#a72197","#a82296","#aa2395","#ab2494","#ac2694","#ad2793","#ae2892","#b02991",
                "#b12a90","#b22b8f","#b32c8e","#b42e8d","#b52f8c","#b6308b","#b7318a","#b83289","#ba3388","#bb3488",
                "#bc3587","#bd3786","#be3885","#bf3984","#c03a83","#c13b82","#c23c81","#c33d80","#c43e7f","#c5407e",
                "#c6417d","#c7427c","#c8437b","#c9447a","#ca457a","#cb4679","#cc4778","#cc4977","#cd4a76","#ce4b75",
                "#cf4c74","#d04d73","#d14e72","#d24f71","#d35171","#d45270","#d5536f","#d5546e","#d6556d","#d7566c",
                "#d8576b","#d9586a","#da5a6a","#da5b69","#db5c68","#dc5d67","#dd5e66","#de5f65","#de6164","#df6263",
                "#e06363","#e16462","#e26561","#e26660","#e3685f","#e4695e","#e56a5d","#e56b5d","#e66c5c","#e76e5b",
                "#e76f5a","#e87059","#e97158","#e97257","#ea7457","#eb7556","#eb7655","#ec7754","#ed7953","#ed7a52",
                "#ee7b51","#ef7c51","#ef7e50","#f07f4f","#f0804e","#f1814d","#f1834c","#f2844b","#f3854b","#f3874a",
                "#f48849","#f48948","#f58b47","#f58c46","#f68d45","#f68f44","#f79044","#f79143","#f79342","#f89441",
                "#f89540","#f9973f","#f9983e","#f99a3e","#fa9b3d","#fa9c3c","#fa9e3b","#fb9f3a","#fba139","#fba238",
                "#fca338","#fca537","#fca636","#fca835","#fca934","#fdab33","#fdac33","#fdae32","#fdaf31","#fdb130",
                "#fdb22f","#fdb42f","#fdb52e","#feb72d","#feb82c","#feba2c","#febb2b","#febd2a","#febe2a","#fec029",
                "#fdc229","#fdc328","#fdc527","#fdc627","#fdc827","#fdca26","#fdcb26","#fccd25","#fcce25","#fcd025",
                "#fcd225","#fbd324","#fbd524","#fbd724","#fad824","#fada24","#f9dc24","#f9dd25","#f8df25","#f8e125",
                "#f7e225","#f7e425","#f6e626","#f6e826","#f5e926","#f5eb27","#f4ed27","#f3ee27","#f3f027","#f2f227",
                "#f1f426","#f1f525","#f0f724","#f0f921"];
                 
                yearVal = (year2 + year1)/2;
                //map color?
                colorID = Math.trunc((yearVal%100));
                var colorCode = seqColors[colorID];

                // console.log(colorCode);
                
                return colorCode;
                
        },

        exportTableToExcel: function(tableID, filename = ''){
            var downloadLink;
            var dataType = 'application/vnd.ms-excel';
            var tableSelect = document.getElementById(tableID);
            var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
            
            // Specify file name
            filename = filename?filename+'.xls':'excel_data.xls';
            
            // Create download link element
            downloadLink = document.createElement("a");
            
            document.body.appendChild(downloadLink);
            
            if(navigator.msSaveOrOpenBlob){
                var blob = new Blob(['\ufeff', tableHTML], {
                    type: dataType
                });
                navigator.msSaveOrOpenBlob( blob, filename);
            }else{
                // Create a link to the file
                downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
            
                // Setting the file name
                downloadLink.download = filename;
                
                //triggering the function
                downloadLink.click();
            }
        },

    }
}



//----draw all dots

// let pathTag = document.querySelectorAll("#stylegroup path");
// pathTag.forEach(v => {
//     console.log(v['id']);
//     pntID = Index.data.txt.concat(v.id);
//     path = document.querySelector(pntID);
//     rect = path.getBoundingClientRect();
//     cArr = Index.func.getCC(rect);
//     Index.func.dotsDraw(cArr[0],cArr[1]);
// });

//----finding neighbours
let pathTag = document.querySelectorAll("#stylegroup path");

//get segment dots for each path
var i = 0;
pathTag.forEach(v => {

    //v is an obj for each path, num is the number of segments
    let l = v.getTotalLength();
    let num = 10;

    //parameters for pnts loop in each path
    var j = 0;
    var pArr = [];

    //important, every loop should given new address
    var myPD = {}; 

    //put path id into myPD
    myPD.cntId = v.id;
    
    //get segment dots
    for(let i = (l/num);i<=l;i+=(l/num)){

        p = v.getPointAtLength(i); 

        var segP = {};  
        segP['x'] = p.x;
        segP['y'] = p.y;
        pArr[j] = segP;

        j++;     
    }

    //put path dots into myPD
    myPD.pnt = pArr;

    //put one path info into pdArr
    Index.data.pdArr[i] = myPD;

    i++;

})

console.log(Index.data.pdArr);
// console.log(Object.values(Index.data.pdArr));

var t = 0;
var baseArr = [];
Object.keys(Index.data.pdArr).forEach(key => {
    // console.log(Index.data.pdArr[key]);
    v = Index.data.pdArr[key]['pnt'];
    Object.keys(v).forEach(key => {
        // console.log('dddd');
        // console.log(v);
        v.forEach(key => {
            // console.log('ppp');
            // console.log(key);
            baseArr[t] = key;
            t++;
        })
    })
})
console.log('baseArr');
// console.log(baseArr);


//----make a table
//create Table
// var table = document.createElement('table');
// table.setAttribute('id', 'myTable');

var k = '<tbody>';

var s = 0;
Object.keys(Index.data.pdArr).forEach(key => {
    n = Index.data.pdArr[key]['cntId'];
    v = Index.data.pdArr[key]['pnt'];
    Object.keys(v).forEach(key => {
        v.forEach(key => {
            //get each point of one path
            Object.keys(Index.data.pdArr).forEach(key1 => {
                n1 = Index.data.pdArr[key1]['cntId'];
                v1 = Index.data.pdArr[key1]['pnt'];
                if( n1 !== n){
                        v1.forEach(key2 => {
                            if(key2.x == key.x && key2.y == key.y){
                                console.log('same:',s);
                                console.log(n1,n);
                                s++;

                                //make table
                                k+='<tr>';
                                k+='<td>'+n+'</td>';
                                k+='<td>'+n1+'</td>';
                                k+='</tr>';
                            }
                        })          
                }    
            })
        })
    })
})
k+='</tbody>';

console.log(k);
document.getElementById('myTable').innerHTML = k;
                







