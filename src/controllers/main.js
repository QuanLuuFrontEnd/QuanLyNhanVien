//Tao doi tuong dsnv tu lop doi tuong DanhSachNhanVien
var dsnv = new DanhSachNhanVien();
var validation = new Validation();
setLocalStorage();
getLocalStorage();

/**
 * DOM id
 */
function getEle(id) {
  return document.getElementById(id);
}

/**
 * Lay thong tin nhan vien
 */
function layThongTinNV() {
  //DOM lấy các thông tin user nhập vào các thẻ input
  var maNV = getEle("msnv").value;
  var hoTen = getEle("name").value;
  var email = getEle("email").value;
  var matKhau = getEle("password").value;
  var ngaySinh = getEle("datepicker").value;
  var chucVu = getEle("chucvu").value;

  /**
   * Validation
   */
  var isValid = true;

  isValid = validation.kiemTraRong(maNV, "tbMaNV", "(*) Vui long nhap MaNV");

  if (!isValid) return null;

  //tạo đối tượng từ lớp đối tượng NhanVien
  var nv = new NhanVien(maNV, hoTen, email, matKhau, ngaySinh, chucVu);

  return nv;
}

/**
 * Them Nhan Vien
 */
getEle("btnThemNV").addEventListener("click", function () {
  var nv = layThongTinNV();

  if (nv) {
    dsnv.themNV(nv);

    renderNV(dsnv.arr);

    //close modal
    getEle("btnDong").click();

    setLocalStorage();

    resetForm();
  }
});

/**
 * Hien thi danh sach NV
 */
function renderNV(data) {
  var contentHTML = "";

  data.forEach(function (nv) {
    contentHTML += `
            <tr>
                <td>${nv.maNV}</td>
                <td>${nv.hoTen}</td>
                <td>${nv.email}</td>
                <td>${nv.ngaySinh}</td>
                <td>${nv.chucVu}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editNV('${nv.maNV}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteNV('${nv.maNV}')">Delete</button>
                </td>
            </tr>
        `;
  });

  getEle("tableDanhSach").innerHTML = contentHTML;
}

// function renderNV(data) {
//   var contentHTML = "";

//   for (var i = 0; i < data.length; i++) {
//     var nv = data[i];
//     contentHTML += "<tr>";
//     contentHTML += "<td>" + nv.maNV + "</td>";
//     contentHTML += "<td>" + nv.hoTen + "</td>";
//     contentHTML += "<td>" + nv.email + "</td>";
//     contentHTML += "<td>" + nv.ngaySinh + "</td>";
//     contentHTML += "<td>" + nv.chucVu + "</td>";
//     contentHTML += "</tr>";
//   }

//   getEle("tableDanhSach").innerHTML = contentHTML;
// }

/**
 * Delete NV
 */
function deleteNV(maNV) {
  dsnv.xoaNV(maNV);
  renderNV(dsnv.arr);
  setLocalStorage();
}

getEle("btnThem").addEventListener("click", function () {
  //Dom tới nút "Cap Nhat" cho ẩn
  getEle("btnCapNhat").style.display = "none";
  getEle("btnThemNV").style.display = "block";

  getEle("msnv").disabled = false;
});

/**
 * Edit NV
 */
function editNV(maNV) {
  console.log(maNV);
  getEle("btnThemNV").style.display = "none";
  getEle("btnCapNhat").style.display = "block";

  var nv = dsnv.layThongTinNV(maNV);

  if (nv) {
    //hiển thị thông nv ra các thẻ input
    getEle("msnv").value = nv.maNV;
    //disabled #msnv
    getEle("msnv").disabled = true;

    getEle("name").value = nv.hoTen;
    getEle("email").value = nv.email;
    getEle("password").value = nv.matKhau;
    getEle("datepicker").value = nv.ngaySinh;
    getEle("chucvu").value = nv.chucVu;
  }
}

/**
 * Update NV
 */
getEle("btnCapNhat").addEventListener("click", function () {
  var nv = layThongTinNV();
  dsnv.capNhatNV(nv);
  //close modal
  getEle("btnDong").click();
  renderNV(dsnv.arr);
  setLocalStorage();
});

/**
 * Search NV
 */
getEle("searchName").addEventListener("keyup", function () {
  var keyword = getEle("searchName").value;

  var mangTimKiem = dsnv.timKiemNV(keyword);
  renderNV(mangTimKiem);
});

/**
 * Reset Form
 */
function resetForm() {
  getEle("formNV").reset();
}

/**
 * Luu DSNV
 */
function setLocalStorage() {
  //convert data JSON => String
  var dataString = JSON.stringify(dsnv.arr);
  localStorage.setItem("DSNV", dataString);
}

/**
 * Lấy data từ LocalStorage
 */
function getLocalStorage() {
  var dataString = localStorage.getItem("DSNV");
  //convert string => JSON
  dsnv.arr = JSON.parse(dataString);
  //render tbody
  renderNV(dsnv.arr);
}
