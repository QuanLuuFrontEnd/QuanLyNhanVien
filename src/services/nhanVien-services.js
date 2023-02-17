function CallNhanVienApi() {
    // http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien
    // Lay ds
    this.fetchListData = function () {
        return axios({
            url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien",
            method: "GET",
        });
    };

    //   http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=1
    // Lay 1 nv
    this.getNVienById = function (id) {
        return axios({
            url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${id}`,
            method: "GET",
        });
    };

    //   http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien
    // Them
    this.addNVien = function (nvien) {
        return axios({
            url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien",
            method: "POST",
            data: nvien,
        });
    };
    //   http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=1990
    // Sua
    this.updateNVien = function (nvien) {
        return axios({
            url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nvien.id}`,
            method: "PUT",
            data: nvien,
        });
    };
}

//   http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=1990
// xoa
this.deleteNVien = function (id) {
    return axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${id}`,
        method: "DELETE",
    });
};
