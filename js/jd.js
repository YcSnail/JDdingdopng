

var autoCheckVal = null;


setInter();

// 自动执行定时器
function setInter() {

    // 设置定时任务.定时查询页面
    autoCheckVal = setInterval("checkVal()",1000);//1000为1秒钟

}


function checkVal(){

    var auditCount = $('#afsWaitAuditListTab').find('.badge').text();

    // 检测 结果是否大于0

    // 抛出通知消息

    if (auditCount == '0'){
        return false;
    }

    notifyMe();

    // 取消通知
    clearInterval(autoCheckVal);

    // 5分钟内不再提示
    setTimeout("setInter()", 1000 * 5 * 60);
}


// 用户授权
if (Notification.permission == "granted") {
    Notification.requestPermission();
}

/**
 * 调用系统提醒
 *
 * 第一次进入页面需要授权，之后弹出提醒
 */
function notifyMe() {
    if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chromium.');
        return;
    }

    if (Notification.permission !== "granted"){
        Notification.requestPermission();

    } else {
        var notification = new Notification('京东叮咚提醒', {
            icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558935873055&di=82b168804fdb9ef485046a02a6a3860a&imgtype=0&src=http%3A%2F%2Fpic1.cxtuku.com%2F00%2F05%2F90%2Fb03242ed4a2c.jpg',
            body: "发现有待审核服务单,小胖快来看呀!"
        });

        notification.onclick = function () {
            window.open("https://vcp.jd.com/sub_afs/afsList/initTotalListPage");
        };

    }
}
