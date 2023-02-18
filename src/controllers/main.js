var callNhanVienApi = new CallNhanVienApi();
var validation = new Validation();
var arrNhanVien = [];
getListNVien();
function getListNVien() {

  callNhanVienApi
    .fetchListData()
    .then(function (result) {
      renderData(result.data);
      arrNhanVien = result.data;
    })
    .catch(function (error) {
      console.log(error);
    });

}
/**
 * DOM id
 */
function getEle(id) {
  return document.getElementById(id);
}

/**
 * Tìm kiếm NV
 */
function searchNVien(keyword) {
  arrTimKiem = [];
  arrNhanVien.forEach(function (nv) {
    var hoTenLowerCase = nv.tenNhanVien.toLowerCase();
    var keywordLowerCase = keyword.toLowerCase();
    if (hoTenLowerCase.indexOf(keywordLowerCase) !== -1) {
      arrTimKiem.push(nv);
    }
  });
  return arrTimKiem;
}
/**
 * Xử lý nút tìm kiếm
 */
getEle("searchName").addEventListener("keyup", function () {
  var keyword = getEle("searchName").value;
  var mangTimKiem = searchNVien(keyword);
  renderData(mangTimKiem);
});

/**
 * Hien thi danh sach NV
 */

function renderData(data) {
  var contentHTML = "";
  data.forEach(function (nv, i) {
    contentHTML += `
            <tr>
            <td>${i + 1}</td>
                <td>${nv.maNhanVien}</td>
                <td>${nv.tenNhanVien}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.heSoChucVu}</td>
                <td>${nv.luongCoBan}</td>
                <td>${nv.soGioLamTrongThang}</td>                
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editNV('${nv.maNhanVien}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteNV('${nv.maNhanVien}')">Delete</button>
                </td>
            </tr>
        `;
  });
  getEle("tableDanhSach").innerHTML = contentHTML;

}

// xu ly nut edit
/**
 * Edit NV
 */
function editNV(maNV) {
  console.log(maNV);
  getEle("btnThemNV").style.display = "none";
  getEle("btnCapNhat").style.display = "block";
  resetForm();
  callNhanVienApi
    .getNVienById(maNV)
    .then(function (result) {
      var nhanVien = result.data;
      validation.resetThongBao();
      getEle("maNhanVien").value = nhanVien.maNhanVien;
      getEle("maNhanVien").disabled = true;
      getEle("tenNhanVien").value = nhanVien.tenNhanVien;
      getEle("heSoChucVu").value = nhanVien.heSoChucVu;
      console.log("he so chuc vu: " + nhanVien.heSoChucVu);
      getEle("luongCoBan").value = nhanVien.luongCoBan;
      getEle("soGioLamTrongThang").value = nhanVien.soGioLamTrongThang;
      switch (nhanVien.heSoChucVu) {
        case 1:
          getEle("opt1").setAttribute("selected", "selected");
          console.log("chuc vu case1: " + nhanVien.heSoChucVu);
          break;
        case 2:
          getEle("opt2").setAttribute("selected", "selected");
          console.log("chuc vu case2: " + nhanVien.heSoChucVu);
          break;
        default:
          getEle("opt3").setAttribute("selected", "selected");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}


/**
 * Update NV
 * Xử lý nút update
 */
getEle("btnCapNhat").addEventListener("click", function () {
  handleUpdate(getEle("maNhanVien").value);
  getEle("btnDong").click();
});


/**
 * Update Product
 */
function handleUpdate(id) {
  var nhanVien = layThongTinNV();
  callNhanVienApi
    .updateNVien(nhanVien)
    .then(function (result) {
      if (getEle("searchName").value == "")
        getListNVien();
      else {
        callNhanVienApi.fetchListData()
          .then(function (result) {
            arrNhanVien = result.data;
            console.log("getEle searchName: " + getEle("searchName").value)
            var mangTimKiem = searchNVien(getEle("searchName").value);
            renderData(mangTimKiem);
          })

      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Lay thong tin nhan vien
 */
function layThongTinNV() {
  //DOM lấy các thông tin user nhập vào các thẻ input
  var maNhanVien = getEle("maNhanVien").value;
  var tenNhanVien = getEle("tenNhanVien").value;
  var heSoChucVu = getEle("chucvu").value * 1;
  var chucVu = "";
  switch (heSoChucVu) {
    case 1:
      chucVu = getEle("opt1").innerHTML;
      break;
    case 2:
      chucVu = getEle("opt2").innerHTML;
      break;
    default:
      chucVu = getEle("opt3").innerHTML;

  }
  var luongCoBan = getEle("luongCoBan").value;
  var soGioLamTrongThang = getEle("soGioLamTrongThang").value;
  console.log("maNhanVien update" + maNhanVien);
  console.log("tenNhanVien update: " + tenNhanVien);
  console.log("chucVu update" + chucVu);
  console.log("heSoChucVu update: " + heSoChucVu);
  console.log("luongCoBan update: " + luongCoBan);
  console.log("soGioLamTrongThang update: " + soGioLamTrongThang);

  /**
   * Validation
   */
  var isValid = true;
  isValid = validation.kiemTraRong(maNhanVien, "tbMaNhanVien", "(*) Vui long nhap MaNV") &&
    validation.kiemTraMaNV(maNhanVien, "tbMaNhanVien", "(*) MaNV chỉ tối đa 4 ký số") &&
    validation.kiemTraTenNV(tenNhanVien, "tbTenNhanVien", "(*) Tên nhân viên phải là chữ") &&
    validation.kiemTraLuong(luongCoBan, "tbLuongCoBan", "(*) Lương cơ bản 1 000 000 - 20 000 000") &&
    validation.kiemTraGioLam(soGioLamTrongThang, "tbSoGioLamTrongThang", "(*) Số giờ làm trong tháng 50 - 150 giờ");
  if (!isValid) return null;
  var nv = new NhanVien(maNhanVien, tenNhanVien, chucVu, heSoChucVu, luongCoBan, soGioLamTrongThang);
  return nv;
}
/**
 * Xử lý nút thêm
 */
getEle("btnThem").addEventListener("click", function () {
  resetForm();
  getEle("btnCapNhat").style.display = "none";
  getEle("btnThemNV").style.display = "block";
});

/**
 * Them Nhan Vien
 */
getEle("btnThemNV").addEventListener("click", function () {
  var nhanVien = layThongTinNV();
  if (nhanVien !== null) {
    callNhanVienApi
      .addNVien(nhanVien)
      .then(function (result) {
        getListNVien();
      }).then(function (result) {
        callNhanVienApi
          .fetchListData()
          .then(function (result) {
            arrNhanVien = result.data;
            console.log("getEle searchName: " + getEle("searchName").value)
            var mangTimKiem = searchNVien(getEle("searchName").value);
            renderData(mangTimKiem);
          }).catch(function (error) {
            console.log(error);
          });
      }).catch(function (error) {
        console.log(error);
      });
  }
  getEle("btnDong").click();
}
);
/**
 * Delete NV
 */
function deleteNV(id) {
  callNhanVienApi
    .deleteNVien(id)
    .then(function () {
      getListNVien();
    })
    .catch(function (error) {
      console.log(error);
    });
}
/**
 * Reset Form
 */
function resetForm() {
  getEle("formNV").reset();
  getEle("maNhanVien").disabled = false;
  getEle("chucvu").value = 1;
  getEle("opt1").removeAttribute("selected");
  getEle("opt2").removeAttribute("selected");
  getEle("opt3").removeAttribute("selected");
}