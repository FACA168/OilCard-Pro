// ==========================
// OilCard Pro V3.0
// ==========================

const mobile = document.getElementById("mobile");
const receiveBtn = document.getElementById("receiveBtn");
const couponCode = document.getElementById("couponCode");
const couponStatus = document.getElementById("couponStatus");
const submitStaff = document.getElementById("submitStaff");

let currentMoney = 0;

// 生成代金券编号
function createCoupon() {

    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "OC-";

    for (let i = 0; i < 10; i++) {

        code += chars[Math.floor(Math.random() * chars.length)];

    }

    return code;
}

// 领取代金券
receiveBtn.onclick = function () {

    if (mobile.value.length != 11) {

        alert("请输入正确的手机号码");

        return;

    }

    couponCode.innerHTML = createCoupon();

    couponStatus.innerHTML = "等待工作人员激活";

    couponStatus.style.color = "#ff9800";

};

// ==========================
// 提交工作人员激活
// ==========================

submitStaff.onclick = function () {

    if (couponCode.innerHTML == "---------") {

        alert("请先领取电子代金券");

        return;

    }

    couponStatus.innerHTML = "已提交工作人员审核";

    couponStatus.style.color = "#1677ff";

    localStorage.setItem("couponCode", couponCode.innerHTML);

    localStorage.setItem("couponStatus", "已提交工作人员审核");

    alert("提交成功，请等待工作人员激活。");

};

// ==========================
// 充值金额选择
// ==========================

const moneyBtns = document.querySelectorAll(".money");

moneyBtns.forEach(function (btn) {

    btn.onclick = function () {

        moneyBtns.forEach(function (item) {

            item.classList.remove("active");

        });

        this.classList.add("active");

        currentMoney = this.innerText.replace("元", "");

    };

});

// ==========================
// 立即充值
// ==========================

document.querySelector(".payBtn").onclick = function () {

    if (couponStatus.innerHTML != "已激活") {

        alert("电子代金券未激活，暂时不能提交订单。");

        return;

    }

    if (currentMoney == 0) {

        alert("请选择充值金额");

        return;

    }

    alert("订单创建成功（演示版）");

};
