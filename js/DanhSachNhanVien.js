/**
 * + Lưu trữ nhiều đối tượng Nhân Viên (mảng Nhân Viên)
 * + thêm Nhân Viên (thêm phần tử mới cho mảng)
 * + xóa, sửa, (xóa, cập nhật phần tử cho mảng)
 * + tìm kiếm Nhân Viên theo điều kiện
 */

function DanhSachNhanVien(){
    //Thuộc tính
    //Mảng Nhân Viên
    this.mangNV = [];

    //Phương thức
    //truyền tham số là đối tượng nhân viên
    this.themNV = function(nv){
        this.mangNV.push(nv);
    }
    //Tìm vị trí nhân viên trong table
    this.timVitri = function(ma){
        //giá sử viTri chưa tìm thấy nên = -1
        console.log(ma);
        var viTri = -1;
        //duyệt mảng và so sánh mã để tìm sinh viên trong mảng
        this.mangNV.map(function(nv,index){
            if (nv.taiKhoanNV === ma){
                //Tìm thấy
                viTri = index;
            }
        });
        //Trả kết quả vị trí tìm thấy ra khỏi hàm để sử dụng ở các hàm khác
        return viTri;
    }

    this.xoaNV = function(ma){
        var viTri = this.timVitri(ma);
        console.log(ma, viTri);
        if (viTri > -1){
            //Tìm thấy
            //splice(vị trí bắt đầu xóa, số lượng cần xóa tính từ vị trí bắt đầu)
            //splice(1,3) => xóa các phần tử có index 1,2,3
            this.mangNV.splice(viTri,1)
        }
    }
    this.capNhatNV = function(nv){
        var viTri = this.timVitri(nv.taiKhoanNV);
        if (viTri > -1){
            //tìm thấy
            dsnv.mangNV[viTri] = nv;
        }
    }
}


DanhSachNhanVien.prototype.timKiem = function(tuKhoa){
    var mangTK = [];
    var tuKhoaThuong = tuKhoa.toLowerCase();

    //Tìm kiếm theo tên
    this.mangNV.map(function(nv){
        var tenNVThuong = nv.tenNV.toLowerCase();
        var viTriTK = tenNVThuong.indexOf(tuKhoaThuong);
        if(viTriTK !== -1){
            //Tìm thấy
            mangTK.push(nv)
        }
    });
    //Tìm kiếm theo loại
    this.mangNV.map(function(nv){
        var loaiNVThuong = nv.xepLoai.toLowerCase();
        var viTriTK = loaiNVThuong.indexOf(tuKhoaThuong);
        if(viTriTK !== -1){
            //Tìm thấy
            mangTK.push(nv)
        }
    });
    return mangTK;
}