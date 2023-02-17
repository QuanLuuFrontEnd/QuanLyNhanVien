function DanhSachNhanVien() {
  //property
  this.arr = [];

  //method
  this.themNV = function (nv) {
    this.arr.push(nv);
  };

  this.timViTriNV = function (maNV) {
    /**
     * 0. Tạo biến index gán giá trị -1
     * 1. Duyệt mảng arr
     * 2. Nếu nv.maNV trùng với maSV
     *      => true => cập nhật giá trị cho index = (i)
     */
    var index = -1;

    this.arr.forEach(function (nv, i) {
      if (nv.maNV === maNV) {
        index = i;
      }
    });

    return index;
  };

  this.xoaNV = function (maNV) {
    var index = this.timViTriNV(maNV);

    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  };

  this.layThongTinNV = function (maNV) {
    var index = this.timViTriNV(maNV);

    if (index !== -1) {
      return this.arr[index];
    }

    return null;
  };

  this.capNhatNV = function (nv) {
    var index = this.timViTriNV(nv.maNV);

    if (index !== -1) {
      this.arr[index] = nv;
    }
  };

  this.timKiemNV = function (keyword) {
    /**
     * 1. Tạo mangTimKiem = []
     * 2. Duyệt mảng arr
     *    nv.hoTen => lowerCase
     *    keyword => lowerCase
     * 3. Nếu nv.hoTen trùng keyword (indexOf)
     *    => true => thêm nv vào mangTimKiem
     * 4. Trả mangTimKiem
     */
    mangTimKiem = [];

    this.arr.forEach(function (nv) {
      var hoTenLowerCase = nv.hoTen.toLowerCase();
      var keywordLowerCase = keyword.toLowerCase();
      if (hoTenLowerCase.indexOf(keywordLowerCase) !== -1) {
        mangTimKiem.push(nv);
      }
    });

    return mangTimKiem;
  };
}
