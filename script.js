let chineseChars = /[\u4e00-\u9fa5]{2,4}/gm;

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

function checkWhoAbsent() {
    let allMembers = $('#all-member-text').val().match(chineseChars);
    console.log(allMembers);
    if (allMembers == null) { return false; }

    let absentMembers = $('#real-member-text').val().match(chineseChars);
    console.log(absentMembers);
    if (absentMembers == null) { return false; }

    let result = listSubstraction(allMembers, absentMembers);
    console.log('缺席：', result);
    if (result.length == 0) {
        $('#result-show').text("");
    }
    $('#result-show').text(result.join(' '));
}

window.onload = () => {
    $('#all-member-text').on('input', checkWhoAbsent);
    $('#real-member-text').on('input', checkWhoAbsent);
}