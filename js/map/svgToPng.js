/**
 * Created by Administrator on 2018/8/14.
 */
function svgToPng(svg, saveFileName) {
    //获取文件后缀名
    var fix = saveFileName.split(".");
    var imgType = fix[fix.length-1];

    //svg 转 str
    var serializer = new XMLSerializer()
    var svgStr = serializer.serializeToString(svg[0][0]);

    //获取svg大小
    var svgWidth = parseInt(svg.attr('width'));
    var svgHeight = parseInt(svg.attr('height'));

    //构建img
    var img = new Image();
    img.src = 'data:image/svg+xml;base64,' + window.btoa(svgStr);

    //构建canvas
    canvas = document.createElement('canvas');  //准备空画布
    canvas.width = svgWidth;
    canvas.height = svgHeight;
    var context = canvas.getContext('2d');  //取得画布的2d绘图上下文

    /**
     * 在本地进行文件保存
     * @param  {String} data     要保存到本地的图片数据
     * @param  {String} filename 文件名
     */
    var _saveFile = function (data, filename) {
        var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href = data;
        save_link.download = filename;
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        save_link.dispatchEvent(event);
    };

    //数据加载完成后，保存图片
    img.onload = function () {
        context.drawImage(img, 2, 2) ;
         //图片导出数据
        var imgData = canvas.toDataURL("image/"+imgType);
        // 下载后的图片名
        var filename = saveFileName;
        // download
        _saveFile(imgData, filename);
    }
}


