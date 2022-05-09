let chineseChars = /[ ,，。、　？；\/\n]/;

function listSubstraction(l1, l2) {
    if (l1.length == 0) {
        return l2;
    }
    if (l2.length == 0) {
        return l1;
    }
    let l3 = [];
    for (let each of l1) {
        if (!l2.includes(each)) {
            l3.push(each);
        }
    }
    return l3;
}

function removeEmpty(list) {
    let result = [];
    for (let each of list) {
        if (each.length > 0) {
            result.push(each);
        }
    }
    return result;
}

function checkWhoAbsent() {
    // 获取所有人
    let allMembers = removeEmpty($('#all-member-text').val().split(chineseChars));
    // 如果没有人，则直接返回，并设置没有人缺席
    if (allMembers == null) {
        $('#result-show').text("");
        return false;
    }
    // 有人，则设置长度
    $('#all-member-count').text(allMembers.length);

    // 获取实际人
    let absentMembers = removeEmpty($('#real-member-text').val().split(chineseChars));
    console.log(absentMembers);
    // 没有输入实际名单，那么默认所有人缺席
    if (absentMembers == null || $('#real-member-text').val() === "") {
        $('#result-show').text(allMembers.join(' '));
        $('#real-member-count').text(0);
        return false;
    }
    // 更新长度
    $('#real-member-count').text(absentMembers.length);

    // 计算结果
    let result = listSubstraction(allMembers, absentMembers);
    console.log('缺席：', result);
    // 没有缺席
    if (result.length == 0) {
        $('#result-show').text("");
        $('#result-count').text(0);
        return;
    }
    $('#result-show').text(result.join(' '));
    $('#result-count').text(result.length);
}

function makePageLoading() {
    $('#head').css('height', '100vh');
    $('#head').css('line-height', '100vh');
    $('#head').text('加载中...');

}
function makePageReady() {
    setTimeout(function () {
        $('#head').css('height', '80px');
        $('#head').css('line-height', '80px');
        $('#head').text('缺席人员速查');
    }, 500)

}

window.onload = () => {
    $('#all-member-text').on('input', checkWhoAbsent);
    $('#real-member-text').on('input', checkWhoAbsent);
    makePageReady();
}