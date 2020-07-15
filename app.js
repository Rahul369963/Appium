var oFileIn;

$(function() {
    oFileIn = document.getElementById('my_file_input');
    if(oFileIn.addEventListener) {
        oFileIn.addEventListener('change', filePicked, false);
    }
});


function filePicked(oEvent) {
    var oFile = oEvent.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = e.target.result;
        var cfb = XLS.CFB.read(data, {type: 'binary'});
        var wb = XLS.parse_xlscfb(cfb);
        wb.SheetNames.forEach(function(sheetName) { 
            var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);   
            var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);  
            // console.log(typeof(oJS))
           //  console.log(typeof(sCSV))
            var obj = JSON.stringify(oJS);
                //console.log(oJS);
                oJS.forEach(po=>{
                //console.log(po.TestCaseID+" "+po.Status);
                if(po.Status=="Pass"){
                var table = `<tr><td>${po.TestCaseID}</td><td>${po.Status}</td></tr>`;
                  $("#data1").append(table);
              }else if(po.Status=="Fail"){
                var tablee = `<tr><td>${po.TestCaseID}</td><td>${po.Status}</td></tr>`;
                $("#data2").append(tablee);

              }

                })
           // console.log(oJS[0].Status);
           
           // data = [sCSV];
           // console.log(data);
          
           // console.log(data[0])
        }); 
    };
     reader.readAsBinaryString(oFile);
}
		