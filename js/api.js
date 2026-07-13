/* ===========================
   API（演示版）
=========================== */

// 获取订单
function getOrders(){

    let data = localStorage.getItem("orders");

    if(!data){

        return [];

    }

    return JSON.parse(data);

}

// 保存订单
function saveOrders(list){

    localStorage.setItem(
        "orders",
        JSON.stringify(list)
    );

}

// 创建订单
function createOrder(phone,money){

    let list = getOrders();

    let order = {

        id:"OD"+Date.now(),

        phone:phone,

        money:money,

        status:"待处理",

        createTime:new Date().toLocaleString()

    };

    list.unshift(order);

    saveOrders(list);

    return order;

}

// 根据订单号查询
function getOrder(id){

    let list = getOrders();

    return list.find(function(item){

        return item.id===id;

    });

}

// 修改状态
function updateOrder(id,status){

    let list=getOrders();

    list.forEach(function(item){

        if(item.id===id){

            item.status=status;

        }

    });

    saveOrders(list);

}

// 删除订单
function deleteOrder(id){

    let list=getOrders();

    list=list.filter(function(item){

        return item.id!==id;

    });

    saveOrders(list);

}
