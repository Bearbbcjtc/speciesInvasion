

function unite() {
    paper.setup("canvasPaper");
    let path = new Path(polygonD);
    // merge/unite path
    let united = path.unite();
    // get svg d 
    let unitedData = united
      .exportSVG({
        precision: 3
      })
      .getAttribute("d");
  
    united.strokeColor = "black";
    united.scale(2, new Point(0, 0));
  
    //update svg 
    mergedPolygon.setAttribute("d", unitedData);
  }
  
  
  //convert polygon point array to path d 
  function polygonToPath(points) {
    let d = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
      d += `L ${points[i][0]} ${points[i][1]}`;
    }
    return d + "z";
  }

  //get new Pathitem from code array 
  function getCodePathItem(data, name) {
      let idx = Object.keys(data).filter(function(key) {
      return data[key].ID == name+' ';
  });
    let path = new Path(data[idx].points);
    return path;
  }

  function getNewPathItem(data, name) {
    
  }
