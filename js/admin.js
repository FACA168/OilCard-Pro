/* ===========================
   OilCard Pro 后台管理
=========================== */

// 当前订单（演示数据）
let orders = [
{
    id:"OD202607130001",
    phone:"138****8000",
    money:"200",
    status:"待处理",
    time:"2026-07-13 10:00:00"
},
{
    id:"OD202607130002",
    phone:"139****8888",
    money:"500",
    status:"处理中",
    time:"2026-07-13 10:15:00"
},
{
    id:"OD202607130003",
    phone:"137****6666",
    money:"100",
    status:"已完成",
    time:"2026-07-13 10:30:00"
}
];

// 页面加载
window.onload = function () {

    loadOrders();

    updateDashboard();

};

// 更新统计数据
function updateDashboard(){

    document.getElementById("todayCount").innerHTML = orders.length;

    document.getElementById("pendingCount").innerHTML =
        orders.filter(o=>o.status=="待处理").length;

    document.getElementById("completedCount").innerHTML =
        orders.filter(o=>o.status=="已完成").length;

    document.getElementById("totalCount").innerHTML =
        orders.length;

}

// 加载订单
function loadOrders(){

    let tbody=document.getElementById("orderTable");

    if(!tbody) return;

    tbody.innerHTML="";

    orders.forEach(function(item){

        tbody.innerHTML += `
<tr>

<td>${item.id}</td>

<td>${item.phone}</td>

<td>￥${item.money}</td>

<td>${item.status}</td>

<td>

<button class="btn-view"
onclick="viewOrder('${item.id}')">

查看

</button>

<button class="btn-delete"
onclick="deleteOrder('${item.id}')">

删除

</button>

</td>

</tr>
`;

    });

}

/* ===========================
   搜索订单
=========================== */

function searchOrders(){

    let keyword = document
        .getElementById("keyword")
        .value
        .trim();

    let tbody = document.getElementById("orderTable");

    if(!tbody) return;

    tbody.innerHTML = "";

    let result = orders.filter(function(item){

        return item.id.includes(keyword)
            || item.phone.includes(keyword);

    });

    if(result.length===0){

        tbody.innerHTML = `
<tr>
<td colspan="5">暂无符合条件的订单</td>
</tr>
`;

        return;

    }

    result.forEach(function(item){

        tbody.innerHTML += `
<tr>

<td>${item.id}</td>

<td>${item.phone}</td>

<td>￥${item.money}</td>

<td>${item.status}</td>

<td>

<button class="btn-view"
onclick="viewOrder('${item.id}')">

查看

</button>

<button class="btn-delete"
onclick="deleteOrder('${item.id}')">

删除

</button>

</td>

</tr>
`;

    });

}

/* ===========================
   查看订单
=========================== */

function viewOrder(id){

    localStorage.setItem("currentOrder",id);

    location.href="order.html";

}

/* ===========================
   删除订单
=========================== */

function deleteOrder(id){

    if(!confirm("确定删除该订单？")){

        return;

    }

    orders = orders.filter(function(item){

        return item.id!==id;

    });

    loadOrders();

    updateDashboard();

}

/* ===========================
   搜索按钮
=========================== */

let searchBtn = document.getElementById("searchBtn");

if(searchBtn){

    searchBtn.onclick = searchOrders;

}


/* ===========================
   本地数据保存
=========================== */

function saveOrders(){

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

}

/* ===========================
   加载本地数据
=========================== */

function loadLocalOrders(){

    let data = localStorage.getItem("orders");

    if(data){

        orders = JSON.parse(data);

    }

}

/* ===========================
   修改订单状态
=========================== */

function updateStatus(id,newStatus){

    orders.forEach(function(item){

        if(item.id===id){

            item.status = newStatus;

        }

    });

    saveOrders();

    loadOrders();

    updateDashboard();

}

/* ===========================
   新建订单
=========================== */

function addOrder(phone,money){

    let order = {

        id:"OD"+Date.now(),

        phone:phone,

        money:money,

        status:"待处理",

        time:new Date().toLocaleString()

    };

    orders.unshift(order);

    saveOrders();

    loadOrders();

    updateDashboard();

}

/* ===========================
   导出 CSV
=========================== */

function exportCSV(){

    let csv =
"订单号,手机号,金额,状态,时间\n";

    orders.forEach(function(item){

        csv +=
`${item.id},${item.phone},${item.money},${item.status},${item.time}\n`;

    });

    let blob = new Blob(
        [csv],
        {type:"text/csv;charset=utf-8;"}
    );

    let a = document.createElement("a");

    a.href = URL.createObjectURL(blob);

    a.download = "orders.csv";

    a.click();

}

/* ===========================
   页面初始化
=========================== */

loadLocalOrders();

loadOrders();

updateDashboard();
