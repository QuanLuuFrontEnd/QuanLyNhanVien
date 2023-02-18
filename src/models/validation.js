function Validation() {
  this.kiemTraRong = function (value, spanId, mess) {
    if (value === "") {
      getEle(spanId).style.display = "block";
      getEle(spanId).innerHTML = mess;
      return false;
    }

    getEle(spanId).style.display = "none";
    getEle(spanId).innerHTML = "";
    return true;
  };
  this.kiemTraLuong = function (value, spanId, mess) {
    return kiemTraRange(1000000, 20000000, value, spanId, mess)

  }
  this.kiemTraGioLam = function (value, spanId, mess) {
    return kiemTraRange(50, 150, value, spanId, mess)

  }
  this.kiemTraMaNV = function (value, spanId, mess) {
    let patternString = /^[0-9]{1,4}$/;
    return kiemTraByRegex(patternString, value, spanId, mess);
  }
  this.kiemTraTenNV = function (value, spanId, mess) {
    let patternString = /^[A-Za-z\s]*$/;
    return kiemTraByRegex(patternString, value, spanId, mess);
  }

  function kiemTraByRegex(regexPattern, value, spanId, mess) {
    let test = regexPattern.test(value);
    console.log("result test: " + test);
    if (!test) {
      getEle(spanId).style.display = "block";
      getEle(spanId).innerHTML = mess;
      return false;
    }

    getEle(spanId).style.display = "none";
    getEle(spanId).innerHTML = "";
    return true;
  };
  function kiemTraRange(min, max, value, spanId, mess) {
    if (isNumber(value)) {
      var valueToInt = parseInt(value, 10);
      console.log("valueToInt: " + valueToInt);
      if (valueToInt >= min && valueToInt <= max) {
        getEle(spanId).style.display = "none";
        getEle(spanId).innerHTML = "";
        return true;
      }
    }
    getEle(spanId).style.display = "block";
    getEle(spanId).innerHTML = mess;
    return false;

  }
  function isNumber(value) {
    console.log("value: " + value);
    console.log("value sau khi replace: " + value.replace(/^\d|\d/g, ""));
    if ((value.toString()).replace(/^\d|\d/g, "").length == 0) {
      return true;
    }
    return false;
  }
  this.resetThongBao = function () {
    console.log("document.getElementsByClassName: " + document.getElementsByClassName("sp-thongbao").length);
    var thongBao = document.getElementsByClassName("sp-thongbao")
    // thongBao.array.forEach(item=>console.log(thongBao[item]));
    for (var i = 0; i < thongBao.length; i++) {
      console.log("thong bao:" + thongBao[i]);
      thongBao[i].style.display = "none";
      thongBao[i].innerHTML = "";
    }
  }
}
